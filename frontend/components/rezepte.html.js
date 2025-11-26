export default function Rezepte({ rezepte }) {
  return `
  <img src="/gemuse-pfanne.jpg" alt="gemuse-pfanne"/>
  <img src="/pfannkuchen.jpg" alt="pfannkuchen" />
  <img src="/spaghetti-mit-bolognese.jpg" alt="spaghetti-mit-bolognese"/>
        <h1>Alle Rezepte</h1>
        ${rezepte
          .map(
            (r) => `
          <div class="card">
            <h2><a href="/rezepte/${r.id}">${r.titel}</a></h2>
            <p>${r.beschreibung}</p>
          </div>
        `
          )
          .join("")}
      `;
}
