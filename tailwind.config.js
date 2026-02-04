/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', 'sans-serif'],
        secondary: ['Georgia', 'serif']
      },
      colors: {
        grey: "#242424",
        red: "#FF0000",
      },
    },
  },
  plugins: [],
};
