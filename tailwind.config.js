module.exports = {
  content: ["**/*.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "sans-serif", "system-ui"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
