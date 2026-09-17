import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
export default defineConfig({
  /* viteSingleFile inlines every JS + CSS chunk into index.html, so the
     built site is ONE file you can double-click straight from disk. */
  plugins: [react(), tailwindcss(), viteSingleFile()],
  /* Kokoro's default Node bundle imports fs/promises + path only to load
     voice files from disk; in the browser it falls back to fetching them
     from Hugging Face. These aliases make that branch work in the browser. */
  resolve: {
    alias: {
      'fs/promises': 'data:text/javascript,export default {}',
      path: 'data:text/javascript,export default {resolve:(...a)=>a.join("/")}',
    },
  },
  worker: {
    /* Kokoro's WASM backend needs plain JS workers */
    format: 'es',
  },
})
