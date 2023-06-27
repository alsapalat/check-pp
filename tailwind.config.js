/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#323232',
        primary: '#454CB5',
        'primary-dark': '#32388E',
        danger: '#DB4343',
      },
      boxShadow: {
        card: '0px 4px 10px 0px rgba(69, 76, 181, 0.15)',
        'count-card': '0px 5px 27px 0px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class'
    }),
  ],
}

