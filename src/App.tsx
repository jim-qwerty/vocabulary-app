import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Modulos from "./pages/Modulos";
import Practica from "./pages/Practica";


function Placeholder({ title }: { title: string }) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold">{title}</h1>
    </main>
  );
}

export default function App() {
  return (
    <div className="min-h-dvh bg-gray-50 text-gray-900">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Modulos" element={<Modulos />} />
        <Route path="/practica" element={<Practica />} />
        <Route path="/progreso" element={<Placeholder title="Iniciar sesión" />} />
        <Route path="/admin" element={<Placeholder title="Iniciar sesión"/>} />
        <Route path="/login" element={<Placeholder title="Iniciar sesión" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
