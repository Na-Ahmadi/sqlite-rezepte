import { createServer } from "node:http";
import ROUTES from "./routes";

const PORT = process.env.PORT || 3006;

const server = createServer(async (req, res) => {
  for (const route of ROUTES) {
    if (route.pattern.test(req.url)) {
      if (await route.handler(req, res, route.pattern)) {
        return;
      }
    }
  }
});

server.listen(PORT, () => {
  console.log(`Web-Server läuft auf http://localhost:${PORT}/`);
});
