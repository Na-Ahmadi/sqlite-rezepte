/**
 * @param {{ 
 *   recipe: { 
 *     id: string; 
 *     title: string; 
 *     description: string; 
 *     created: Date; 
 *     updated: Date; 
 *     servings: number; 
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
        <span>Erstellt: ${new Date(recipe.created).toLocaleDateString()}</span>
        <span
          >Aktualisiert: ${new Date(recipe.updated).toLocaleDateString()}</span
        >
        <span>Portionen: ${recipe.servings}</span>
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
      <a href="/" class="back-btn">⬅ Zurück</a>
    </div>
  `;
}
