import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("rezepte.db");

console.log("Mit der Rezepte-Datenbank verbunden.");

export default db;
