import { createServer } from "node:http";

import recipesRouter from "./routes/recipesRouter.js";


const PORT = process.env.PORT || 3005;
const recipePattern = new URLPattern({ pathname: "/api/recipes/:rest*" });
const server = createServer(async (req, res) => {
  try {
   if (recipePattern.test(req.url)) {
      await recipesRouter(req, res);
      return;
    }

    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Endpoint not found" }));

  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
  }
});

server.listen(PORT, () => {
  console.log(`API-Server läuft auf http://localhost:${PORT}`);
});
