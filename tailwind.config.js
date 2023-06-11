/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        xs: '320px', // Add this line for the xs screen size
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      }
    },
  },
  plugins: [],
}

