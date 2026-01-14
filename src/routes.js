import formidable from "formidable";
import { readFile, stat } from "node:fs/promises";
import path, { extname, join } from "node:path";
import ErrorMessage from "./components/ErrorMessage";
import Ingredients from "./components/Ingredients";
import RecipeForm from "./components/RecipeForm";
import Recipes from "./components/Recipes";
import Template from "./components/Template";
import {
  deleteRecipeById,
  insertRecipe,
  selectAllRecipes,
  selectRecipeById,
} from "./data/recipesData";

const MIME_TYPES = {
  ".css": "text/css",
  ".js": "text/javascript",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".html": "text/html",
  ".json": "application/json",
};

const API_URL = "http://localhost:3006/api/recipes";

/**
 * @typedef {Object} Route
 * @property {URLPattern} pattern - Das zu prüfende URL-Muster.
 * @property {(
 *   req: import("http").IncomingMessage,
 *   res: import("http").ServerResponse,
 *   pattern: URLPattern
 * ) => Promise<boolean>} handler - Die Handler-Funktion für diese Route.
 */

/** @type {Route[]} */
export default [
  // <---------- Home Route frontend--------------->
  {
    pattern: new URLPattern({ pathname: "/" }),
    handler: async (req, res) => {
      const url = new URL(req.url, "http://localhost:3006");
      const sort = url.searchParams.get("sort") || "updated_desc";
      const recipes = selectAllRecipes(sort);

      sendHtml(
        res,
        Template({ title: "All Recipes", content: Recipes({ recipes }) })
      );
      return true;
    },
  },
  {
    pattern: new URLPattern({ pathname: "/recipes/:id" }),
    handler: async (req, res, pattern) => {
      const match = pattern.exec(req.url);

      if (match) {
        const recipeId = match.pathname.groups.id;
        const recipe = selectRecipeById(recipeId);

        if (recipe) {
          sendHtml(
            res,
            Template({ title: recipe.title, content: Ingredients({ recipe }) })
          );
          return true;
        }
      }
    },
  },

  // <---------- Create New Recipe and POST --------------->
  {
    pattern: new URLPattern({ pathname: "/new-recipe" }),
    handler: async (req, res) => {
      if (req.method === "POST") {
        const form = formidable({
          uploadDir: path.join(process.cwd(), "database", "uploads"),
          keepExtensions: true,
          multiples: false,
        });

        form.parse(req, (err, fields, files) => {
          if (err) {
            res.writeHead(500);
            res.end("Upload Fehler");
            return;
          }

          let servings = parseInt(fields.servings);
          if (isNaN(servings) || servings < 1) {
            servings = 1;
          }
          // Validierung der Eingaben
          const prep_time = toMinutes(fields.prep_time, fields.prep_time_unit);
          const cook_time = toMinutes(fields.cook_time, fields.cook_time_unit);

          const now = new Date().toISOString().split("T")[0];

          let imagePath = null;
          const file = Array.isArray(files.upload_image)
            ? files.upload_image[0]
            : files.upload_image;

          if (file && file.size > 0 && file.filepath) {
            imagePath = `/uploads/${path.basename(file.filepath)}`;
          }
          const v = (x) => (Array.isArray(x) ? x[0] : x);

          insertRecipe({
            title: v(fields.title),
            description: v(fields.description),
            instructions: v(fields.instructions),
            servings: parseInt(v(fields.servings), 10),
            prep_time: parseInt(v(fields.prep_time), 10),
            cook_time: parseInt(v(fields.cook_time), 10),
            total_time: prep_time + cook_time,
            created: now,
            updated: now,
            image_path: imagePath,
            ingredients: parseIngredients(fields),
          });

          res.writeHead(302, { Location: "/" });
          res.end();
        });
        return true;
      }

      sendHtml(
        res,
        Template({ title: "Create Recipe", content: RecipeForm() })
      );
      return true;
    },
  },

  // <---------- Delete Recipe --------------->
  {
    pattern: new URLPattern({ pathname: "/delete-recipe/:id" }),
    handler: async (req, res, pattern) => {
      if (req.method === "POST") {
        const match = pattern.exec(req.url);
        if (match) {
          const recipeId = match.pathname.groups.id;
          deleteRecipeById(recipeId);
          console.log(`✅ Rezept mit ID ${recipeId} wurde gelöscht!`);

          res.writeHead(302, { location: "/" });
          res.end();
          return true;
        }
      }
    },
  },

  // <------------ public folder routes ----------->
  {
    // Static Files Route
    pattern: new URLPattern({ pathname: "/*" }),
    handler: async (req, res) => {
      for (const folder of ["public", "database"]) {
        try {
          const publicPath = join(folder, req.url);
          const stats = await stat(publicPath);
          if (stats.isFile()) {
            const ext = extname(publicPath);
            const mimeType = MIME_TYPES[ext] || "application/octet-stream";
            const fileData = await readFile(publicPath);

            res.writeHead(200, { "Content-Type": mimeType });
            res.end(fileData);
            return true;
          }
        } catch (e) {
          // pass
        }
      }
    },
  },
  {
    // 404 Not Found - Fallback Route
    pattern: new URLPattern({ pathname: "/*" }),
    handler: async (req, res) => {
      sendHtml(
        res,
        Template({
          title: "Fehler",
          content: ErrorMessage({ message: "Page not found" }),
        })
      );
      return true;
    },
  },
];

// <-------- Hilfsfunktionen --------->
/** Send a JSON response */
function sendJSON(res, data) {
  res.writeHead(200, { "Contetn-Type": "application/json" });
  res.end(JSON.stringify(data));
}

/** Send an HTML response */
function sendHtml(res, htmlContent) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(htmlContent);
}

// -------- parseIngredients ---------
function parseIngredients(fields) {
  const ingredients = [];
  const v = (x) => (Array.isArray(x) ? x[0] : x);

  Object.keys(fields).forEach((key) => {
    const match = key.match(/ingredients\[(\d+)\]\[(.+)\]/);
    if (!match) return;

    const index = Number(match[1]);
    const field = match[2];

    if (!ingredients[index]) ingredients[index] = {};
    ingredients[index][field] = v(fields[key]);
  });

  return ingredients;
}
// -------- toMinutes ---------
// Hilfsfunktion: Umrechnung in Minuten
const toMinutes = (value, unit) => {
  const num = parseInt(value);
  if (isNaN(num) || num < 0) return 0;
  return unit === "h" ? num * 60 : num;
};
