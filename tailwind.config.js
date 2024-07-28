/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      sm: "599px",
      tablet: "600px",
      md: "1000px",
      lg: "1280px",
      xl: "1920px",
    },
  },
  plugins: [],
};
