/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        button: "#5FB868",
        section: "#F1F1F4",
      },
      colors: {
        text: "#5FB868",
      },
      fontSize: {},
      height: {},
      width: {},
    },

    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  plugins: [],
};
