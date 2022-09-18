/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    // container: {
    //   center: true,
    //   padding: "4rem",
    // },
    extend: {
      gridTemplateColumns: {
        4: "repeat(auto-fit, minmax(200px, 1fr))",
      },
      fontFamily: {
        average: ["average", "sans-serif"],
      },
    },
  },
  plugins: [],
};
