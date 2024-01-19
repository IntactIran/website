// @ts-check
const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import("tailwindcss/types").Config } */
module.exports = {
  content: [
    './node_modules/pliny/**/*.js',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './layouts/**/*.{js,ts,tsx}',
    './data/**/*.mdx',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        sans: ['var(--font-vazir)', 'var(--font-space-grotesk)', ...fontFamily.sans],
        serif: ['var(--font-nazanin)', 'var(--font-space-grotesk)', ...fontFamily.sans],
        mono: ['var(--font-yekan)', 'var(--font-space-grotesk)', ...fontFamily.sans],
      },
      // Palette: https://coolors.co/ececec-eaeef7-91969c-f96d67-203353
      colors: {
        primary: colors.pink,
        gray: colors.gray,
        antiFlashWhite: {
          50: '#ECECEC', //anti flash white
          100: '#E0E0E0', //platinum
          200: '#CCCCCC', //silver
          300: '#B8B8B8',
          400: '#A3A3A3',
          500: '#8F8F8F', //Battleship gray
          600: '#7A7A7A', //gray
          700: '#666666', //dim gray
          800: '#525252', //davy's gray
          900: '#3D3D3D', //onyx
        },
        ghostWhite: '#EAEEF7',
        cadetGray: {
          50: '#F4F5F5',
          100: '#DFE2E2',
          200: '#C9CFCF',
          300: '#B3BCBC',
          400: '#91969C', //Cadet Gray
          500: '#889696',
          600: '#738282',
          700: '#606C6C',
          800: '#4D5656',
          900: '#3A4141',
        },
        bittersweet: '#F96D67',
        delftBlue: {
          50: '#395A93',
          100: '#335184',
          200: '#2E4876',
          300: '#283F67',
          400: '#203353',
          500: '#1D2D49',
          600: '#17243B',
          700: '#111B2C',
          800: '#0B121D',
          900: '#06090F',
        },
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.600')}`,
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2': {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
            },
            h3: {
              fontWeight: '600',
            },
            code: {
              color: theme('colors.indigo.500'),
            },
          },
        },
        invert: {
          css: {
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.400')}`,
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.gray.100'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
