import ItemTemplate from "./ItemForm";

export default function RecipeForm() {
  return /* html */ `
  <div class="form-section">
    <div class="form-header">
      <a href="/" class="back-btn">⬅ Zurück zu den Rezepten</a>
      <h1 class="form-title">Neues Rezept erstellen</h1>
    </div>

    <form id="recipe-form" action="/new-recipe" method="POST" enctype="multipart/form-data">
      <!-- Recipe Fields -->
      <div class="form-row">
        <label for="title">Title:</label>
        <input type="text" id="title" name="title" required />
      </div>

      <div class="form-row">
        <label for="description">Beschreibung:</label>
        <textarea id="description" name="description" rows="3" required></textarea>
      </div>

      <div class="time-servings-container">
        <div class="form-row">
          <label for="servings">Portionen:</label>
          <input type="number" id="servings" name="servings" min="1" required />
        </div>
        <div class="form-row">
          <label for="prep_time">Vorbereitungszeit:</label>
          <input type="number" id="prep_time" name="prep_time" min="1" required />
          <select name="prep_time_unit" required>
            <option value="min">Minuten</option>
            <option value="h">Stunden</option>
          </select>
        </div>

        <div class="form-row">
          <label for="cook_time">Kochzeit:</label>
          <input type="number" id="cook_time" name="cook_time" min="1" required />
          <select name="cook_time_unit" required>
            <option value="min">Minuten</option>
            <option value="h">Stunden</option>
          </select>
        </div>
      </div>

      <!-- Ingredients Fields -->
      <h2>Ingredients</h2>
      <div id="ingredients-container">
        <div class="ingredient">${ItemTemplate({
          index: 0,
          removeButton: false,
        })}</div>
      </div>
       <template id="ingredient-template">${ItemTemplate({
         index: "#INDEX#",
       })}</template>
      <div class="form-row ingredient-buttons">
        <button type="button" id="add-ingredient" class="add-ingredient" onclick="addIngredient()">Add +</button>  
      </div>
       <div class="form-row">
        <label for="instructions">Beschreibung:</label>
        <textarea id="instructions" name="instructions" rows="3" required></textarea>
      </div>

      <div class="form-row">
        <label for="upload-image" class="upload-box">
          <span class="upload-icon">📷</span>
          <span class="upload-text">Upload a file</span>
          <input type="file" id="upload-image" name="upload_image" accept="image/*" />
          <img id="image-preview" src="" alt="Image preview" style="display:none; max-width:100px; margin-left:10px;" />
          <button type="button" id="cancel-image" >✕</button>
        </label>
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
    /*------Image Preview -----*/
    const uploadInput = document.getElementById("upload-image");
    const preview = document.getElementById("image-preview");
    const cancelBtn = document.getElementById("cancel-image");

      const resetUpload = () => {
        uploadInput.value = ""; 
        preview.src = ""; 
        preview.style.display = "none"; 
        cancelBtn.style.display = "none"; 
      };

    uploadInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (!file) {
          resetUpload();
          return;
      }

          const reader = new FileReader();
          reader.onload = (e) => {
          preview.src = e.target.result; 
          preview.style.display = "inline-block"; 
          cancelBtn.style.display = "inline-block"; 
      };
      reader.readAsDataURL(file); 
    });

    cancelBtn.addEventListener("click", (e) => {
        e.preventDefault(); 
        resetUpload();     
    });

    /*<!-- Add Ingredient Function -->*/
    function addIngredient(){
      const container = document.getElementById('ingredients-container');
      const index = container.children.length;
      const ingredientDiv = document.createElement('div');
      ingredientDiv.className = 'ingredient';


      ingredientDiv.innerHTML = document.getElementById('ingredient-template').innerHTML.replace(/#INDEX#/g, index);
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
