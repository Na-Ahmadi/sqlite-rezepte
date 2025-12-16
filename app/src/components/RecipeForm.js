export default function RecipeForm() {
  return /* html */ `
  <div class="form-section">
    <div class="form-header">
      <a href="/" class="back-btn">⬅ Zurück zu den Rezepten</a>
      <h1 class="form-title">Neues Rezept erstellen</h1>
    </div>
  
    <form id="recipe-form" action="/new-recipe" method="POST">
      <!-- Recipe Fields -->
      <div class="form-row">
        <label for="title">Title:</label>
        <input type="text" id="title" name="title" required />
      </div>

      <div class="form-row">
        <label for="description">Beschreibung:</label>
        <textarea id="description" name="description" rows="3" required></textarea>
      </div>

      <div class="form-row">
        <label for="servings">Portionen:</label>
        <input type="number" id="servings" name="servings" min="1" required />
      </div>
<!-- 
      <div class="form-row">
        <label for="created">Erstellt:</label>
        <input type="date" id="created" name="created" required />
      </div>

      <div class="form-row">
        <label for="updated">Aktualisiert:</label>
        <input type="date" id="updated" name="updated" />
      </div> -->

      <!-- Ingredients Fields -->
      <h2>Ingredients</h2>
      <div id="ingredients-container">
        <div class="ingredient">
          <div class="form-row">
            <div class="form-col">
              <label for="ingredient-0-name">Name:</label>
              <input type="text" id="ingredient-0-name" name="name" placeholder="Name" required />
            </div>
            <div class="form-col">
              <label for="ingredient-0-quantity">Menge:</label>
              <input type="number" id="ingredient-0-quantity" name="quantity" placeholder="Quantity" required />
            </div>
          </div>
          <div class="form-row">
            <div class="form-col">
              <label for="ingredient-0-unit">Unit:</label>
              <input type="text" id="ingredient-0-unit" name="unit" placeholder="Einheit" required />
            </div>
            <div class="form-col">
              <label for="ingredient-0-per-person">Menge pro Person:</label>
              <input type="number" id="ingredient-0-per-person" name="quantity_per_person" placeholder="Qty per person" required />
            </div>
          </div>
          <div class="form-row optional">
            <label for="ingredient-0-optional">Optional:</label>
            <input type="checkbox" id="ingredient-0-optional" name="optional" />
          </div>
        </div>
      </div>
      </div>
      <div class="form-btn-container">
      <!-- <button type="button" id="add-ingredient">Add Ingredient</button> -->
      <button type="submit" class="submit-btn">Rezept speichern</button>
    </div>
</form>
</div>
  `;
}
