/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "rat-pattern": "url('/images/rat.jpg')",
        "footer-texture": "url('/imgages/2.svg')",
      },
    },
  },
  plugins: [],
};
