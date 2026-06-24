import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    target: 'es2015',
    sourcemap: false,
    rollupOptions: {
      input: 'index.html',
      output: {
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
