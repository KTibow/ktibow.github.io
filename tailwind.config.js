import typography from "@tailwindcss/typography";
export default {
  content: ["**/*.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "sans-serif", "system-ui"],
      },
    },
  },
  plugins: [typography],
};
