/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "blue": "#0091FF",
        "green": "#478A6D",
        "red": "#FF4C3F",
        "redDark": "#FB4C3D",
        "orangeLight": "#DF9822",
        "orange": "#FF9700",
        "orangeDark": "#FF8F01",
        "yellowDark": "#A56D00",
        "yellowDarker": "#54451A",
        "blueGrayLight": "#708387",
        "blueGrayDark": "#2F3A3C",
        "blueGrayDarker": "#1B2628",
      },
    },
  },
  plugins: [],
}