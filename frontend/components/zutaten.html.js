export default function Zutaten({data}){
    return `
       <div class="card">
         <h1>${data.titel}</h1>
         <p>${data.beschreibung}</p>
           <div>
              <span>Erstellt: ${new Date(
                data.erstellt
              ).toLocaleDateString()}</span>
              <span>Aktualisiert: ${new Date(
                data.aktualisiert
              ).toLocaleDateString()}</span>
              <span>Portionen: ${data.portionen}</span>
            </div>
            <h3>Zutaten</h3>
            <ul>
            ${data.zutaten
              .map(
                (z) => `
              <li>${z.name} - <strong>${z.menge}</strong>${z.einheit} ${
                  z.optional ? "optional" : ""
                }</li> 
              `
              )
              .join("")}
            </ul>
            <a href="/" class="back-btn">⬅ Zurück</a>
        </div>

        `
}