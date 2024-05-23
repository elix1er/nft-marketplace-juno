/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{html,js,ts,tsx}",
    "./pages/**/*.{html,js,ts,tsx}"

  ],
  plugins: [
    require('tailwind-scrollbar'),
    require('@tailwindcss/forms'),

    // plugin(function ({ addVariant }) {
    //   addVariant('link-active', '&.router-link-active') // NuxtLink active
    // })
  ]
}