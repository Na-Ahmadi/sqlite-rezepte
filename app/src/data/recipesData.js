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
  const recipe = db
    .prepare(
      "SELECT id, title, description, servings, prep_time, cook_time, total_time, created, updated, instructions  FROM recipes WHERE id = ?"
    )
    .get(recipeId);
  console.log("recipe by id: ", recipe);
  if (!recipe) {
    return null;
  }
  addIngredientsToRecipe(recipe);
  return recipe;
}
