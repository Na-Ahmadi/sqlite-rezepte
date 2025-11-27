import fs from "fs";
import http from "http";
import path from "path";
import Rezepte from "./components/rezepte.html";
import Template from "./components/template";
import Zutaten from "./components/zutaten.html";

const PORT = 3006;
const API_URL = "http://localhost:3005/api/rezepte";

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

const server = http.createServer(async (req, res) => {
  try {
    const publicPath = path.join(__filename, "public", req.url);
    if (fs.existsSync(publicPath) && fs.statSync(publicPath).isFile()) {
      const ext = path.extname(publicPath);
      const mimeType = mimeTypes[ext] || "application/octet-stream";
      const fileData = fs.readFileSync(publicPath);

      res.writeHead(200, { "Content-Type": mimeType });
      res.end(fileData);
      return;
    }

    if (req.url === "/") {
      const response = await fetch(API_URL);
      const rezepte = await response.json();
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(Template(Rezepte({ rezepte })));
      return;
    }

    const match = req.url.match(/^\/rezepte\/(\d+)$/);
    if (match) {
      const rezeptId = match[1];
      const response = await fetch(`${API_URL}/${rezeptId}`);

      if (response.status === 404) {
        res.writeHead(404);
        res.end(Template("<h1>Rezept nicht gefunden</h1>"));
        return;
      }

      const rezept = await response.json();

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(Template(Zutaten({ rezept })));
      return;
    }

    res.writeHead(404);
    res.end(Template("<h1>Seite nicht gefunden</h1>"));
  } catch (err) {
    res.writeHead(500);
    res.end("Serverfehler: " + err.message);
  }
});

server.listen(PORT, () => {
  console.log(`Web-Server läuft auf http://localhost:${PORT}/`);
});
