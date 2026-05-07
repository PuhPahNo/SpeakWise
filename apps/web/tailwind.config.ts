import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f7f6f3',
          100: '#ecebe6',
          200: '#d8d6cc',
          300: '#b9b6a8',
          400: '#92907f',
          500: '#6e6c5e',
          600: '#4d4c43',
          700: '#33332d',
          800: '#1f1f1c',
          900: '#0f0f0e',
        },
        wise: {
          50: '#fff8ec',
          100: '#ffeaca',
          200: '#ffd28e',
          300: '#ffb554',
          400: '#fc9821',
          500: '#ed7d09',
          600: '#cc5e04',
          700: '#a64308',
          800: '#86340e',
          900: '#6e2c0f',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
