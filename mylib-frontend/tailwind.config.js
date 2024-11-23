/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx,js,jsx}"
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
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
      },
      animation: {
        slideOut: 'slideOut 0.5s ease-in-out forwards',
        slideIn: 'slideIn 0.5s ease-in-out forwards',
      },
    },
  },
  plugins: [
  ],
}

