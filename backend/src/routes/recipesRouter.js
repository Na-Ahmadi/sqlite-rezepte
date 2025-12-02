import {
  fetchAllRecipes,
  getRecipeById,
} from "../controllers/recipesController";

const alleRecipesPattern = new URLPattern({ pathname: `/api/recipes` });
const recipeByIdPattern = new URLPattern({ pathname: `/api/recipes/:id` });

export default async function recipesRouter(req, res) {
  if (alleRecipesPattern.test(req.url)) {
    const recipes = fetchAllRecipes();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(recipes));
    return;
  }

  const match = recipeByIdPattern.exec(req.url);
  if (match) {
    const recipeId = match.pathname.groups.id;
    const recipe = getRecipeById(recipeId);

    if (!recipe) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Recipe not found" }));
      return;
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(recipe));
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Endpoint not found" }));
}
