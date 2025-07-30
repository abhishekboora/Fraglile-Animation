/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

const plugin = require("tailwind-scrollbar-hide");

module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Include all relevant files in src folder
    "./public/index.html",             // Optional: if you use public/index.html
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E43E5A",      // Brand color
        darkBg: "#1a1a2a",       // Dark background
        softBg: "#2a1a1a",       // Soft background
      },
      fontFamily: {
        fancy: ['"Poppins"', "sans-serif"],
      },
      animation: {
        'gradient-x': 'gradient-x 6s ease infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-position': '0% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
        },
      },
      backgroundSize: {
        'size-200': '200% 200%',
      },
    },
  },
  plugins: [
    plugin,                         // Scrollbar hide
    require("@tailwindcss/forms"), // Beautiful forms
    require("@tailwindcss/typography"), // Better typography
  ],
};
