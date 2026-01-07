import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("recipes.db");

/**
 * @param {Object} recipe
 */
// <-- Helper Function to add ingredients to a recipe -->
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
      `SELECT id, title, description, updated, image_path, instructions FROM recipes ORDER BY ${orderBy}`
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
      "SELECT id, title, description, servings, prep_time, cook_time, total_time, created, updated, image_path, instructions  FROM recipes WHERE id = ?"
    )
    .get(recipeId);
  if (!recipe) {
    return null;
  }
  addIngredientsToRecipe(recipe);
  return recipe;
}
// <-- add a new recipe to the database -->
export function getPostRecipe({
  title,
  description,
  servings,
  created,
  updated,
  prep_time,
  cook_time,
  total_time,
  instructions,
  image_path = null,
  ingredients = [],
}) {
  const stmt = db.prepare(`
    INSERT INTO recipes (title, description, servings, created, updated, prep_time, cook_time, total_time, image_path, instructions)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
  const info = stmt.run(
    title,
    description,
    servings,
    created,
    updated,
    prep_time,
    cook_time,
    total_time,
    image_path ?? null,
    instructions
  );
  const recipeId = info.lastInsertRowid;

  const ingredientStmt = db.prepare(`
      INSERT INTO ingredients (name, quantity, unit, quantity_per_person, optional, recipe_id)
      VALUES (?, ?, ?, ?, ?, ?)
      `);
  // <-- Insert each ingredient associated with the recipe -->
  for (const ingredient of ingredients) {
    ingredientStmt.run(
      ingredient.name,
      ingredient.quantity,
      ingredient.unit,
      ingredient.quantity_per_person,
      ingredient.optional ? 1 : 0,
      recipeId
    );
  }

  return recipeId;
}

export function deleteRecipeById(recipeId) {
  const stm = db.prepare(`DELETE FROM recipes WHERE id = ? `);
  stm.run(recipeId);
}
