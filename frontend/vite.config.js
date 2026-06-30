import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
  ],
  base: '/',
  build: {
    target: 'es2018',        // Wider browser support than es2015, smaller output than esnext
    sourcemap: false,
    minify: 'terser',        // Terser produces smaller output than esbuild's default
    terserOptions: {
      compress: {
        drop_console: true,  // Remove all console.* calls
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.warn', 'console.info'],
        passes: 2,           // 2-pass compression for extra savings
      },
      mangle: {
        safari10: true,      // Fix Safari 10 bug with let in for loops
      },
    },
    cssCodeSplit: true,      // Each chunk gets its own CSS — only load what you need
    reportCompressedSize: false, // Faster builds (we use a separate plugin for analysis)
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      input: 'index.html',
      output: {
        // Keep hashed filenames for long-term caching
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        manualChunks(id) {
          // ── Core React runtime (loads on every route) ───────────────────
          if (id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/react-router-dom/') ||
              id.includes('node_modules/scheduler/')) {
            return 'vendor-react'
          }

          // ── State management (loads on every route) ──────────────────────
          if (id.includes('node_modules/@reduxjs/') ||
              id.includes('node_modules/react-redux/') ||
              id.includes('node_modules/immer/') ||
              id.includes('node_modules/redux/')) {
            return 'vendor-redux'
          }

          // ── GraphQL / Apollo (loads on every route that queries) ─────────
          if (id.includes('node_modules/@apollo/') ||
              id.includes('node_modules/graphql/') ||
              id.includes('node_modules/zen-observable/') ||
              id.includes('node_modules/optimism/')) {
            return 'vendor-apollo'
          }

          // ── Framer Motion (animations — needed on most pages) ────────────
          if (id.includes('node_modules/framer-motion/')) {
            return 'vendor-motion'
          }

          // ── MUI + Emotion (used on forms / seller pages only) ────────────
          if (id.includes('node_modules/@mui/') ||
              id.includes('node_modules/@emotion/')) {
            return 'vendor-mui'
          }

          // ── Recharts (only on SellerAnalytics page) ──────────────────────
          // With lazy-loading this chunk will NOT be fetched until that page
          if (id.includes('node_modules/recharts/') ||
              id.includes('node_modules/d3-') ||
              id.includes('node_modules/victory-')) {
            return 'vendor-charts'
          }

          // ── Three.js + R3F (3D — heavy, deferred until needed) ───────────
          // With lazy-loading this chunk will NOT be fetched until that route
          if (id.includes('node_modules/three/') ||
              id.includes('node_modules/@react-three/') ||
              id.includes('node_modules/troika-') ||
              id.includes('node_modules/meshline/')) {
            return 'vendor-three'
          }

          // ── Utility libraries ─────────────────────────────────────────────
          if (id.includes('node_modules/axios/') ||
              id.includes('node_modules/lucide-react/') ||
              id.includes('node_modules/react-toastify/') ||
              id.includes('node_modules/react-spinners/') ||
              id.includes('node_modules/react-confetti/')) {
            return 'vendor-utils'
          }

          // ── Date / Calendar ───────────────────────────────────────────────
          if (id.includes('node_modules/react-date-range/') ||
              id.includes('node_modules/date-fns/')) {
            return 'vendor-dates'
          }
        },
      },
    },
  },
})
