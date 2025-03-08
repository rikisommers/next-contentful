/** @type {import('tailwindcss').Config} */
import fluid, { screens, fontSize, extract } from 'fluid-tailwind'

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    extract,
  ],
  darkMode: 'class', // Enable dark mode based on class
  theme: {
    screens,
    fontSize,
    extend: {
      clipPath: {
        'inset-1': 'inset(1rem 1rem 33% 1rem round 1rem)',
        'inset-0': 'inset(0rem 0rem 0rem 0rem round 1rem)',
      },
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        accent: 'var(--accent-color)', // General accent color
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        'accent-7': '#333',
        success: '#0070f3',
        cyan: '#79FFE1',
        bodyBackgroundColor: 'var(--body-bg)',
        backgroundColor: 'var(--bg-color)',
        surface1: 'var(--surface-1)',
        surface2: 'var(--surface-2)',
        surface3: 'var(--surface-3)',
        headingColor: 'var(--heading-color)',
        textColor: 'var(--text-color)',
        subtextColor: 'var(--subtext-color)',
        textColorInv: 'var(--text-color-inv)',
        navBg: 'var(--nav-bg)',
        textAccent: 'var(--text-accent)', // Use textAccent instead of accentPri/Sec
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
      fontSize: {
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem',
        fluid: 'clamp(1.25rem, 3.783vw + 0.271rem, 5rem)',
        jumbo: '4vw',
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
  plugins: [],
};
