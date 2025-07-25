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
      boxShadow: {
        "shBlue": "0px 5px 0px 0px rgba(0,109,191,0.75)",
        "shRedDark": "0px 5px 0px 0px rgba(251,76,61,0.75)",
        "shYellowDark": "0px 5px 0px 0px rgba(100,65,0,0.75)",
        "blackDark": "0px 5px 0px 0px rgba(0,0,0,0.9)",
        "blackTransparent": "0px 7px 0px 0px rgba(0,0,0,0.5)"
      }
    },
  },
  plugins: [],
}