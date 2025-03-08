/** @type {import('tailwindcss').Config} */
const fluid = require('fluid-tailwind');
const { screens, extract } = fluid;

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // Enable dark mode based on class
  theme: {
    screens,
    fontSize: {
      'xs': '0.75rem',
      'sm': '0.875rem',
      'base': '1rem',
      'lg': '2.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '2.5rem',
      '6xl': '2.75rem',
      '7xl': '4.5rem',
      '8xl': '6.25rem',
      'fluid': 'clamp(1.25rem, 3.783vw + 0.271rem, 5rem)',
      'jumbo': '4vw',
    },
    extend: {
      clipPath: {
        'inset-1': 'inset(1rem 1rem 33% 1rem round 1rem)',
        'inset-0': 'inset(0rem 0rem 0rem 0rem round 1rem)',
      },
      colors: {
        primary: 'var(--color-theme-primary)',
        secondary: 'var(--color-theme-secondary)',
        accent: 'var(--accent-color)', // General accent color
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        'accent-7': '#333',
        success: '#0070f3',
        cyan: '#79FFE1',
        bodyBackgroundColor: '#fafafa',
        backgroundColor: '#f4f4f5',
        surface1: '#c1c1c1',
        surface2: '#6f6f6f',
        surface3: '#C0C6C9',
        backgroundColorInv: '#6b7280',
        headingColor: '#52525b',
        textColor: '#09090b',
        subtextColor: '#52525b',
        textColorInv: '#fafafa',
        navBg: 'var(--nav-bg)',
        accentPri: '#EF7801',
        accentSec: '#FCD00A',
        gradStart: '#EF7801',
        gradStop: '#f4f4f5',
        textAccent: '#d946ef',
        stateSuccessBackground: '#d946ef',
      },
      spacing: {
        28: '7rem',
        'panel-xs': '300px',
        'panel-sm': '400px',
        header: '20rem',
        footer: '20rem',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      lineHeight: {
        tight: 1.2,
      },
      fontFamily: {
        interp: ['interphase', 'sans-serif'],
        tron: ['Tronica Mono', 'sans-serif'],
        aon: ['Aeonik Pro', 'sans-serif'],
      },
      boxShadow: {
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      width: {
        'panel-xs': '300px',
        'panel-sm': '400px',
      },
      height: {
        vhr: 'calc(100vh - 150px)',
        vhh: '64vh',
        vh33: '33vh',
        vh44: '44vh',
        vh55: '55vh',
        vh66: '66vh',
        header: '20rem',
        footer: '20rem',
      },
      padding: {
        vhh: '64vh',
        xlx: '10vw',
        header: '20rem',
      },
      margin: {
        vhh: '64vh',
      },
      zIndex: {
        nav: '9999',
      },
    },
    fluid,
  },
  plugins: [
    require('@tailwindcss/postcss'),
  ],
};
