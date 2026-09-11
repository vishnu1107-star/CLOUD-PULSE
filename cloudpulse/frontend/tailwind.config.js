/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#090d16',
        surface: '#0f172a',
        surfaceHover: '#1e293b',
        border: '#1e293b',
        primary: {
          50: '#ecfdf5',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
        accent: {
          cyan: '#06b6d4',
          violet: '#8b5cf6',
          amber: '#f59e0b',
          rose: '#f43f5e'
        }
      },
    },
  },
  plugins: [],
}
