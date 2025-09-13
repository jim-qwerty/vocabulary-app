import { useEffect, useState } from "react";
import { getCategorias, getPalabrasPorCategoria } from "../lib/api";

type Categoria = { categoria_id: string; nombre: string };
type Palabra = { palabra_id: string; es: string; en: string };

export default function Modulos() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [catId, setCatId] = useState("");
  const [palabras, setPalabras] = useState<Palabra[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getCategorias().then(setCategorias).catch((e) => setError(String(e)));
  }, []);

  useEffect(() => {
    if (!catId) return;
    setLoading(true);
    setError("");
    getPalabrasPorCategoria(catId, 30, true)
      .then(setPalabras)
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, [catId]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Módulos</h1>

      <select
        className="border rounded p-2"
        value={catId}
        onChange={(e) => setCatId(e.target.value)}
      >
        <option value="">Elige una categoría…</option>
        {categorias.map((c) => (
          <option key={c.categoria_id} value={c.categoria_id}>
            {c.nombre}
          </option>
        ))}
      </select>

      {loading && <div className="animate-pulse">Cargando…</div>}
      {error && <div className="text-red-600">{error}</div>}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {palabras.map((w) => (
          <div key={w.palabra_id} className="border rounded p-3">
            <div className="font-semibold">{w.es}</div>
            <div className="opacity-70">{w.en}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
