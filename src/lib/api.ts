export type Categoria = { categoria_id: string; nombre: string };
export type Palabra = { palabra_id: string; es: string; en: string };

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function getCategorias(): Promise<Categoria[]> {
  const r = await fetch(`${API}/api/categorias`);
  if (!r.ok) throw new Error("No se pudieron obtener las categorías");
  return r.json();
}

export async function getPalabrasPorCategoria(
  categoriaId: string,
  limit = 30,
  random = true
): Promise<Palabra[]> {
  const url = new URL(`${API}/api/categorias/${categoriaId}/palabras`);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("random", String(random));
  const r = await fetch(url.toString());
  if (!r.ok) throw new Error("No se pudieron obtener las palabras");
  return r.json();
}
