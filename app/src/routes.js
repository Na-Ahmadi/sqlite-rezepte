import { readFile, stat } from "node:fs/promises";
import { extname, join } from "node:path";
import ErrorMessage from "./components/ErrorMessage";
import Ingredients from "./components/Ingredients";
import RecipeForm from "./components/RecipeForm";
import Recipes from "./components/Recipes";
import Template from "./components/Template";
import {
  fetchAllRecipes,
  getPostRecipe,
  getRecipeById,
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

export default [
  {
    pattern: new URLPattern({ pathname: `/api/recipes` }),
    handler: async (
      /** @type import("http").IncomingMessage */ req,
      /** @type import("http").ServerResponse */ res
    ) => {
      const url = new URL(req.url, "http://localhost:3006");
      console.log("req.url: ", req.url);
      console.log("url: ", url);
      const sort = url.searchParams.get("sort") || "updated_desc";
      console.log("sort: ", sort);
      const recipes = fetchAllRecipes(sort);
      // console.log("recipe: ", recipes);

      sendJSON(res, recipes);
      return true;
    },
  },
  {
    pattern: new URLPattern({ pathname: `/api/recipes/:id` }),
    handler: async (
      /** @type import("http").IncomingMessage */ req,
      /** @type import("http").ServerResponse  */ res,
      /** @type {URLPattern} */ pattern
    ) => {
      const match = pattern.exec(req.url);
      if (match && match.pathname.groups.id) {
        const recipeId = match.pathname.groups.id;
        const recipe = getRecipeById(recipeId);

        if (recipe) {
          sendJSON(res, recipe);
          return true;
        }
      }
    },
  },
  // ----------- frontend ------------------
  {
    pattern: new URLPattern({ pathname: "/" }),
    handler: async (
      /** @type {import("http").IncomingMessage} */ req,
      /** @type {import("http").ServerResponse}  */ res
    ) => {
      const url = new URL(req.url, "http://localhost:3006");
      const sort = url.searchParams.get("sort") || "updated_desc";

      const response = await fetch(`${API_URL}?sort=${sort}`);

      // const response = await fetch(API_URL);
      const recipes = await response.json();

      sendHtml(
        res,
        Template({ title: "All Recipes", content: Recipes({ recipes }) })
      );
      return true;
    },
  },
  {
    pattern: new URLPattern({ pathname: "/recipes/:id" }),
    handler: async (
      /** @type {import("http").IncomingMessage} */ req,
      /** @type {import("http").ServerResponse}  */ res,
      /** @type {URLPattern} */ pattern
    ) => {
      const match = pattern.exec(req.url);
      if (match) {
        const recipeId = match.pathname.groups.id;
        const response = await fetch(`${API_URL}/${recipeId}`);
        if (response.status === 200) {
          const recipe = await response.json();

          sendHtml(
            res,
            Template({ title: recipe.title, content: Ingredients({ recipe }) })
          );
          return true;
        }
      }
    },
  },

  {
    pattern: new URLPattern({ pathname: "/new-recipe" }),
    handler: async (
      /** @type {import("http").IncomingMessage} */ req,
      /** @type {import("http").ServerResponse}  */ res
    ) => {
      if (req.method === "POST") {
        try {
          const body = await getRequestBody(req);
          const contentType = req.headers["content-type"];
          if (contentType?.includes("application/x-www-form-urlencoded")) {
            const params = Object.fromEntries(new URLSearchParams(body));

            let servings = parseInt(params.servings);
            if (isNaN(servings) || servings < 1) {
              servings = 1;
            }

            const now = new Date().toISOString().split("T")[0];

            getPostRecipe({
              title: params.title,
              description: params.description,
              servings,
              created: now,
              updated: now,
            });
            res.writeHead(302, { Location: "/" });
            res.end();
            return true;
          }
        } catch (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Fehler beim Speichern des Rezepts");
          return true;
        }
      }

      sendHtml(
        res,
        Template({ title: "Create Recipe", content: RecipeForm() })
      );
      return true;
    },
  },
  // ------------- public folder routes -----------
  {
    pattern: new URLPattern({ pathname: "/*" }),
    handler: async (req, res) => {
      try {
        const publicPath = join("public", req.url);
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
    },
  },
  {
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

// -------- getRequestBody --------
function getRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      resolve(body);
    });

    req.on("error", (err) => {
      reject(err);
    });
  });
}
