export default function Rezepte({ rezepte }) {
  return `
        <h1>Alle Rezepte</h1>
        <img src="/oil.jpg" />
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
