/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // "Blue hour" palette. Cobalt does most of the work; ember is reserved
      // for the primary action and the "in active development" marker, and is
      // only ever a fill with ink text on it (it fails contrast as text).
      colors: {
        paper: '#F7F7FC',
        ink: '#141432',
        cobalt: '#2F54EB',
        violet: '#7B4DFF',
        ember: '#FF7F11',
        muted: '#55567A', // 6.56:1 on paper
        'muted-inverse': '#A9AACB', // 7.91:1 on ink
      },
      fontFamily: {
        display: ['"Mona Sans Variable"', 'system-ui', 'sans-serif'],
        sans: ['"Atkinson Hyperlegible Next Variable"', 'system-ui', 'sans-serif'],
      },
      // Fluid role scale: large monitors get larger type instead of empty margins.
      fontSize: {
        hero: ['clamp(3.5rem, 2rem + 7.5vw, 11rem)', { lineHeight: '0.92', letterSpacing: '-0.03em' }],
        h2: ['clamp(2.25rem, 1.4rem + 3.2vw, 5.5rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
        h3: ['clamp(1.375rem, 1.1rem + 0.9vw, 2.25rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        lead: ['clamp(1.125rem, 1rem + 0.5vw, 1.5rem)', { lineHeight: '1.5' }],
        body: ['clamp(1rem, 0.95rem + 0.2vw, 1.125rem)', { lineHeight: '1.6' }],
        small: ['0.875rem', { lineHeight: '1.45' }],
      },
      // Radius follows hierarchy: sharp on dense items, soft on the few large panels.
      borderRadius: {
        tag: '4px',
        panel: '1.5rem',
      },
      maxWidth: {
        measure: '68ch',
      },
      spacing: {
        gutter: 'var(--gutter)',
        section: 'clamp(4rem, 3rem + 4vw, 8rem)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
