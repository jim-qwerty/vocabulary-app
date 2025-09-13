import type { Module } from "../components/ModuleCard";

export const modules: Module[] = [
  { id: 1, title: "Comida y Bebidas",    tags: ["Restaurante", "Ingredientes"], progress: 35, gradient: "from-rose-500 to-orange-500" },
  { id: 2, title: "Viajes y Transporte",  tags: ["Aeropuerto", "Hotel"],         progress: 60, gradient: "from-emerald-500 to-teal-500" },
  { id: 3, title: "Trabajo y Oficina",    tags: ["Profesiones", "Reuniones"],    progress: 15, gradient: "from-indigo-500 to-blue-500" },
  { id: 4, title: "Compras y Dinero",     tags: ["Tiendas", "Pagos"],            progress: 5,  gradient: "from-fuchsia-500 to-pink-500" },
  { id: 5, title: "Casa y Rutinas",       tags: ["Hogar", "Quehaceres"],         progress: 10, gradient: "from-orange-500 to-amber-500" },
  { id: 6, title: "Salud y Cuerpo",       tags: ["Doctor", "Síntomas"],          progress: 20, gradient: "from-cyan-500 to-sky-500" },
  { id: 7, title: "Escuela y Educación",  tags: ["Aula", "Exámenes"],            progress: 40, gradient: "from-lime-500 to-green-500" },
  { id: 8, title: "Tiempo y Clima",       tags: ["Fechas", "Estaciones"],        progress: 70, gradient: "from-violet-500 to-purple-500" },
];
