# sqlite-rezepte

🍲 **Rezepte-Projekt (Vanilla Node.js & SQLite)**

## 📌 Beschreibung

Diese Recipe App ist eine einfache Webanwendung zur Verwaltung und Anzeige von Rezepten.  
Sie wurde bewusst mit **Vanilla Node.js**, **SQLite3** und **klassischem HTML/CSS** umgesetzt – **ohne Frameworks** und mit bewusst minimalem Einsatz von **JavaScript**, sowie **ohne (oder nur mit minimalen) externen Bibliotheken**.

🎯 Ziel des Projekts ist es, zu zeigen, dass moderne Webanwendungen auch **ohne Express, React, Vue oder andere Frameworks** realisierbar sind und dabei verständlich, wartbar und performant bleiben.

Der Fokus liegt auf:

- Server-seitiger Logik  
- sauberem HTML-Rendering  
- möglichst wenig JavaScript im Browser  
- vollständigem Verständnis des HTTP-Flows  

---

## 🧱 Verwendete Technologien

- Node.js (reines `http`-Modul)
- SQLite (lokale Datenbank)
- HTML & CSS
- JavaScript (minimal, kein Client-Framework)
- Keine externen Frameworks
- Keine UI- oder Server-Bibliotheken

---

## ✨ Features

- Rezepte anzeigen
- Rezepte erstellen
- Zutaten und Zubereitung speichern
- Bilder für Rezepte hochladen
- Speicherung in einer SQLite-Datenbank
- Server-seitiges HTML-Rendering
- Funktioniert auch ohne JavaScript im Browser

---

## ❓ Warum keine Frameworks oder Bibliotheken?

Tieferes Verständnis von:

- HTTP
- Routing
- Server-Rendering
- Datenfluss

Weitere Vorteile:

- Volle Kontrolle über den Code
- Weniger Abhängigkeiten
- Ideal als Lern- und Referenzprojekt

---

## 📂 Projektstruktur

```text
recipe-app/
├─ app/
│  ├─ public/
│  │  ├─ icon/               # Icons
│  │  ├─ uploads/            # Hochgeladene Rezeptbilder
│  │  ├─ *.jpg / *.svg       # Statische Bilder
│  │  ├─ style.css           # Globales Styling
│  │
│  ├─ src/
│  │  ├─ components/         # HTML-Komponenten (serverseitig)
│  │  │  ├─ Template.js
│  │  │  ├─ Recipes.js
│  │  │  ├─ RecipeForm.js
│  │  │  ├─ Ingredients.js
│  │  │  ├─ ItemForm.js
│  │  │  └─ ErrorMessage.js
│  │  │
│  │  ├─ data/
│  │  │  └─ recipesData.js   # Datenlogik
│  │  │
│  │  ├─ routes.js           # Einfaches Routing
│  │  └─ server.js           # HTTP-Server (Vanilla Node.js)
│  │
│  ├─ recipes.db             # SQLite Datenbank
│  ├─ package.json
│  ├─ package-lock.json
│  └─ tsconfig.json
│
├─ table-sqlit-content.sql   # SQL-Tabellen
├─ .gitignore
└─ README.md
