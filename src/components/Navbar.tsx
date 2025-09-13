import { NavLink } from "react-router-dom";
import { Home, FolderOpen, Target, ChartBar, Settings, LogIn } from "lucide-react";

const base =
  "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors";
const active = "bg-gray-900 text-white";
const idle = "text-gray-700 hover:bg-gray-100";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-fuchsia-500 to-sky-500" />
          <span className="text-sm font-semibold tracking-tight">JIM: Proyecto Inglés</span>
        </div>

        <nav className="hidden items-center gap-1 sm:flex">
          <Nav to="/" icon={<Home className="h-4 w-4" />} label="Inicio" />
          <Nav  to="/modulos" icon={<FolderOpen className="h-4 w-4" />} label="Módulos" />
          <Nav  to="/practica" icon={<Target className="h-4 w-4" />} label="Práctica" />
          <Nav  to="/progreso" icon={<ChartBar className="h-4 w-4" />} label="Progreso" />
          <Nav  to="/admin" icon={<Settings className="h-4 w-4" />} label="Admin" />
        </nav>

        <NavLink to="/login" className={`${base} border shadow-sm hover:bg-gray-50`}>
          <LogIn className="h-4 w-4" />
          Iniciar sesión
        </NavLink>
      </div>
    </header>
  );
}

function Nav({
  to,
  icon,
  label,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `${base} ${isActive ? active : idle}`}
      end={to === "/"}
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}
