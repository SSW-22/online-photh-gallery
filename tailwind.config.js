/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    // container: {
    //   center: true,
    //   padding: "4rem",
    // },
    extend: {
      fontFamily: {
        average: ["average", "sans-serif"],
      },
    },
  },
  plugins: [],
};
