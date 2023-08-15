/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-default)',
        'default': 'var(--font-default)',
        'primary': 'var(--font-primary)',
        'secondary': 'var(--font-secondary)',
      },
      colors: {
        'green-basic': 'var(--color-primary)',
        'secondary-basic': 'var(--color-secondary)',
        'default-basic': 'var(--color-default)',
      },
      backgroundColor: {
        'green-basic': 'var(--color-primary)',
        'secondary-basic': 'var(--color-secondary)',
        'default-basic': 'var(--color-default)',
      },
    },
  },
  plugins: [],
}

