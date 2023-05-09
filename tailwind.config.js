/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        Baskerville: ["Baskerville", "sans-serif"],
        Montserrat: ["Montserrat", "sans-serif"],
        Abril: ["'Abril Fatface'", "sans-serif"],
        Poppins: ["Poppins", "sans-serif"],
        Staatliches: ["Staatliches", "sans-serif"],
        Outfit: ["Outfit", "sans-serif"],
      },
      colors: {
        body_color: "#FFEBD2",
        heart: "#FFB4B4",
      },
    },
  },
  plugins: [],
};
