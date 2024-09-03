/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        typeMachine: ['Type Machine', 'sans-serif'],  // Add 'Type Machine' font
      },
      width: {
        '1/10': '10%',  // Add custom width of 10%
        '9/10': '90%'
      },
      height: {
        '9/10': '90%'
      },
      screens: {
        'mobile-sm': { 'min': '320px', 'max': '480px' }, // Custom screen range
      },
    },
  },
  plugins: [
  ],
}

