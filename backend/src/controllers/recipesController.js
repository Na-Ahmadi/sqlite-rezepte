import db from "./db";

/**
 * @param {{recipe: string}} props
 * @returns {void}
 */
const addIngredientsToRecipe = (recipe) => {
  const ingredients = db
    .prepare("SELECT * FROM zutaten WHERE rezept_id = ?")
    .all(recipe.id);
  recipe.ingredients = ingredients;
};

export function fetchAllRecipes() {
  const recipes = db.prepare("SELECT * FROM rezept").all();
  for (const recipe of recipes) {
    addIngredientsToRecipe(recipe);
  }
  return recipes;
}

/**
 *
 * @param {rezeptId: number} props
 * @returns {object|null}
 */

export function getRecipeById(rezeptId) {
  console.log("rezeptId: ", rezeptId);
  const recipe = db.prepare("SELECT * FROM rezept WHERE id = ?").get(rezeptId);
  if (!recipe) return null;
  addIngredientsToRecipe(recipe);
  return recipe;
}
