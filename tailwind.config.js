/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './app.js',
  ],
  theme: {
    extend: {
      colors: {
        card: "#222",
        light: "#E8E9EB",
        dark: "#1E3040",
        my_blue: "#0554F2",
        my_orange: "#F29D35"
      },
      boxShadow: {
        'custom': '0 15px 35px rgba(0, 0, 0, 0.9)',
      },
      fontFamily: {
        princ: ['Goldman', 'sans-serif'],
        sec: ['Quicksand', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}