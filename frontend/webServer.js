import fs from "fs";
import http from "http";
import path from "path";

const PORT = 3006;
const API_URL = "http://localhost:3005/api/rezepte";

const templatePath = path.join(__dirname, "template.html");
let templateHtml = fs.readFileSync(templatePath, "utf-8");

const server = http.createServer(async (req, res) => {
  try {
    if (req.url === "/style.css") {
      try {
        const cssPath = path.join(__dirname, "style.css");
        const cssData = fs.readFileSync(cssPath, "utf-8");
        res.writeHead(200, { "Content-Type": "text/css" });
        res.end(cssData);
      } catch (err) {
        res.writeHead(404);
        res.end("CSS nicht gefunden");
      }
      return;
    }

    if (req.url === "/api/rezepte" || req.url === "/") {
      const response = await fetch(API_URL);
      const rezepte = await response.json();
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(
        renderHtml(`
        <h1>Alle Rezepte</h1>
        ${rezepte
          .map(
            (r) => `
          <div class="card">
            <h2><a href="/api/rezepte/${r.id}">${r.titel}</a></h2>
            <p>${r.beschreibung}</p>
          </div>
        `
          )
          .join("")}
      `)
      );
      return;
    }

    const match = req.url.match(/^\/api\/rezepte\/(\d+)$/);
    if (match) {
      const rezeptId = match[1];
      const response = await fetch(`${API_URL}/${rezeptId}`);

      if (response.status === 404) {
        res.writeHead(404);
        res.end(renderHtml("<h1>Rezept nicht gefunden</h1>"));
        return;
      }

      const data = await response.json();

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(
        renderHtml(`
       <div class="card">
         <h1>${data.titel}</h1>
         <p>${data.beschreibung}</p>
           <div>
              <span>Erstellt: ${new Date(
                data.erstellt
              ).toLocaleDateString()}</span>
              <span>Aktualisiert: ${new Date(
                data.aktualisiert
              ).toLocaleDateString()}</span>
              <span>Portionen: ${data.portionen}</span>
            </div>
            <h3>Zutaten</h3>
            <ul>
            ${data.zutaten
              .map(
                (z) => `
              <li>${z.name} - <strong>${z.menge}</strong>${z.einheit} ${
                  z.optional ? "optional" : ""
                }</li> 
              `
              )
              .join("")}
            </ul>
            <a href="/" class="back-btn">⬅ Zurück</a>
        </div>

        `)
      );
      return;
    }

    res.writeHead(404);
    res.end(renderHtml("<h1>Seite nicht gefunden</h1>"));
  } catch (err) {
    res.writeHead(500);
    res.end("Serverfehler: " + err.message);
  }
});

server.listen(PORT, () => {
  console.log(`Web-Server läuft auf http://localhost:${PORT}/`);
});

// ----------------- Template-Funktion -----------------
function renderHtml(content) {
  return templateHtml.replace("{{content}}", content);
}
