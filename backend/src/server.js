import http from "node:http";
import rezepteRouter from "./routes/rezepteRouter.js";

const PORT = 3005;

const server = http.createServer(async (req, res) => {
  try {
    if (req.url.startsWith("/api/rezepte")) {
      rezepteRouter(req, res);
      return;
    }

    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Endpunkt nicht gefunden" }));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
  }
});

server.listen(PORT, () => {
  console.log(`API-Server läuft auf http://localhost:${PORT}`);
});
