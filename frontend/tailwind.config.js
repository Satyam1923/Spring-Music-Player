/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'gradient-to-20': 
            'linear-gradient(20deg, #000000 10%,#ff00ff 40%,#090088  , #000000 70%)',
       
       
      }),

    },
  },
  plugins: [],
}