/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // "Warm daylight" palette, light only. Contrast on canvas: ink 13.18:1,
      // muted 4.99:1, accent 5.77:1 (all pass WCAG AA for body text). The level
      // ramp sits between GitHub's contribution greens and palm and sea greens.
      colors: {
        canvas: '#F6F1E7', // page background (warm sand)
        sky: '#EAF6F8', // top of the hero gradient
        ink: '#1F2A24', // body text and the logo
        muted: '#5C6B63', // secondary text
        accent: '#0E6B4F', // links and focus rings (deep palm green)
        level: {
          0: '#E8E3D6', // empty contribution cell
          1: '#A7E3C4',
          2: '#4CC38A',
          3: '#1F9A6B',
          4: '#0E6B4F', // also the name blocks at rest
        },
      },
      fontFamily: {
        display: ['"Space Grotesk Variable"', 'system-ui', 'sans-serif'],
        sans: ['"Space Grotesk Variable"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', 'ui-monospace', 'monospace'],
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
