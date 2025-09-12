// postcss.config.js (ESM porque usas "type":"module")
export default {
  plugins: {
    "@tailwindcss/postcss": {},   // <- en v4 es ESTE plugin
    // "autoprefixer": {}         // opcional; puedes quitarlo en v4
  },
}
