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

const sortOptions = {
  updated_desc: "updated DESC",
  updated_asc: "updated ASC",
  title_asc: "title ASC",
  title_desc: "title DESC",
};

export function fetchAllRecipes(sort = "updated_desc") {
  const orderBy = sortOptions[sort] || sortOptions.updated_desc;

  const recipes = db
    .prepare(
      `SELECT id, title, description, updated FROM recipes ORDER BY ${orderBy}`
    )
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
  if (!recipe) {
    return null;
  }
  addIngredientsToRecipe(recipe);
  return recipe;
}

export function getPostRecipe({
  title,
  description,
  servings,
  created,
  updated,
}) {
  const stmt = db.prepare(`
    INSERT INTO recipes (title, description, servings, created, updated)
    VALUES (?, ?, ?, ?, ?)
  `);
  const info = stmt.run(title, description, servings, created, updated);
  return info.lastInsertRowid;
}
