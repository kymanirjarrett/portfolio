import { defineConfig, devices } from '@playwright/test'

// Visual snapshots of key routes at three desktop widths. CI uploads them as an
// artifact so reviewers can compare layouts across pull requests.
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
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm run preview -- --port 4173 --strictPort',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
  },
})
