import {
  fetchAllRezepte,
  getRezeptById,
} from "../controllers/recipesController";

const alleRezeptePattern = new URLPattern({ pathname: `/api/rezepte` });
const rezeptByIdPattern = new URLPattern({ pathname: `/api/rezepte/:id` });

export default async function rezepteRouter(req, res) {
  if (alleRezeptePattern.test(req.url)) {
    const rezepte = fetchAllRezepte();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(rezepte));
    return;
  }

  const match = rezeptByIdPattern.exec(req.url);
  if (match) {
    const rezeptId = match.pathname.groups.id;
    const rezept = getRezeptById(rezeptId);

    if (!rezept) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Rezept nicht gefunden" }));
      return;
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(rezept));
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Endpunkt nicht gefunden" }));
}
