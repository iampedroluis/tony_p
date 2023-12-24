/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'regal-blue': '#243c5a',
        'text-black': '#1D1D1F'
      },
    },
  },
  darkMode: 'class',
  plugins: [require("daisyui")],
}

