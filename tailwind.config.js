/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'selector',
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', defaultTheme.fontFamily.sans],
        sono: ['Sono', defaultTheme.fontFamily.sans],
      },
      colors: {
        dark: '#18212f',
      },
    },
  },
  plugins: [],
};
