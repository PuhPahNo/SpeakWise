import type { Config } from 'tailwindcss';

// ── Design direction: "Brina" + "Aqua" (Claude Design handoff) ──────────────
// Sleek & AI-native cool-glass dark theme. The semantic token NAMES are kept
// (ink/wise/sage) so every existing component reskins without edits; only the
// underlying values change. oklch with an <alpha-value> slot so Tailwind's
// opacity modifiers (bg-ink-800/70, text-wise-400/40, …) still resolve.
// Accent = Aqua oklch(0.82 0.12 200); counterpoint = Iris oklch(0.70 0.13 290).

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Cool-slate "ink" — the canvas (hue ~250)
        ink: {
          50: 'oklch(0.97 0.006 250 / <alpha-value>)', // primary text on dark
          100: 'oklch(0.88 0.010 250 / <alpha-value>)', // secondary text
          200: 'oklch(0.74 0.012 250 / <alpha-value>)', // muted text
          300: 'oklch(0.56 0.014 250 / <alpha-value>)', // disabled / very muted
          400: 'oklch(0.40 0.014 250 / <alpha-value>)', // hairline borders
          500: 'oklch(0.24 0.016 252 / <alpha-value>)', // raised surface (cards)
          600: 'oklch(0.20 0.014 250 / <alpha-value>)', // surface
          700: 'oklch(0.185 0.013 250 / <alpha-value>)', // background variant
          800: 'oklch(0.16 0.012 250 / <alpha-value>)', // background
          900: 'oklch(0.12 0.012 250 / <alpha-value>)', // deepest
        },
        // Aqua accent — Wise's voice
        wise: {
          50: 'oklch(0.97 0.025 200 / <alpha-value>)',
          100: 'oklch(0.93 0.050 200 / <alpha-value>)',
          200: 'oklch(0.89 0.080 200 / <alpha-value>)',
          300: 'oklch(0.86 0.100 200 / <alpha-value>)',
          400: 'oklch(0.84 0.115 200 / <alpha-value>)',
          500: 'oklch(0.82 0.120 200 / <alpha-value>)', // primary accent
          600: 'oklch(0.73 0.115 203 / <alpha-value>)',
          700: 'oklch(0.62 0.100 207 / <alpha-value>)',
          800: 'oklch(0.50 0.085 210 / <alpha-value>)',
          900: 'oklch(0.38 0.065 214 / <alpha-value>)',
        },
        // Iris counterpoint for state colors
        sage: {
          400: 'oklch(0.78 0.110 290 / <alpha-value>)',
          500: 'oklch(0.70 0.130 290 / <alpha-value>)',
          600: 'oklch(0.60 0.120 292 / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        // Brina radii
        xl: '14px',
        '2xl': '18px',
      },
      backgroundImage: {
        // Brina aurora — cool teal glow top-right + iris wash bottom-left
        'wise-aurora':
          'radial-gradient(ellipse 65% 50% at 78% -10%, color-mix(in oklch, oklch(0.82 0.12 200) 22%, transparent), transparent 55%), radial-gradient(ellipse 50% 45% at 10% 110%, color-mix(in oklch, oklch(0.70 0.13 290) 32%, transparent), transparent 60%)',
        'orb-gradient':
          'radial-gradient(circle at 32% 30%, color-mix(in oklch, oklch(0.82 0.12 200) 90%, white), oklch(0.82 0.12 200) 55%, color-mix(in oklch, oklch(0.82 0.12 200) 60%, black) 100%)',
      },
      boxShadow: {
        'orb-glow': '0 0 60px 10px color-mix(in oklch, oklch(0.82 0.12 200) 35%, transparent)',
        'orb-glow-active':
          '0 0 80px 20px color-mix(in oklch, oklch(0.82 0.12 200) 55%, transparent)',
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
