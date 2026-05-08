import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Warm-dark "ink" — the canvas
        ink: {
          50: '#f8f6f1', // primary text on dark
          100: '#e8e3d6', // secondary text on dark
          200: '#a59e8e', // muted text
          300: '#6f6a5e', // disabled / very muted
          400: '#3d3a34', // hairline borders on dark
          500: '#2a2723', // raised surface (cards)
          600: '#1f1d1a', // surface
          700: '#161412', // background variant
          800: '#100e0c', // background
          900: '#080706', // deepest
        },
        // Warm gold accent — Wise's voice
        wise: {
          50: '#fff7e6',
          100: '#ffe8b8',
          200: '#ffd383',
          300: '#fcb84d',
          400: '#f3a02b',
          500: '#e08818', // primary accent
          600: '#bd6a0d',
          700: '#925009',
          800: '#693a08',
          900: '#3f2305',
        },
        // Cool counterpoint for state colors
        sage: {
          400: '#7fb89f',
          500: '#5d9f86',
          600: '#43806c',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
      backgroundImage: {
        // Subtle warm aurora — used as the page backdrop
        'wise-aurora':
          'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(224, 136, 24, 0.10), transparent 60%), radial-gradient(ellipse 60% 40% at 0% 100%, rgba(93, 159, 134, 0.06), transparent 60%)',
        'orb-gradient':
          'radial-gradient(circle at 30% 30%, rgba(255, 211, 131, 0.95), rgba(224, 136, 24, 0.85) 40%, rgba(146, 80, 9, 0.95) 75%, rgba(63, 35, 5, 1) 100%)',
      },
      boxShadow: {
        'orb-glow':
          '0 0 60px 10px rgba(224, 136, 24, 0.35), 0 0 120px 30px rgba(224, 136, 24, 0.15)',
        'orb-glow-active':
          '0 0 80px 20px rgba(224, 136, 24, 0.55), 0 0 180px 50px rgba(224, 136, 24, 0.25)',
      },
      animation: {
        'orb-breathe': 'orb-breathe 4s ease-in-out infinite',
        'orb-pulse': 'orb-pulse 1.2s ease-in-out infinite',
        'orb-spin-slow': 'spin 12s linear infinite',
        'fade-up': 'fade-up 0.5s ease-out forwards',
      },
      keyframes: {
        'orb-breathe': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.95' },
          '50%': { transform: 'scale(1.04)', opacity: '1' },
        },
        'orb-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.10)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
