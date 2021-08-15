module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.js',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        'card': '0 4px 8px rgba(55, 48, 163, 0.75)',
        'card-dark': '0 4px 8px rgba(55, 48, 163, 1)'
      },
      dropShadow: {
        'card': '0 4px 3px rgba(55, 48, 163, 0.4)',
        'card-dark': '0 4px 3px rgba(55, 48, 163, 0.75)'
      },
    },
    fontFamily: {
      'sans': ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
    },
    fontSize: {
      'xs': ['10px', '16px'],
      'sm': ['12px', '20px'],
      'md': ['14px', '24px'],
      'lg': ['18px', '30px'],
      'xl': ['24px', '36px'],
      '2xl': ['30px', '44px'],
      '3xl': ['38px', '56px'],
    },
    maxWidth: {
      'xl': '24rem',
      'lg': '20rem',
      'md': '16rem',
      'sm': '12rem',
      'xs': '10rem',
    }
  },
  variants: {
    extend: {
      boxShadow: ['dark', 'hover'],
      dropShadow: ['dark', 'hover'],
      ringColor: ['hover'],
      ringWidth: ['hover']
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
