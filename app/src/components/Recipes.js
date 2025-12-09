/**
 * @param {{ recipes: { id: string; title: string; updated: string; description: string }[] }} props
 * @returns {string}
 */

export default function Recipes({ recipes }) {
  return /* html */ `
  <img src="/gemuse-pfanne.jpg" alt="gemuse-pfanne"/>
  <img src="/pfannkuchen.jpg" alt="pfannkuchen"/>
  <img src="/spaghetti-mit-bolognese.jpg" alt="spaghetti-mit-bolognese"/>

  <h1>Alle Rezepten</h1>
  ${recipes
    .map(
      (r) => /* html */ `
          <div class="card">
            <h2><a href="/recipes/${r.id}">${r.title}</a></h2>
            <p>${r.description}</p>
            <span>${r.updated}</span>
          </div>
          `
    )
    .join("")}
      <a href="/new-recipe" class="back-btn">Rezept hinzufügen</a>
      `;
}
