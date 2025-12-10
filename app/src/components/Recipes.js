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
   <form method="GET" action="/" class="sort-form">
    <label for="sort">Sortieren nach:</label>
    <select name="sort" id="sort" >
      <option value="" >-- wählen --</option>
      <option value="updated_desc">Neuestes zuerst</option>
      <option value="updated_asc">Ältestes zuerst</option>
      <option value="title_asc">Titel A–Z</option>
      <option value="">Titel Z–A</option>
    </select>
  </form>

  ${recipes
    .map(
      (r) => /* html */ `
          <div class="card">
            <h2><a href="/recipes/${r.id}">${r.title}</a></h2>
            <p>${r.description}</p>
            <span>Aktualisiert: ${r.updated}</span>
          </div>
          `
    )
    .join("")}
      <a href="/new-recipe" class="back-btn">Rezept hinzufügen</a>
      `;
}
