import { test, expect } from '@playwright/test'

// Captures for reviewers to compare layouts across pull requests (uploaded by CI).
const routes = [
  { name: 'home', path: '/', widths: [1280, 1728, 375] },
  { name: 'about', path: '/about', widths: [1280, 1728, 375] },
  { name: 'vigil', path: '/projects/vigil', widths: [1280, 1728, 2560] },
  { name: 'clausify', path: '/projects/clausify', widths: [1280, 1728, 2560] },
]

for (const route of routes) {
  for (const width of route.widths) {
    test(`${route.name} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: width < 768 ? 812 : 900 })
      await page.goto(route.path, { waitUntil: 'networkidle' })
      await page.evaluate(() => document.fonts.ready)
      // Let the lazy 3D scene mount and draw its first frame.
      if (route.path === '/') await page.waitForTimeout(1000)

      // Full width means no horizontal page scroll at any size.
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth
      )
      expect(overflow).toBe(0)

      await page.screenshot({
        path: `screenshots/${route.name}-${width}.png`,
        fullPage: true,
      })
    })
  }
}
