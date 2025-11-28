export default function Zutaten({ rezept }) {
  return /* HTML */ `
    <div class="card">
      <h1>${rezept.titwel}</h1>
      <p>${rezept.beschreibung}</p>
      <div>
        <span>Erstellt: ${new Date(rezept.erstellt).toLocaleDateString()}</span>
        <span
          >Aktualisiert:
          ${new Date(rezept.aktualisiert).toLocaleDateString()}</span
        >
        <span>Portionen: ${rezept.portionen}</span>
      </div>
      <h3>Zutaten</h3>
      <ul>
        ${rezept.zutaten
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
