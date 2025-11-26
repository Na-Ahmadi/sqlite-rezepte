import fs from "fs";
import http from "http";
import path from "path";
import Template from "./components/template";
import Rezepte from "./components/rezepte.html";
import Zutaten from "./components/zutaten.html";


const PORT = 3006;
const API_URL = "http://localhost:3005/api/rezepte";



const server = http.createServer(async (req, res) => {
  try {
    if (req.url === "/style.css") {
      try {
        const cssPath = path.join(__dirname, "public", "style.css");
        const cssData = fs.readFileSync(cssPath, "utf-8");
        res.writeHead(200, { "Content-Type": "text/css" });
        res.end(cssData);
      } catch (err) {
        res.writeHead(404);
        res.end("CSS nicht gefunden");
      }
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
      console.log('zutaten : ', rezept)

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

