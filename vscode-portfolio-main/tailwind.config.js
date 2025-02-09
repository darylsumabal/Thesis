/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        jetbrains: ["jetbrains mono", "mono"],
      },
    },
  },
  daisyui: {
    themes: ["synthwave", "dracula", "dark", "night", "sunset","halloween"],
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
};
