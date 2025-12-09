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
 *     ingredients: {
 *       name: string;
 *       quantity: number;
 *       unit: string;
 *       optional?: boolean
 *     }[]
 *   }
 * }} props
 * @returns {string}
 */

export default function Ingredients({ recipe }) {
  return /* HTML */ `
    <div class="card">
      <h1>${recipe.title}</h1>
      <p>${recipe.description}</p>
      <div>
        <span><strong>Portionen:</strong> ${recipe.servings}</span>
        <span><strong>Vorbereitungszeit:</strong> ${recipe.prep_time} min</span>
        <span><strong>Kochzeit:</strong> ${recipe.cook_time} min </span>
        <span><strong>Gesamtzeit:</strong> ${recipe.total_time} min</span>
      </div>
      <br />
      <div>
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
      <h3>Zutaten</h3>
      <ul>
        ${recipe.ingredients
          .map(
            (i) => /* HTML */ `
              <li>
                ${i.name} - <strong>${i.quantity}</strong>${i.unit}
                ${i.optional ? "optional" : ""}
              </li>
            `
          )
          .join("")}
      </ul>
      <div>${recipe.instructions}</div>
      <a href="/" class="back-btn">⬅ Zurück</a>
    </div>
  `;
}
