// src/pages/Practica.tsx
import { useEffect, useMemo, useState } from "react";
import {
  getCategorias,
  getPalabrasPorCategoria,
  type Categoria,
  type Palabra,
} from "../lib/api";

type Mode = "es-en" | "en-es";

// Normalización segura (acentos, mayúsculas, espacios)
function stripDiacritics(s: string) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function normalize(s: string) {
  return stripDiacritics(String(s ?? "").toLowerCase().trim().replace(/\s+/g, " "));
}
function msg(err: unknown) {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  try {
    return JSON.stringify(err);
  } catch {
    return "Error desconocido";
  }
}

export default function Practica() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaId, setCategoriaId] = useState<string>("");
  const [mode, setMode] = useState<Mode>("es-en");

  const [palabras, setPalabras] = useState<Palabra[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checking, setChecking] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar categorías al montar
  useEffect(() => {
    (async () => {
      try {
        const data = await getCategorias();
        setCategorias(data);
        if (data.length) setCategoriaId(data[0].categoria_id);
      } catch (e) {
        setError(msg(e));
      }
    })();
  }, []);

  // Traer 10 aleatorias al cambiar de categoría
  useEffect(() => {
    if (!categoriaId) return;
    setLoading(true);
    setError(null);
    setChecking(false);
    setScore(null);
    setAnswers({});

    (async () => {
      try {
        const data = await getPalabrasPorCategoria(categoriaId, 10, true);
        setPalabras(data);
      } catch (e) {
        setError(msg(e));
      } finally {
        setLoading(false);
      }
    })();
  }, [categoriaId]);

  // Filas según el modo
  const rows = useMemo(
    () =>
      palabras.map((w) => {
        const id = w.palabra_id;
        const question = mode === "es-en" ? w.es : w.en;
        const expected = mode === "es-en" ? w.en : w.es;
        return { id, question, expected };
      }),
    [palabras, mode]
  );

  const handleChange = (id: string, val: string) =>
    setAnswers((p) => ({ ...p, [id]: val }));

  const handleCheck = () => {
    let ok = 0;
    for (const r of rows) {
      const a = normalize(answers[r.id] ?? "");
      const e = normalize(r.expected);
      if (a && a === e) ok++;
    }
    setScore(ok);
    setChecking(true);
  };

  const reloadWords = async () => {
    setLoading(true);
    setChecking(false);
    setScore(null);
    setAnswers({});
    try {
      const data = await getPalabrasPorCategoria(categoriaId, 10, true);
      setPalabras(data);
    } catch (e) {
      setError(msg(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <label htmlFor="cat" className="text-sm font-medium">
            Select a category
          </label>
          <select
            id="cat"
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            className="min-w-[260px] rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2"
          >
            {categorias.map((c) => (
              <option key={c.categoria_id} value={c.categoria_id}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setMode("es-en")}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              mode === "es-en" ? "bg-black text-white" : "hover:bg-gray-100"
            }`}
            aria-pressed={mode === "es-en"}
          >
            Español → Inglés
          </button>
          <button
            type="button"
            onClick={() => setMode("en-es")}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              mode === "en-es" ? "bg-black text-white" : "hover:bg-gray-100"
            }`}
            aria-pressed={mode === "en-es"}
          >
            English → Spanish
          </button>
        </div>
      </header>

      {error && (
        <div className="mb-4 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="py-16 text-center text-sm text-gray-500">
          Cargando palabras…
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {rows.map((r, i) => {
              const user = answers[r.id] ?? "";
              const isRight =
                user.trim() !== "" &&
                normalize(user) === normalize(r.expected);
              const wrong = checking && !isRight;
              const right = checking && isRight;

              return (
                <div key={r.id} className="rounded-2xl border p-4">
                  <div className="mb-3 text-sm text-gray-500">#{i + 1}</div>
                  <div className="mb-3 font-medium">{r.question}</div>

                  <input
                    value={user}
                    onChange={(e) => handleChange(r.id, e.target.value)}
                    placeholder="Escribe tu respuesta…"
                    className={`w-full rounded-xl border px-3 py-2 outline-none transition
                      ${right ? "border-green-500 ring-2 ring-green-300" : ""}
                      ${wrong ? "border-red-500 ring-2 ring-red-300" : ""}
                      ${!checking ? "focus:ring-2" : ""}`}
                  />

                  {checking && wrong && (
                    <p className="mt-2 text-sm text-red-600">
                      Correcta: <span className="font-semibold">{r.expected}</span>
                    </p>
                  )}
                  {checking && right && (
                    <p className="mt-2 text-sm text-green-600">¡Correcto!</p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col items-center gap-3">
            {checking && (
              <div className="text-sm">
                Puntaje: <span className="font-semibold">{score}</span> /{" "}
                {rows.length}
              </div>
            )}

            <div className="flex gap-3">
              {!checking ? (
                <button
                  type="button"
                  onClick={handleCheck}
                  className="rounded-full bg-black px-6 py-2 text-white hover:opacity-90"
                >
                  REVISAR
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setAnswers({});
                      setChecking(false);
                      setScore(null);
                    }}
                    className="rounded-full border px-6 py-2 hover:bg-gray-100"
                  >
                    Volver a intentar (mismas palabras)
                  </button>
                  <button
                    type="button"
                    onClick={reloadWords}
                    className="rounded-full bg-black px-6 py-2 text-white hover:opacity-90"
                  >
                    Nuevo set (10 aleatorias)
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
