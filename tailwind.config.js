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
      keyframes: {
        bounceRight: {
          "0%, 100%": {
            transform: "translateX(0)",
          },
          "50%": {
            transform: "translateX(10px)",
          },
        },
        bounceLeft: {
          "0%, 100%": {
            transform: "translateX(0)",
          },
          "50%": {
            transform: "translateX(-10px)",
          },
        },
      },
      animation: {
        bounceRight: "bounceRight 1s ease-in-out infinite",
        bounceLeft: "bounceLeft 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
