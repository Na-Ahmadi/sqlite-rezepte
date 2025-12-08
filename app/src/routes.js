import { readFile, stat } from "node:fs/promises";
import { extname, join } from "node:path";
import ErrorMessage from "./components/ErrorMessage";
import Ingredients from "./components/Ingredients";
import RecipeForm from "./components/RecipeForm";
import Recipes from "./components/Recipes";
import Template from "./components/Template";
import { fetchAllRecipes, getRecipeById } from "./data/recipesData";

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
      const recipes = fetchAllRecipes();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(recipes));
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
        console.log("recipes: ", recipe);

        if (recipe) {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(recipe));
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
      const response = await fetch(API_URL);
      const recipes = await response.json();

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(
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

          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(
            Template({ title: recipe.title, content: Ingredients({ recipe }) })
          );
          return true;
        }
      }
    },
  },
  {
    pattern: new URLPattern({ pathname: "/recipe-form" }),
    handler: async (req, res) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(Template({ title: "Create Recipe", content: RecipeForm() }));
      return true;
    },
  },
  // -------------- public folder routes-----------
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
      res.writeHead(404);
      res.end(
        Template({
          title: "Fehler",
          content: ErrorMessage({ message: "Page not found" }),
        })
      );
      return true;
    },
  },
];
