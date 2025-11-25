const db = require("../db.js");

const addZutatenToRezept = (rezept) => {
  const zutaten = db
    .prepare("SELECT * FROM zutaten WHERE rezept_id = ?")
    .all(rezept.id);
  rezept.zutaten = zutaten;
};

export async function getAllRezepte(req, res) {
  const rezepte = db.prepare("SELECT * FROM rezept").all();
  for (const rezept of rezepte) {
    addZutatenToRezept(rezept);
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(rezepte));
}

export async function getRzeptById(req, res, rezeptId) {
  const rezept = db.prepare("SELECT * FROM rezept WHERE id = ?").get(rezeptId);

  if (!rezept) {
    res.writeHead(404);
    res.end("Rezept nicht gefunden");
    return;
  }

  addZutatenToRezept(rezept);

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(rezept));
}
