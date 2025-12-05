export default function RecipeForm() {
  return /* html */ `
    <h1>Create a New Recipe</h1>

    <form id="recipe-form" action="/recipes" method="POST">
  <!-- Recipe Fields -->
  <div class="form-row">
    <label for="title">Title:</label>
    <input type="text" id="title" name="title" required />
  </div>

  <div class="form-row">
    <label for="description">Description:</label>
    <textarea id="description" name="description" rows="3" required></textarea>
  </div>

  <div class="form-row">
    <label for="servings">Servings:</label>
    <input type="number" id="servings" name="servings" min="1" required />
  </div>

  <div class="form-row">
    <label for="created">Created:</label>
    <input type="date" id="created" name="created" required />
  </div>

  <div class="form-row">
    <label for="updated">Updated:</label>
    <input type="date" id="updated" name="updated" />
  </div>

  <!-- Ingredients Fields -->
  <h2>Ingredients</h2>
  <div id="ingredients-container">
    <div class="ingredient">
      <div class="form-row">
        <div class="form-col">
          <label for="ingredient-0-name">Name:</label>
          <input type="text" id="ingredient-0-name" name="ingredients[0][name]" placeholder="Name" required />
        </div>
        <div class="form-col">
          <label for="ingredient-0-quantity">Quantity:</label>
          <input type="number" id="ingredient-0-quantity" name="ingredients[0][quantity]" placeholder="Quantity" required />
        </div>
      </div>
      <div class="form-row">
        <div class="form-col">
          <label for="ingredient-0-unit">Unit:</label>
          <input type="text" id="ingredient-0-unit" name="ingredients[0][unit]" placeholder="Unit" required />
        </div>
        <div class="form-col">
          <label for="ingredient-0-per-person">Qty per person:</label>
          <input type="number" id="ingredient-0-per-person" name="ingredients[0][quantity_per_person]" placeholder="Qty per person" required />
        </div>
      </div>
      <div class="form-col">
        <label for="ingredient-0-optional">Optional:</label>
        <input type="checkbox" id="ingredient-0-optional" name="ingredients[0][optional]" />
      </div>
    </div>
  </div>
<div class="form-btn-container">
  <button type="button" id="add-ingredient">Add Ingredient</button>
  <button type="submit">Save Recipe</button>
</div>
</form>
<a href="/" class="back-btn">Back to recipes</a>
  `;
}
