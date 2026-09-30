import { test, expect } from '@playwright/test'

const routes = [
  { name: 'home', path: '/' },
  { name: 'vigil', path: '/projects/vigil' },
  { name: 'clausify', path: '/projects/clausify' },
]

const widths = [1280, 1728, 2560]

for (const route of routes) {
  for (const width of widths) {
    test(`${route.name} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.goto(route.path, { waitUntil: 'networkidle' })
      await page.evaluate(() => document.fonts.ready)

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
