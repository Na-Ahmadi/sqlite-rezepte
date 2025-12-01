export default function Ingredients({ recipe }) {
  return /* HTML */ `
    <div class="card">
      <h1>${recipe.titel}</h1>
      <p>${recipe.beschreibung}</p>
      <div>
        <span>Erstellt: ${new Date(recipe.erstellt).toLocaleDateString()}</span>
        <span
          >Aktualisiert:
          ${new Date(recipe.aktualisiert).toLocaleDateString()}</span
        >
        <span>Portionen: ${recipe.portionen}</span>
      </div>
      <h3>Zutaten</h3>
      <ul>
        ${recipe.zutaten
          .map(
            (z) => /* HTML */ `
              <li>${z.name} - <strong>${z.menge}</strong>${z.einheit} ${
              z.optional ? "optional" : ""
            }</li> 
              `
          )
          .join("")}
      </ul>
      <a href="/" class="back-btn">⬅ Zurück</a>
    </div>
  `;
}
