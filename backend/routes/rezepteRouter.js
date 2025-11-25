const rezeptController = require("../controllers/rezeptController");

 async function rezepteRouter(req, res) {
  if (req.url === "/api/rezepte") {
    await rezeptController.getAllRezepte(req, res);
    return;
  }
  if (
    req.url.startsWith("/api/rezepte/" || req.url.startsWith("/api/rezepte"))
  ) {
    const rezeptId = req.url.split("/")[3];
    await rezeptController.getRzeptById(req, res, rezeptId);
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Endpunkt nicht gefunden" }));
}
module.exports = rezepteRouter;
