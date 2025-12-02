import db from "../../controllers/db.js";

const addZutatenToRezept = (rezept) => {
  const zutaten = db
    .prepare("SELECT * FROM zutaten WHERE rezept_id = ?")
    .all(rezept.id);
  rezept.zutaten = zutaten;
};

export function fetchAllRezepte() {
  const rezepte = db.prepare("SELECT * FROM rezept").all();
  for (const rezept of rezepte) {
    addZutatenToRezept(rezept);
  }
  return rezepte;
}

export function getRezeptById(rezeptId) {
  const rezept = db.prepare("SELECT * FROM rezept WHERE id = ?").get(rezeptId);
  if (!rezept) return null;
  addZutatenToRezept(rezept);
  return rezept;
}
