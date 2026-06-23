import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        base: '#050505',
        elevated: '#0c0c0c',
        surface: '#141414',
        accent: {
          DEFAULT: '#7c3aed',
          soft: 'rgba(124, 58, 237, 0.12)',
        },
        dark: {
          900: '#050505',
          800: '#0c0c0c',
          700: '#141414',
          600: '#1c1c1c',
          500: '#27272a',
        },
      },
      fontFamily: {
        display: ['Syne', 'Outfit', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        editorial: ['Instrument Serif', 'Georgia', 'serif'],
        garamond: ['Cormorant Garamond', 'Georgia', 'serif'],
        caslon: ['"Libre Caslon Text"', 'Georgia', 'serif'],
      },
      fontSize: {
        'display-sm': ['3.5rem', { lineHeight: '1', letterSpacing: '-0.03em' }],
        'display-md': ['5rem', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        'display-lg': ['7.5rem', { lineHeight: '0.9', letterSpacing: '-0.04em' }],
      },
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'marquee-vertical': 'marqueeVertical var(--duration, 30s) linear infinite',
        'x-slider': 'xSlider var(--slider-duration, 45s) linear infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marqueeVertical: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
        xSlider: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
