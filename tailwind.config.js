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
        accent: "'DM Serif Text', serif",
        body: "'Nunito', sans-serif",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
