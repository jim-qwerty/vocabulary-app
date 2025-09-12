import { Outlet, Link, NavLink } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 bg-white/80 backdrop-blur border-b">
        <nav className="max-w-4xl mx-auto flex items-center gap-4 p-3">
          <Link to="/" className="font-bold">Vocabulary App</Link>
          <NavLink to="/" className="opacity-80" end>Inicio</NavLink>
          <NavLink to="/practice" className="opacity-80">Práctica</NavLink>
        </nav>
      </header>
      <main className="max-w-4xl mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
