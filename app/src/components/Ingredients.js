/**
 * @param {{
 *   recipe: {
 *     id: string;
 *     title: string;
 *     description: string;
 *     created: Date;
 *     updated: Date;
 *     servings: number;
 *     cook_time: number;
 *     prep_time: number;
 *     total_time: number;
 *      instructions: string;
 *    image_path: string;
 *     ingredients: {
 *       name: string;
 *       quantity: number;
 *       unit: string;
 *       optional?: boolean;
 *      quantity_per_person: number;
 *     }[]
 *   }
 * }} props
 * @returns {string}
 */

export default function Ingredients({ recipe }) {
  return /* HTML */ `
    <article class="recipe-detail">
      <!-- Zurück Button -->
      <div class="recipe-btn-container">
        <a href="/" class="back-button">⬅ Zurück zu den Rezepten</a>
      </div>
      <div class="recipe-detail-image">
        ${recipe.image_path
          ? `<img src="${recipe.image_path}" alt="${recipe.title}" />`
          : `<div class="no-image">Kein Bild</div>`}
      </div>
      <!-- Header -->
      <header class="recipe-header">
        <h1 class="recipe-title">${recipe.title}</h1>
        <p class="recipe-description">${recipe.description}</p>
      </header>

      <!-- Meta Infos -->
      <section class="recipe-meta">
        <div class="meta-times">
          <span><strong>Portionen:</strong> ${recipe.servings}</span>
          <span
            ><strong>Vorbereitungszeit:</strong> ${recipe.prep_time} min</span
          >
          <span><strong>Kochzeit:</strong> ${recipe.cook_time} min</span>
          <span><strong>Gesamtzeit:</strong> ${recipe.total_time} min</span>
        </div>
        <div class="meta-dates">
          <span
            ><strong>Erstellt:</strong> ${new Date(
              recipe.created
            ).toLocaleDateString()}</span
          >
          <span
            ><strong>Aktualisiert:</strong> ${new Date(
              recipe.updated
            ).toLocaleDateString()}</span
          >
        </div>
      </section>

      <!-- Zutaten -->
      <section class="recipe-ingredients">
        <h3>Zutaten</h3>
        <ul>
          ${recipe.ingredients
            .map(
              (i) => `
          <li>
            ${i.name}${i.optional ? "<em>optional</em>" : ""} <strong>${
                i.quantity
              } ${" "}${i.unit}</strong>
          </li>
        `
            )
            .join("")}
        </ul>
      </section>
      <section class="recipe-instructions">
        <h3>Zubereitung</h3>
        <div>${recipe.instructions.split("\n").join("<br>")}</div>
      </section>

      <!-- Löschen Button -->
      <form
        method="POST"
        action="/delete-recipe/${recipe.id}"
        class="delete-form"
        onsubmit="return confirmDelete()"
      >
        <button type="submit" class="delete-btn">Rezept löschen</button>
      </form>
    </article>

    <script>
      function confirmDelete() {
        return confirm("Möchten Sie dieses Rezept wirklich löschen?");
      }
    </script>
  `;
}
