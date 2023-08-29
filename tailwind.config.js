module.exports = {
  purge: {
    content: [
      './src/**/*.html',
      './src/**/*.vue',
      './src/**/*.js',
      './src/**/*.{html,js}', './node_modules/tw-elements/dist/js/**/*.js'
    ],
    options: {
      keyframes: true,
      fontFace: true
    },
  },
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        body: ['Lato']
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
      backgroundColor: ['disabled']
    },
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ],
}
