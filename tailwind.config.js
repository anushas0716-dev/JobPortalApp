/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/index.css"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#3b82f6',
          500: '#2563eb',
          600: '#1d4ed8',
          700: '#1e40af',
        },
        secondary: {
          50: '#f9fafb',
          500: '#f3f4f6',
          600: '#d1d5db',
          700: '#9ca3af',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
