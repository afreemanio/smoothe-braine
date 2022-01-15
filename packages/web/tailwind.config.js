const defaultTheme = require('tailwindcss/defaultTheme')
    
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}'],
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  mode: 'jit',
  theme: {
    fontFamily: {
      'body': ['Poppins', ...defaultTheme.fontFamily.sans]
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1400px',
    },
    extend: {
      screens: {
        '3xl': '1900px',
      },
    },
  },
  plugins: [],
}


// module.exports = {
//   mode: "jit",
//   purge: [
//     "./pages/**/*.{js,ts,jsx,tsx}",
//   ],
//   darkMode: false, // or 'media' or 'class'
//   theme: {
//     extend: {},
//   },
//   variants: {
//     extend: {},
//   },
//   plugins: [],
// };   mode: "jit",
//   purge: [
//     "./pages/**/*.{js,ts,jsx,tsx}",
//   ],
//   darkMode: false, // or 'media' or 'class'
//   theme: {
//     extend: {},
//   },
//   variants: {
//     extend: {},
//   },
//   plugins: [],
// };