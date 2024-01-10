const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  important: true,
  theme: {
    extend: {
      textColor: {
        primary: '#434761',
      },
      backgroundColor: theme => ({
        ...theme('colors'),
        'primary': '#1C60B3',
      }),
      boxShadow: {
        DEFAULT: '0 2px 6px 0 rgba(0, 0, 0, 0.15)',
        md: '0px 2px 12px #00000029',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.01)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.01)',
        '2xl': '1px 5px 35px 1px #949494'
      },
      colors: {
        'prime-purple': 'rgb(154, 31, 243)',
        'second-purple': '#8736f3',
        'third-purple': '#890862',
        'prime-blue': '#1663c3',
        'second-blue': '#2272d6',
        'origin-blue': '#0000ff',
        'light-blue': '#229ed9',
        'prime-orange': '#FF8929',
        'second-orange': '#F36A2B',
        'prime-yellow': '#eab215',
        'prime-red': '#f35151',
        'prime-pink': '#da332e',
        'light-pink': '#ec808d',
        'prime-green': '#3ecf8e',
        'prime-gray': '#f2f2f2',
        'teal': '#02a7f0',
        'dark-teal': '#026d9b',
        'prime-teal': '#00bfbf',
        'blue-zalo': '#008be6',
        'violet': '#8b32f4',
        'prime-violet': '#8b32f4',
        'light-red': '#d9001b',
      },
      outline: {
        blue: '2px solid rgba(0, 112, 244, 0.5)',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      fontSize: {
        xxs: ['0.625rem', { lineHeight: '1.5' }],
        xs: ['0.75rem', { lineHeight: '1.5' }],
        sm: ['0.875rem', { lineHeight: '1.5715' }],
        base: ['1rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        lg: ['1.125rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        xl: ['1.25rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        '2xl': ['1.5rem', { lineHeight: '1.33', letterSpacing: '-0.01em' }],
        '3xl': ['1.88rem', { lineHeight: '1.33', letterSpacing: '-0.01em' }],
        '4xl': ['2.25rem', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
        '5xl': ['3rem', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
        '6xl': ['3.75rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
      },
      keyframes: {
        ringring: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' }
        }
      },
      animation: {
        ringring: 'ringring 1s linear',
      },
      screens: {
        mobile: { 'max': '640px' },
        tablet: { 'max': '768px' },
      },
      borderWidth: {
        3: '3px',
      },
      borderRadius: {
        DEFAULT: '4px',
      },
      width: {
        '7/10': '70%',
      },
      minWidth: {
        8: '2rem',
        44: '11rem',
        56: '14rem',
        60: '15rem',
        80: '20rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      zIndex: {
        60: '60',
      },
      container: {
        center: true,
      },
    },
  },
  variants: {
    extend: {
      margin: ['first', 'last'],
      borderWidth: ['first', 'last'],
      padding: ['first', 'last'],
      textColor: ['active'],
      animation: ['hover', 'group-hover']
    },
  },
  plugins: [
    // eslint-disable-next-line global-require
    require('@tailwindcss/forms'),
  ],
};
