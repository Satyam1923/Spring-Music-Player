/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'h-md': {'raw': '(max-height: 768px)'},
        sm: {max:"690px"},
      lg: { max: "1800px" },
      lgm: { max: "1140px" },
      md: { max: "990px" },
      xs: { max: "480px" },
      minmd: "1700px",
      minlg: "2100px",
    },
    },
  },
  plugins: [],
}