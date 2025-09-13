import { Link } from "react-router-dom";
import { Play, Search, FolderOpen, Target, ChartBar, ArrowRight } from "lucide-react";
import ProgressBar from "../components/ProgressBar";

// Datos de ejemplo (puedes traerlos de tu store/API)
const lastLesson = {
  title: "Viajes y Transporte",
  detail: "Aeropuerto · Vocabulario",
  progress: 60,
};

type Featured = {
  id: number;
  title: string;
  tags: string[];
  progress: number;
  gradient: string; // clases tailwind para el gradiente
};

const featured: Featured[] = [
  {
    id: 2,
    title: "Viajes y Transporte",
    tags: ["Aeropuerto", "Hotel"],
    progress: 60,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: 1,
    title: "Comida y Bebidas",
    tags: ["Restaurante", "Ingredientes"],
    progress: 35,
    gradient: "from-rose-500 to-orange-500",
  },
  {
    id: 4,
    title: "Compras y Dinero",
    tags: ["Tiendas", "Pagos"],
    progress: 5,
    gradient: "from-fuchsia-500 to-pink-500",
  },
];

export default function Home() {
  const avg =
    Math.round(
      featured.reduce((a, b) => a + b.progress, 0) / (featured.length || 1)
    ) || 0;

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-6">
      {/* Hero */}
      <section className="animate-in fade-in-50 rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">¡Bienvenido/a a JIM!</h1>
            <p className="text-gray-600">
              Sigue donde te quedaste o explora nuevos módulos.
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              to="/modulos"
              className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              Ver módulos <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/practica"
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium hover:bg-gray-50"
            >
              Ir a práctica
            </Link>
          </div>
        </div>

        {/* Buscador */}
        <div className="mt-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Buscar palabras o categorías…"
              className="w-full rounded-xl border px-9 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/20"
            />
          </div>
        </div>
      </section>

      {/* Continuar */}
      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border bg-white p-5 shadow-sm md:col-span-2">
          <h2 className="mb-3 text-sm font-semibold text-gray-600">Continuar</h2>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold">{lastLesson.title}</p>
              <p className="text-sm text-gray-600">{lastLesson.detail}</p>
              <div className="mt-3">
                <ProgressBar value={lastLesson.progress} />
                <p className="mt-1 text-xs text-gray-500">
                  {lastLesson.progress}% completado
                </p>
              </div>
            </div>
            <Link
              to="/practica"
              className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <Play className="h-4 w-4" /> Reanudar
            </Link>
          </div>
        </div>

        {/* Accesos rápidos */}
        <div className="grid grid-cols-2 gap-3">
          <QuickLink to="/modulos" icon={<FolderOpen className="h-4 w-4" />} label="Módulos" />
          <QuickLink to="/practica" icon={<Target className="h-4 w-4" />} label="Práctica" />
          <QuickLink to="/progreso" icon={<ChartBar className="h-4 w-4" />} label="Progreso" />
          <QuickLink to="/modulos" icon={<ArrowRight className="h-4 w-4" />} label="Explorar" />
        </div>
      </section>

      {/* Recomendado / Recientes */}
      <section className="rounded-2xl border bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-600">Sugerencias para hoy</h2>
          <span className="text-xs text-gray-500">Promedio de avance: {avg}%</span>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {featured.map((m) => (
            <article
              key={m.id}
              className="group overflow-hidden rounded-xl border bg-white p-0 shadow-sm hover:shadow-md"
            >
              {/* Cinta/hero del card con gradiente */}
              <div className={`h-20 w-full bg-gradient-to-br ${m.gradient}`} />

              {/* Contenido */}
              <div className="p-4">
                <p className="font-semibold">{m.title}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {m.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border px-2.5 py-0.5 text-[11px] font-medium text-gray-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-3">
                  <ProgressBar value={m.progress} gradient={m.gradient} />
                  <p className="mt-1 text-xs text-gray-500">{m.progress}%</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-4 text-right">
          <Link
            to="/modulos"
            className="text-sm font-medium underline-offset-4 hover:underline"
          >
            Ver todas las categorías
          </Link>
        </div>
      </section>
    </main>
  );
}

function QuickLink({
  to,
  icon,
  label,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      to={to}
      className="inline-flex items-center justify-center gap-2 rounded-2xl border bg-white px-3 py-3 text-sm font-medium shadow-sm hover:bg-gray-50"
    >
      {icon}
      {label}
    </Link>
  );
}
