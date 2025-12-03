
import { promises as fs } from "node:fs";
import { createServer } from "node:http";
import { dirname, join, extname } from "node:path";
import { fileURLToPath } from "node:url";

import errorMessage from "./components/ErrorMessage";
import Recipes from "./components/Recipes";
import Ingredients from "./components/Ingredients";
import Template from "./components/Template";



const PORT = 3006;
const API_URL = "http://localhost:3005/api/recipes";

const mimeTypes = {
  ".css": "text/css",
  ".js": "text/javascript",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".html": "text/html",
  ".json": "application/json",
};


const recipePattern = new URLPattern({ pathname: "/recipes/:id" });
const rootPatteren = new URLPattern({ pathname: "/" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = createServer(async (req, res) => {
  try {
    const publicPath = join(__dirname, "..", "public", req.url);


    try {
      const stats = await fs.stat(publicPath);
      if (stats.isFile()) {
        const ext = extname(publicPath);
        const mimeType = mimeTypes[ext] || "application/octet-stream";
        const fileData = await fs.readFile(publicPath);

        res.writeHead(200, { "Content-Type": mimeType });
        res.end(fileData);
        return;
      }
    } catch (err) {
      if (err.code !== "ENOENT") throw err;
    }

    if (rootPatteren.test(req.url)) {
      const response = await fetch(API_URL);
      const recipes = await response.json();

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(
        Template({ title: "All Recipes", content: Recipes({ recipes }) })
      );
      return;
    }

    const match = recipePattern.exec(req.url);
    if (match) {
      const recipeId = match.pathname.groups.id;
      const response = await fetch(`${API_URL}/${recipeId}`);
      if (response.status === 404) {
        res.writeHead(404);
        res.end(
          Template({
            title: "Fehler",
            content: errorMessage({message: "Recipe not found"}),
          })
        );

        return;
      }

      const recipe = await response.json();
      console.log('recipe : ', recipe)

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(Template({ title: recipe.titel, content: Ingredients({ recipe }) }));
      return;
    }

    res.writeHead(404);
    res.end(
      Template({
        title: "Fehler",
        content: errorMessage({message: "Page not found"}),
      })
    );
  } catch (err) {
    res.writeHead(500);
    res.end("Serverfehler: " + err.message);
  }
  
});

server.listen(PORT, () => {
  console.log(`Web-Server läuft auf http://localhost:${PORT}/`);
});
