import { Elysia } from "elysia";

import path from "path";
import url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function getAll(params) {
  const dbPath = path.join(__dirname, "database.json");

  const db = Bun.file(dbPath);
  return await db.json();
}

async function getSingel(params) {
  const { id } = params.params;
  const dbPath = path.join(__dirname, "database.json");

  const file = Bun.file(dbPath);
  const content = await file.json();
  const result = await content.find(item => item.id === Number(id));

  return result;
}

const app = new Elysia()
  .get("/", () => [
    "http://localhost:3000/api",
    "http://localhost:3000/api/3",
  ])
  .get("/api", getAll)
  .get("/api/:id", getSingel)
  .listen(3000);

console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`);