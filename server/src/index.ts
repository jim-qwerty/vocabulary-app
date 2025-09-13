import "dotenv/config";
import express from "express";
import cors from "cors";
import type { QueryResultRow } from "pg";
import { query } from "./db";

const app = express();

// CORS (permite varios orígenes separados por coma en CORS_ORIGIN)
const allowOrigins =
  process.env.CORS_ORIGIN?.split(",").map((s) => s.trim()) ?? [
    "http://localhost:5173",
  ];
app.use(cors({ origin: allowOrigins }));
app.use(express.json());

// --- Chequeo rápido de conexión a BD al arrancar (opcional) ---
(async () => {
  try {
    const { rows } = await query<{ ok: number }>("SELECT 1 AS ok");
    console.log("DB OK =", rows[0]?.ok === 1 ? "✅" : "❌");
  } catch (err) {
    console.error("DB connection failed ❌:", err);
  }
})();

// Tipos de filas que devuelve la BD
interface CategoriaRow extends QueryResultRow {
  categoria_id: string;
  nombre: string;
}

interface PalabraRow extends QueryResultRow {
  palabra_id: string;
  es: string;
  en: string;
}

// Healthcheck
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// 1) Listar categorías
app.get("/api/categorias", async (_req, res) => {
  try {
    const { rows } = await query<CategoriaRow>(
      `SELECT categoria_id, nombre
       FROM categoria
       ORDER BY nombre;`
    );
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error listando categorías" });
  }
});

// 2) Palabras por categoría (ID)
app.get("/api/categorias/:id/palabras", async (req, res) => {
  try {
    const { id } = req.params;
    const limit = Math.max(1, Math.min(200, Number(req.query.limit) || 30));
    const random = String(req.query.random ?? "true") === "true";
    const orderBy = random ? "ORDER BY RANDOM()" : "ORDER BY p.palabra_espanol";

    const { rows } = await query<PalabraRow>(
      `
      SELECT p.palabra_id,
             p.palabra_espanol AS es,
             p.palabra_ingles  AS en
      FROM palabra p
      WHERE p.categoria_id = $1
      ${orderBy}
      LIMIT $2;
      `,
      [id, limit]
    );
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error obteniendo palabras" });
  }
});

// 3) Palabras por nombre de categoría (?cat=Animales&limit=30&random=true)
app.get("/api/palabras", async (req, res) => {
  try {
    const cat = String(req.query.cat || "").trim();
    if (!cat) return res.status(400).json({ error: "Falta ?cat=" });

    const limit = Math.max(1, Math.min(200, Number(req.query.limit) || 30));
    const random = String(req.query.random ?? "true") === "true";
    const orderBy = random ? "ORDER BY RANDOM()" : "ORDER BY p.palabra_espanol";

    const { rows } = await query<PalabraRow>(
      `
      SELECT p.palabra_id,
             p.palabra_espanol AS es,
             p.palabra_ingles  AS en
      FROM palabra p
      JOIN categoria c ON c.categoria_id = p.categoria_id
      WHERE c.nombre ILIKE $1
      ${orderBy}
      LIMIT $2;
      `,
      [cat, limit]
    );
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error obteniendo palabras" });
  }
});

// --- Arranque del servidor ---
const port = Number(process.env.PORT || 4000);
app.listen(port, () => {
  console.log(`API lista en http://localhost:${port}`);
});
