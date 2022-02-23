module.exports = {
  // mode: 'jit',
  // // These paths are just examples, customize them to match your project structure
  // purge: [
  //   './public/**/*.html',
  //   './src/**/*.{js,jsx,ts,tsx,vue}',
  // ],
  theme: {
    extend: {
      colors: {
        main: "#5A0C0C",
        mainDarker: "#360707",
        bg: "#FEF1EB",
        bgDarker: "#FDD5C3",
        highlight: "#ED474A",
        accent: "rgb(255 133 76)",
      },
      fontFamily: {
        accent: `Cantata One, Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol`,
        body: `Lato, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, roboto, noto, arial, sans-serif`,
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
