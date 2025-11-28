export function errorMessage(message) {
  return /* html */ `
  <div class="error-page">
    <h1>${message}</h1>
  </div>
    `;
}
