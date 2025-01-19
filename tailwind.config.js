module.exports = {
  content: [
    './pages/**/*.{html,js,vue}',
    './components/**/*.{html,js,vue}',
    './layouts/**/*.{html,js,vue}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff6a00', // Swiss-style orange
        black: '#000000',
        white: '#ffffff',
      },
      fontFamily: {
        sans: ['Helvetica Neue', 'Arial', 'sans-serif'], // Swiss-style fonts
      },
    },
  },
  plugins: [],
};