// import URLPattern from ''

import {
  getAllRezepte,
  getRezeptById,
} from "../controllers/rezeptController.js";

const alleRezeptePattern = new URLPattern({ pathname: `/api/rezepte` });
const rezeptByIdPattern = new URLPattern({ pathname: `/api/rezepte/:id` });

export default async function rezepteRouter(req, res) {
  console.log("url: ", req.url);

  if (alleRezeptePattern.test(req.url)) {
    await getAllRezepte(req, res);
    return;
  }

  const match = rezeptByIdPattern.exec(req.url);
  if (match) {
    const rezeptId = match.pathname.groups.id;
    await getRezeptById(req, res, rezeptId);
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Endpunkt nicht gefunden" }));
}
