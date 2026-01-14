/**
 * @param {{message: string}} props
 * @returns
 */
export default function errorMessage({ message }) {
  return /* html */ `
  <div class="error-container">
    <div class="error-page">
      <div class="error-icon">⚠️</div>
      <h1>${message}</h1>
      <a href="/" class="back-button">
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M19 12H5M12 19l-7-7 7-7"></path>
        </svg>
        Zurück zur Startseite
      </a>
    </div>
  </div>
    `;
}
