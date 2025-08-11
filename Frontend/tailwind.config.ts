// tailwind.config.js
import typography from '@tailwindcss/typography';

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        merchant: ['Merchant', 'sans-serif'],
        sans: ['"Instrument Sans"', 'sans-serif'],
        instrumentSans: ['"Instrument Sans"', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        primaryText: '#0E0E0E',
      },
      textColor: {
        DEFAULT: '#0E0E0E',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1030px', 
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [typography],
};
