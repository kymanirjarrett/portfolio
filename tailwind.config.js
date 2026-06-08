/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FAFAF7',
        ink: '#0A0A0A',
        muted: '#5A5A55',
        accent: '#3B49DF',
        'accent-warm': '#FF7A45',
        surface: '#FFFFFF',
      },
      fontFamily: {
        display: ['"Clash Display"', 'system-ui', 'sans-serif'],
        sans: ['"Geist Sans"', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'monospace'],
      },
      backgroundImage: {
        'hero-gradient':
          'radial-gradient(ellipse 80% 60% at 50% -10%, #dde3ff 0%, #f5f5f0 55%, #FAFAF7 100%)',
        'accent-glow':
          'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(59,73,223,0.15) 0%, transparent 70%)',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'fade-up': 'fadeUp 0.6s ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
