/** @type {import('tailwindcss').Config} */
const plugin = require('tailwind-scrollbar');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
      },
    },
  },
  plugins: [
    plugin({ nocompatible: true }),
  ],
}