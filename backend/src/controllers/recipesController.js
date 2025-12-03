import db from "./db";

/**
 * @param {{recipe: string}} props
 * @returns {void}
 */
const addIngredientsToRecipe = (recipe) => {
  const ingredients = db
    .prepare("SELECT * FROM ingredients WHERE recipe_id = ?")
    .all(recipe.id);
  recipe.ingredients = ingredients;
};

export function fetchAllRecipes() {
  const recipes = db.prepare("SELECT * FROM recipes").all();
  for (const recipe of recipes) {
    addIngredientsToRecipe(recipe);
  }
  return recipes;
}

/**
 *
 * @param {recipeId: number} props
 * @returns {object|null}
 */

export function getRecipeById(recipeId) {
  console.log("rezeptId: ", recipeId);
  const recipe = db.prepare("SELECT * FROM recipes WHERE id = ?").get(recipeId);
  if (!recipe) return null;
  addIngredientsToRecipe(recipe);
  return recipe;
}
