/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F5F6FA",
        sidebar: "#FFFFFF",
        primary: "#5A67D8",
        secondary: "#A0AEC0",
        accent: "#10B981",
        card: "#FFFFFF",
        "finpay-blue": "#4A56E2",
        "finpay-purple": "#7C3AED",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
