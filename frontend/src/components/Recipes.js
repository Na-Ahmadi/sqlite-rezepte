/**
 * @param {{ recipes: { id: string; titel: string; beschreibung: string }[] }} props
 * @returns {string}
 */

export default function Recipes({ recipes }) {
  return /* html */ `
  <img src="/gemuse-pfanne.jpg" alt="gemuse-pfanne"/>
  <img src="/pfannkuchen.jpg" alt="pfannkuchen" />
  <img src="/spaghetti-mit-bolognese.jpg" alt="spaghetti-mit-bolognese"/>
  
  <h1>Alle Rezepte</h1>
  ${recipes
    .map(
      (r) => /* html */ `
          <div class="card">
            <h2><a href="/recipes/${r.id}">${r.titel}</a></h2>
            <p>${r.beschreibung}</p>
          </div>
          `
    )
    .join("")}
      `;
}
