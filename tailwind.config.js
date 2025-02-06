/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'false',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        background: {
          100: '#2a3d56',
          200: '#1c3b59',
          300: '#1b2d46',
          400: '#0d1f29',
          500: '#070f17',
        },
        text: {
          100: '#e0e1dd',
          200: '#778da9',
        },
        accent: '#ff6b6b',
        alert: {
          error: '#da3737',
          warning: '#da7e37',
          info: '#3770da',
        },
      },
    },
  },
  plugins: [],
}
