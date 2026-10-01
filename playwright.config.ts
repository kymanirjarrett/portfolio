import { defineConfig, devices } from '@playwright/test'

// Two suites: visual snapshots of key routes at three desktop widths (uploaded
// by CI so reviewers can compare layouts across pull requests), and navigation
// checks that run with motion on.
export default defineConfig({
  testDir: './e2e',
  outputDir: './test-results',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: 'http://localhost:4173',
    // Reduced motion gives settled, deterministic frames: static gradient,
    // no scroll-scrubbed offsets, no autoplay.
    reducedMotion: 'reduce',
  },
  // The navigation suite runs the live WebGL scenes, and a browser that has done
  // so can fail large full-page captures afterwards. `npm run test:e2e` runs each
  // project in its own process so the snapshot suite never shares a browser.
  projects: [
    {
      name: 'snapshots',
      testMatch: 'screenshots.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'navigation',
      testMatch: 'navigation.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run preview -- --port 4173 --strictPort',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
  },
})
