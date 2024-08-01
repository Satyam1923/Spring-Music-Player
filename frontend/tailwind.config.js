/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "h-md": { raw: "(max-height: 768px)" },
        sm: { max: "769px" },
        lg: { max: "1280px" },
        lgm: { max: "1140px" },
        md: { max: "1080px" },
        xs: { max: "480px" },
        minmd: "1700px",
        minlg: "2100px",
        cardmin: { min: "500px" },
      },
    },
  },
  plugins: [],
};
