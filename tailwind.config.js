/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        // Raw orientation breakpoints
        'portrait': { raw: '(orientation: portrait)' },
        'landscape': { raw: '(orientation: landscape)' },

        'landscape-phone': {
          raw: '(orientation: landscape) and (max-width: 640px)'
        },
        'portrait-phone': {
          raw: '(orientation: portrait) and (max-width: 400px)'
        },
      },
      screens: {
        //  breakpoint
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
};
