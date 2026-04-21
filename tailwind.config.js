/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        history: {
          burgundy: '#561C24',
          'burgundy-hover': '#6B232D',
          parchment: '#FDF6E3',
          'parchment-dark': '#F5E6C8',
          ink: '#2C241E', // Создает text-history-ink
          bronze: '#A67C52',
          gold: '#C5A059',
          steel: '#737373',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};