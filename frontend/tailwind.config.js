/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "background": "#030305",
        "surface": "#08080f",
        "surface-bright": "#161622",
        "surface-container": "#11111a",
        "surface-container-low": "#0b0b12",
        "surface-container-lowest": "#050508",
        "surface-container-high": "#191926",
        "surface-container-highest": "#222233",
        "primary": "#00f5ff",
        "on-primary": "#001f24",
        "primary-container": "#00daf3",
        "on-primary-container": "#001f24",
        "secondary": "#7000ff",
        "on-secondary": "#ffffff",
        "secondary-container": "#a855f7",
        "accent": "#00f2fe",
        "on-background": "#f8fafc",
        "on-surface": "#e2e8f0",
        "on-surface-variant": "#8a99ad",
        "glass-white": "rgba(255, 255, 255, 0.03)",
        "glass-border": "rgba(255, 255, 255, 0.08)",
        "error": "#ff6b6b",
        "success": "#22c55e",
        "midnight-overlay": "rgba(3, 3, 5, 0.85)"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "full": "9999px"
      },
      spacing: {
        "gutter": "24px",
        "section-gap": "100px",
        "margin-desktop": "48px",
        "margin-mobile": "16px",
        "container-max": "1280px"
      },
      fontFamily: {
        "display": ["Playfair Display", "serif"],
        "body": ["Hanken Grotesk", "sans-serif"]
      }
    },
  },
  plugins: [],
}
