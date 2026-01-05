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

      <!-- Ingredients Fields -->
      <h2>Ingredients</h2>
      <div id="ingredients-container">
        <div class="ingredient">
          <div class="form-row">
            <div class="form-col">
              <label for="ingredient-0-name">Name:</label>
              <input type="text" id="ingredient-0-name" name=""ingredients[0][name]" placeholder="Name" required />
            </div>
            <div class="form-col">
              <label for="ingredient-0-quantity">Menge:</label>
              <input type="number" id="ingredient-0-quantity" name="ingredients[0][quantity]" placeholder="Menge" required />
            </div>
          </div>
          <div class="form-row">
            <div class="form-col">
              <!-- <label for="ingredient-0-unit">Einheit:</label>
              <input type="text" id="ingredient-0-unit" name="unit" placeholder="Einheit" required /> -->
              <label for="ingredient-0-unit">Einheit:</label>
              <select id="ingredient-0-unit" name="ingredients[0][unit]" required>
                <option value="" disabled selected>Einheit:</option>
                <option value="g">Gramm (g)</option>
                <option value="kg">Kilogramm (kg)</option>
                <option value="ml">Milliliter (ml)</option>
                <option value="l">Liter (l)</option>
                <option value="tsp">Teelöffel (tsp)</option>
                <option value="tbsp">Esslöffel (tbsp)</option>
                <option value="cup">Tasse (cup)</option>
                <option value="pcs">Stück (pcs)</option>
                <option value="pinch">Prise (pinch)</option>
                <option value="slice">Scheibe (slice)</option>
                <option value="handful">Handvoll (handful)</option> 
              </select>
            </div>
            <div class="form-col">
              <label for="ingredient-0-per-person">Menge pro Person:</label>
              <input type="number" id="ingredient-0-per-person" name="quantity_per_person" placeholder="Menge pro Person" required />
            </div>
          </div>
          <div class="form-row optional">
            <label for="ingredient-0-optional">Optional:</label>
            <input type="checkbox" id="ingredient-0-optional" name="optional" />
          </div>
        </div>
      </div>
      <div class="form-row ingredient-buttons">
        <button type="button" id="add-ingredient" class="add-ingredient" onclick="addIngredient()">Add +</button>  
      </div>
      <!-- Submit Button -->
      <div class="form-btn-container">
        <button type="submit" class="submit-btn">Rezept speichern</button>
      </div>
    </div>
  </form>
  </div>

  <!-- JavaScript for dynamic ingredient fields -->
  <script>
    function addIngredient(){
      const container = document.getElementById('ingredients-container');
      const index = container.children.length;
      const ingredientDiv = document.createElement('div');
      ingredientDiv.className = 'ingredient';
      ingredientDiv.innerHTML = \`
          <div class="form-row">
            <div class="form-col">
              <label for="ingredient-\${index}-name">Name:</label>
              <input type="text" id="ingredient-\${index}-name" name="name" placeholder="Name" required />
            </div>
            <div class="form-col">
              <label for="ingredient-\${index}-quantity">Menge:</label>
              <input type="number" id="ingredient-\${index}-quantity" name="quantity" placeholder="Menge" required />
            </div>
          </div>
          <div class="form-row">
            <div class="form-col">
              <!-- <label for="ingredient-\${index}-unit">Einheit:</label>
              <input type="text" id="ingredient-\${index}-unit" name="unit" placeholder="Einheit" required /> -->
              <label for="ingredient-0-unit">Einheit:</label>
               <select id="ingredient-0-unit" name="ingredients[0][unit]" required>
                <option value="" disabled selected>Einheit:</option>
                <option value="g">Gramm (g)</option>
                <option value="kg">Kilogramm (kg)</option>
                <option value="ml">Milliliter (ml)</option>
                <option value="l">Liter (l)</option>
                <option value="tsp">Teelöffel (tsp)</option>
                <option value="tbsp">Esslöffel (tbsp)</option>
                <option value="cup">Tasse (cup)</option>
                <option value="pcs">Stück (pcs)</option>
                <option value="pinch">Prise (pinch)</option>
                <option value="slice">Scheibe (slice)</option>
                <option value="handful">Handvoll (handful)</option> 
              </select>
            </div>
            <div class="form-col">
              <label for="ingredient-\${index}-per-person">Menge pro Person:</label>
              <input type="number" id="ingredient-\${index}-per-person" name="quantity_per_person" placeholder="Menge pro Person" required />
            </div>
          </div>
          <div class="form-row optional">
            <label for="ingredient-\${index}-optional">Optional:</label>
            <input type="checkbox" id="ingredient-\${index}-optional" name="optional" />
          </div>
          <button type="button" class="remove-ingredient delete-btn" onclick="removeIngredient()">Remove</button>
      \`;
      container.appendChild(ingredientDiv); 
    }

    <!-- Remove Ingredient Function -->
      function removeIngredient() {
        const container = document.getElementById("ingredients-container");
        if (container.children.length > 1) {
          container.removeChild(container.lastChild);
        }
      }
  </script>
    `;
}
