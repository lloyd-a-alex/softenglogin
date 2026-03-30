/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        qmulBlue: '#00205b',
        qmulGold: '#d3a122'
      }
    },
  },
  plugins: [],
}
