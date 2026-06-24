import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    target: 'es2015',
    sourcemap: false,
    rollupOptions: {
      input: 'index.html',
      output: {
        // Manual chunk splitting — keeps vendor code separate from app code.
        // This allows browsers to cache stable vendor bundles independently.
        manualChunks: {
          'vendor-react':  ['react', 'react-dom', 'react-router-dom'],
          'vendor-redux':  ['@reduxjs/toolkit', 'react-redux'],
          'vendor-apollo': ['@apollo/client', 'graphql'],
          'vendor-motion': ['framer-motion'],
          'vendor-mui':    ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
          'vendor-charts': ['recharts'],
          'vendor-three':  ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
    },
  },
})
