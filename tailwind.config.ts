import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand: calm teal/sage for a caring, trustworthy feel
        brand: {
          50:  'hsl(174, 60%, 96%)',
          100: 'hsl(174, 55%, 88%)',
          200: 'hsl(174, 50%, 74%)',
          300: 'hsl(174, 48%, 58%)',
          400: 'hsl(174, 45%, 44%)',
          500: 'hsl(174, 50%, 34%)',  // primary
          600: 'hsl(174, 52%, 27%)',
          700: 'hsl(174, 54%, 21%)',
          800: 'hsl(174, 56%, 15%)',
          900: 'hsl(174, 58%, 10%)',
        },
        // Surface grays — dark mode ready
        surface: {
          50:  'hsl(220, 20%, 98%)',
          100: 'hsl(220, 18%, 94%)',
          200: 'hsl(220, 16%, 88%)',
          300: 'hsl(220, 14%, 78%)',
          400: 'hsl(220, 12%, 62%)',
          500: 'hsl(220, 10%, 46%)',
          600: 'hsl(220, 12%, 32%)',
          700: 'hsl(220, 14%, 22%)',
          800: 'hsl(220, 16%, 14%)',
          900: 'hsl(220, 18%, 9%)',
          950: 'hsl(220, 20%, 6%)',
        },
        // Semantic alert colours
        severity: {
          low:      'hsl(145, 60%, 42%)',
          medium:   'hsl(38,  90%, 50%)',
          high:     'hsl(24,  90%, 50%)',
          critical: 'hsl(0,   84%, 52%)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.07), 0 1px 2px -1px rgb(0 0 0 / 0.07)',
        'card-md': '0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.08)',
        'card-lg': '0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.08)',
        'glow-brand': '0 0 0 3px hsl(174 50% 34% / 0.25)',
        'glow-red': '0 0 0 3px hsl(0 84% 52% / 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-gentle': 'bounceGentle 1s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
