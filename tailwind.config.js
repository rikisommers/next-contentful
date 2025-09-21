/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './utils/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
     
      gradientColorStops: theme => ({
        ...theme('colors.theme')
      }),
      fontFamily: {
        'roobert': ['Roobert-Regular', 'sans-serif'],
        'interphase': ['Interphase', 'sans-serif'],
        'tron': ['Tronica Mono', 'monospace'],
        'mono': ['Aeonik Mono Light', 'monospace'],
        'aeonik-mono': ['Aeonik Mono Regular', 'monospace'],
        'aon-mono': ['Aeonik Mono Medium', 'monospace'],
        'aon-thin': ['Aeonik Mono Thin', 'monospace'],
        'aon-pro': ['Aeonik Pro Light', 'sans-serif'],
        'aon-bold': ['Aeonik Bold', 'sans-serif'],
        'aon-regular': ['Aeonik Regular', 'sans-serif'],
        'milling': ['MillingTrial-Duplex1mm', 'sans-serif'],
        'jetbrains': ['JetBrains Mono', 'monospace'],
        'garamond': ['ITCGaramondStd-LtNarrow', 'serif'],
        'brett': ['BrettTrial-Regular', 'sans-serif'],
      },
      spacing: {
        'none': '0',
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
      },
      gap: theme => ({
        ...theme('spacing')
      }),
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '16px',
        'full': '9999px',
      },
      boxShadow: {
        'sm': '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        'md': '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
        'lg': '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
      },
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'base': '16px',
        'lg': '18px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '32px',
        '4xl': '48px',
        '5xl': '64px',
      },
      lineHeight: {
        'tight': '1.2',
        'normal': '1.5',
        'loose': '1.8',
      },
      letterSpacing: {
        'tight': '-0.05em',
        'normal': '0',
        'wide': '0.05em',
      },
      transitionProperty: {
        'colors': 'background-color, border-color, color, fill, stroke',
        'opacity': 'opacity',
        'shadow': 'box-shadow',
        'transform': 'transform',
      },
      transitionTimingFunction: {
        'linear': 'linear',
        'ease': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '75': '75ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
        '700': '700ms',
        '1000': '1000ms',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /^(bg|text|border|hover:bg|hover:text|hover:border)-(theme)-.+/,
    },
    {
      pattern: /^(font)-.+/,
    },
    {
      pattern: /^(gap)-.+/,
    },
    {
      pattern: /^(rounded)-.+/,
    },
    {
      pattern: /^(shadow)-.+/,
    },
    {
      pattern: /^(text)-.+/,
    },
    {
      pattern: /^(leading)-.+/,
    },
    {
      pattern: /^(tracking)-.+/,
    },
    {
      pattern: /^(transition)-.+/,
    },
    {
      pattern: /^(duration)-.+/,
    },
    {
      pattern: /^(ease)-.+/,
    },
    {
      pattern: /^(animate)-.+/,
    }
    ,
    // Ensure grid start utilities are not purged when generated via utils
    {
      pattern: /^(col-start|row-start)-(1|2|3|4|5|6|7|8|9|10|11|12)$/,
    },
    // Ensure column span utilities are not purged when generated via utils
    {
      pattern: /^(col-span)-(1|2|3|4|5|6|7|8|9|10|11|12)$/,
    },
    // Ensure responsive column span utilities are not purged
    {
      pattern: /^(lg:|md:|sm:|xl:)(col-span)-(1|2|3|4|5|6|7|8|9|10|11|12)$/,
    },
    // Ensure dynamic height utilities are not purged
    {
      pattern: /^h-\[\d+(vh|%)\]$/,
    },
    // Explicit safelist for 12-column grid classes
    'col-span-1', 'col-span-2', 'col-span-3', 'col-span-4', 'col-span-5', 'col-span-6',
    'col-span-7', 'col-span-8', 'col-span-9', 'col-span-10', 'col-span-11', 'col-span-12',
    'lg:col-span-1', 'lg:col-span-2', 'lg:col-span-3', 'lg:col-span-4', 'lg:col-span-5', 'lg:col-span-6',
    'lg:col-span-7', 'lg:col-span-8', 'lg:col-span-9', 'lg:col-span-10', 'lg:col-span-11', 'lg:col-span-12',
    'row-start-1', 'row-start-2', 'row-start-3', 'row-start-4', 'row-start-5', 'row-start-6',
    'row-start-7', 'row-start-8', 'row-start-9', 'row-start-10', 'row-start-11', 'row-start-12',
    'col-start-1', 'col-start-2', 'col-start-3', 'col-start-4', 'col-start-5', 'col-start-6',
    'col-start-7', 'col-start-8', 'col-start-9', 'col-start-10', 'col-start-11', 'col-start-12',
    // Important versions to override conflicting styles
    '!row-start-1', '!row-start-2', '!row-start-3', '!row-start-4', '!row-start-5', '!row-start-6',
    '!row-start-7', '!row-start-8', '!row-start-9', '!row-start-10', '!row-start-11', '!row-start-12',
    '!col-start-1', '!col-start-2', '!col-start-3', '!col-start-4', '!col-start-5', '!col-start-6',
    '!col-start-7', '!col-start-8', '!col-start-9', '!col-start-10', '!col-start-11', '!col-start-12',
    // Test specific classes that should work
    'row-start-8', 'col-start-7',
    // Dynamic height classes
    'h-[10vh]', 'h-[15vh]', 'h-[20vh]', 'h-[25vh]', 'h-[30vh]',
    'h-[35vh]', 'h-[40vh]', 'h-[45vh]', 'h-[50vh]', 'h-[55vh]',
    'h-[60vh]', 'h-[65vh]', 'h-[70vh]', 'h-[75vh]', 'h-[80vh]',
    'h-[85vh]', 'h-[90vh]', 'h-[95vh]', 'h-[100vh]'
  ]
} 