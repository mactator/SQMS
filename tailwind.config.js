/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {},
  plugins: [require("daisyui"), require("tailwindcss-animate")],
  daisyui: {
    themes: [
      {
        winter: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#2563eb",
        },
      },
    ],
  },
};
