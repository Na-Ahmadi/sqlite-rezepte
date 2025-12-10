/**
 * @param {{ recipes: { id: string; title: string; updated: string; description: string }[] }} props
 * @returns {string}
 */

export default function Recipes({ recipes }) {
  return /* html */ `
  <img src="/gemuse-pfanne.jpg" alt="gemuse-pfanne"/>
  <img src="/pfannkuchen.jpg" alt="pfannkuchen"/>
  <img src="/spaghetti-mit-bolognese.jpg" alt="spaghetti-mit-bolognese"/>

  <section class="recipes-wrapper">
      <h1>Alle Rezepten</h1>
      <header class="recipes-header">
        <a href="/new-recipe" class="add-btn">Rezept hinzufügen</a>
        <form method="GET" action="/" class="sort-form">
          <label for="sort">Sortieren nach:</label>
          <select name="sort" id="sort">
            <option value="">-- wählen --</option>
            <option value="updated_desc">Neuestes zuerst</option>
            <option value="updated_asc">Ältestes zuerst</option>
            <option value="title_asc">Titel A–Z</option>
            <option value="title_desc">Titel Z–A</option>
          </select>
        </form>
      </header>

      <div class="recipes-container">
        ${recipes
          .map(
            (r) => /* html */ `
              <article class="recipe-card">
                <image src="/" alt="image"/>
                <h2><a href="/recipes/${r.id}">${r.title}</a></h2>
                <p>${r.description}</p>
                <span>Aktualisiert: ${r.updated}</span>
              </article>
            `
          )
          .join("")}
      </div>
    </section>

      `;
}
