/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens:{
        'xxl':'1920px'
      },
      colors: {
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        'accent-7': '#333',
        success: '#0070f3',
        cyan: '#79FFE1',
      },
      spacing: {
        28: '7rem',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem',
      },
      boxShadow: {
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      height:{
        'vhr':'calc(100vh - 150px)',
        'vhh':'64vh',
        'vh33':'33vh',
        'vh66':'66vh',
        'header':'20rem'
      },
      padding:{
        'vhh':'64vh',
        'xlx':'10vw',
        'header':'20rem'
      },
      margin:{
        'vhh':'64vh'
      },
      zIndex:{
        nav:'9999',
      }
    },
  },
  plugins: [],
}
