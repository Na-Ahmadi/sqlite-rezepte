import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("recipes.db");

/**
 * @param {Object} recipe
 */
const addIngredientsToRecipe = (recipe) => {
  const ingredients = db
    .prepare(
      "SELECT id, name, quantity, unit, quantity_per_person, optional, recipe_id FROM ingredients WHERE recipe_id = ?"
    )
    .all(recipe.id);
  console.log("ingridents", ingredients);
  recipe.ingredients = ingredients;
};

export function fetchAllRecipes() {
  const recipes = db
    .prepare("SELECT id, title, description FROM recipes")
    .all();
  for (const recipe of recipes) {
    addIngredientsToRecipe(recipe);
  }
  return recipes;
}

/**
 * @param {number|string} recipeId
 */
export function getRecipeById(recipeId) {
  console.log("rezeptId: ", recipeId);
  const recipe = db.prepare("SELECT * FROM recipes WHERE id = ?").get(recipeId);
  if (!recipe) {
    return null;
  }
  addIngredientsToRecipe(recipe);
  return recipe;
}
