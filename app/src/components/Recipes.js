/**
 * @param {{ recipes: { id: string; title: string; updated: string; sort: string,  description: string, image_path: string }[]; }} props
 * @returns {string}
 */

export default function Recipes({ recipes }) {
  return /* html */ `
  <section class="recipes-wrapper">
      <h1>Alle Rezepte</h1>
      <header class="recipes-header">
        <a href="/new-recipe" class="add-btn">Rezept hinzufügen</a>
        <div class="recipe-search">
          <input type="text" id="search-input" placeholder="Rezept suchen..." />
        </div>
      
        <form method="GET" class="sort-form">
          <label for="sort">Sortieren nach:</label>
          <select name="sort" id="sort" onchange="this.form.submit()">    
            <option value="">-- wählen --</option>
            <option value= "updated_desc">Neuestes zuerst</option>
            <option value= "updated_asc">Ältestes zuerst</option>
            <option value= "title_asc">Titel A–Z</option>
            <option value= "title_desc">Titel Z–A</option>           
          </select>
        </form>
      </header>

      <!------------ Recipe Cards -------------->
      <div class="recipes-container">
        ${recipes
          .map(
            (r) => /* html */ `
              <article class="recipe-card">
                <a href="/recipes/${r.id}" class="recipe-link">
                  <div class="recipe-image">
                    ${
                      r.image_path
                        ? `<img src="${r.image_path}" alt="${r.title}" />`
                        : `<div class="no-image">Kein Bild</div>`
                    }
                  </div>
                <h2>${r.title}</h2>
                <p>${r.description}</p>
                <span>Aktualisiert: ${r.updated}</span>
                </a>
              </article>
            `
          )
          .join("")}
      </div>
    </section>

       <script>
            const select = document.getElementById('sort');

            // Sort-Einstellung aus localStorage
            const savedSort = localStorage.getItem('sort');
            if (savedSort) {
              select.value = savedSort;
            }

            select.addEventListener('change', function () {
              localStorage.setItem('sort', this.value);
              this.form.submit();
            });

            // Search-Input
            document.addEventListener('DOMContentLoaded', () => {
              const searchInput = document.getElementById('search-input'); 
              const recipeCards = document.querySelectorAll('.recipe-card');

              searchInput.addEventListener('input', function () {
                const query = this.value.toLowerCase();

                recipeCards.forEach((card) => {
                  const title = card.querySelector('h2').textContent.toLowerCase();
                  const description = card.querySelector('p').textContent.toLowerCase();

                  card.style.display =
                    title.includes(query) || description.includes(query) ? '' : 'none';
                });
              });
            });
        </script>
      `;
}
