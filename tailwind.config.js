/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: "#ffbf00",
        silver: "#e6e6e6",
        bronze: "#CD7F32",
      },
    },
    animation: {
      test: "move-down 2s ease-in-out",
      "move-up": "move-up 2s ease-in-out",
      scale: "scale-up 1.5s ease-in-out ",
    },
    keyframes: {
      "move-down": {
        "0%, 100%": { transform: "translateY(0vh)" },
        "50%": { transform: "translateY(48px)" },
        "75%": { transform: "translateY(48px)", opacity: "1" },
      },
      "move-up": {
        "0%, 100%": { transform: "translate(0)" },
        "50%": { transform: "translateY(-48px)" },
        "75%": { transform: "translateY(-48px)", opacity: "1" },
      },
      "scale-up": {
        "0%": {
          transform: "translate(-50%, 0%) scale(1)",
          opacity: 1,
        },
        "50%": {
          transform: "translate(-50%, 0%) scale(1.5) ",
          opacity: 1,
        },
        "100%": { transform: "translate(-50%, 0%) scale(1.5) ", opacity: 0 },
      },
    },
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
