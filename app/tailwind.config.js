module.exports = {
  content: [
    "./src/**/*.html",
    "./src/**/*.js",
    "./src/**/*.ts",
    "./src/**/*.tsx",
  ],
  variants: {
    extend: {},
  },
  theme: {
    extend: {
      colors: {
        'dark-primary': "#26282B",
        'dark-secondary': "#353941",
        primary: "#5F85DB",
        secondary: "#90B8F8",
      },
    },
  },
  plugins: [],
};
