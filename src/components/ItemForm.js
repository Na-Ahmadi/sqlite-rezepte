export default function ItemTemplate({ index, removeButton = true }) {
  return /* html */ `
          <div class="form-row" >
            <div class="form-col">
              <label for="ingredient-${index}-name">Name:</label>
              <input type="text" id="ingredient-${index}-name" name="ingredients[${index}][name]" placeholder="Name" required />
            </div>
            <div class="form-col">
              <label for="ingredient-${index}-quantity">Menge:</label>
              <input type="number" id="ingredient-${index}-quantity" name="ingredients[${index}][quantity]" placeholder="Menge" min="0" step="1" required />
            </div>
          </div>
          <div class="form-row">
            <div class="form-col">
              <label for="ingredient-${index}-unit">Einheit:</label>
               <select id="ingredient-${index}-unit" name="ingredients[${index}][unit]" required>
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
              <label for="ingredient-${index}-per-person">Menge pro Person:</label>
              <input type="number" id="ingredient-${index}-per-person" name="ingredients[${index}][quantity_per_person]" placeholder="Menge pro Person" min="0" step="1" required />
            </div>
          </div>
          <div class="form-row optional">
            <label for="ingredient-${index}-optional">Optional:</label>
            <input type="checkbox" id="ingredient-${index}-optional" name="ingredients[${index}][optional]" />
          </div>
          ${
            removeButton
              ? `  <button type="button" class="remove-ingredient delete-btn" onclick="removeIngredient()">Remove</button>`
              : ""
          }
      `;
}
