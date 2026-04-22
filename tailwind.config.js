export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-white': '#FFFFFF',
        'brand-bg': '#F8FAFC', // Very light blue-grey background
        'brand-blue': '#0EA5E9', // Sky Blue
        'brand-blue-light': '#E0F2FE', // Soft selection blue
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Standard modern/crypto font
      },
    },
  },
  plugins: [],
}