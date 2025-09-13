import ModuleCard from "../components/ModuleCard";
import { modules } from "../data/modules";

export default function Modulos() {
  return (
    <main className="mx-auto grid max-w-6xl grid-cols-1 gap-5 px-4 py-6 md:grid-cols-2 lg:grid-cols-3">
      {modules.map((m) => <ModuleCard key={m.id} {...m} />)}
    </main>
  );
}
