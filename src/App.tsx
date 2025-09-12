import { useState } from "react"
import "./styles/index.css" // debe tener: @import "tailwindcss"; y (opcional) @plugin "tailwindcss-animate";

export default function App() {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const DURATION = 300 // ms (coincide con duration-300)

  const toggle = () => {
    if (!mounted) {
      setMounted(true)
      requestAnimationFrame(() => setVisible(true)) // anima entrada
    } else {
      setVisible(false)                              // anima salida
      setTimeout(() => setMounted(false), DURATION)  // desmonta después
    }
  }

  const inClasses =
    "animate-in fade-in-50 zoom-in-95 slide-in-from-bottom-2"
  const outClasses =
    "animate-out fade-out-0 zoom-out-95 slide-out-to-bottom-2"

  return (
    <div className="min-h-screen p-10 text-white bg-gradient-to-br from-sky-600 via-indigo-600 to-fuchsia-500">
      <div className="max-w-xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Tailwind v4 + Animations</h1>
        <p className="opacity-90">
          Pulsa el botón. El panel debería aparecer con fade + slide + zoom
          (300ms) y desaparecer con la animación inversa.
        </p>

        <button
          onClick={toggle}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur"
        >
          {mounted ? "Ocultar panel" : "Mostrar panel"}
        </button>

        {mounted && (
          <div
            className={`${visible ? inClasses : outClasses} duration-300 p-6 rounded-2xl bg-white text-slate-900 shadow-2xl ring-1 ring-black/10`}
          >
            <h2 className="text-xl font-semibold mb-2">Animación OK</h2>
            <p>Este panel usa <code>animate-in/out</code>, <code>fade-*</code>, <code>zoom-*</code> y <code>slide-*</code>.</p>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <span className="block h-10 rounded-lg bg-emerald-500/90" />
              <span className="block h-10 rounded-lg bg-amber-500/90" />
              <span className="block h-10 rounded-lg bg-rose-500/90" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
