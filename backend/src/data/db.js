import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("recipes.db");

console.log("Mit der Rezepte-Datenbank verbunden.", db);

export default db;
