/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    container: { center: true, padding: '1rem' },
    extend: {
      colors: {
        background: { DEFAULT: 'rgb(var(--background-rgb) / <alpha-value>)' },
        foreground: { DEFAULT: 'var(--foreground)' },
        primary: { DEFAULT: 'rgb(var(--primary-rgb) / <alpha-value>)', foreground: 'var(--primary-foreground)' },
        secondary: { DEFAULT: 'var(--secondary)', foreground: 'var(--secondary-foreground)' },
        accent: { DEFAULT: 'var(--accent)', foreground: 'var(--accent-foreground)' },
        muted: { DEFAULT: 'var(--muted)', foreground: 'var(--muted-foreground)' },
        card: { DEFAULT: 'var(--card)', foreground: 'var(--card-foreground)' },
        border: { DEFAULT: 'var(--border)' },
        input: { DEFAULT: 'var(--input)' },
        ring: { DEFAULT: 'var(--ring)' },
        success: { DEFAULT: 'var(--success)', foreground: 'var(--success-foreground)' },
        warning: { DEFAULT: 'var(--warning)', foreground: 'var(--warning-foreground)' },
        destructive: { DEFAULT: 'var(--destructive)', foreground: 'var(--destructive-foreground)' },
        ink: {
          DEFAULT: 'rgb(var(--ink-rgb) / <alpha-value>)',
          foreground: 'rgb(var(--ink-foreground-rgb) / <alpha-value>)',
        },
        gold: { DEFAULT: 'var(--gold)', foreground: 'var(--gold-foreground)' },
        sand: { DEFAULT: 'var(--sand)' },
        ocean: { DEFAULT: 'var(--ocean)', foreground: 'var(--ocean-foreground)' },
        sage: { DEFAULT: 'var(--sage)' },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 4px)',
        sm: 'calc(var(--radius) - 8px)',
      },
      fontFamily: {
        sans: ['var(--font-manrope)', 'sans-serif'],
        display: ['var(--font-cormorant)', 'serif'],
      },
      maxWidth: {
        'screen-2xl': '1536px',
      },
      keyframes: {
        'drawer-in': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'drawer-in': 'drawer-in 300ms ease-out',
        'fade-up': 'fade-up 200ms ease-out',
        'spin-slow': 'spin-slow 22s linear infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
