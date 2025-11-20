const { DatabaseSync } = require('node:sqlite');

const db = new DatabaseSync('rezepte.db');

console.log('Mit der Rezepte-Datenbank verbunden.');

module.exports = db;
