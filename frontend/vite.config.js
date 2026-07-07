import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
  ],
  base: '/',
  build: {
    target: 'es2018',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.warn', 'console.info'],
        passes: 2,
      },
      mangle: {
        safari10: true,
      },
    },
    cssCodeSplit: true,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      input: 'index.html',
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        /*
         * IMPORTANT: Use the object form (entry-point arrays), NOT a function.
         *
         * The function form with id.includes() can miss Apollo's transitive deps
         * (e.g. @apollo/client/link/context, ts-invariant, @wry/equality, optimism).
         * When those land in a different chunk, Apollo's React context is split across
         * two module instances — causing Invariant Violation #54:
         *   "Could not find 'client' in context. Wrap the root in <ApolloProvider>."
         *
         * The object form hands Rollup explicit entry points and it automatically
         * co-locates ALL transitive deps in the same chunk — safe for React context.
         */
        manualChunks: {
          // Core React runtime — loaded on every route
          'vendor-react':  ['react', 'react-dom', 'react-router-dom'],

          // State management — loaded on every route
          'vendor-redux':  ['@reduxjs/toolkit', 'react-redux'],

          // Apollo + GraphQL — Rollup resolves @apollo/client/link/*, ts-invariant,
          // @wry/* etc. together so they all share the same module instance
          'vendor-apollo': ['@apollo/client', 'graphql'],

          // Framer Motion — used on most pages
          'vendor-motion': ['framer-motion'],

          // MUI + Emotion — used on forms and seller pages
          'vendor-mui':    ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],

          // Recharts — only fetched when /seller/analytics lazy-loads
          'vendor-charts': ['recharts'],


        },
      },
    },
  },
})
