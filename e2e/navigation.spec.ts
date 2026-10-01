import { test, expect } from '@playwright/test'

// Lenis only smooths scrolling when motion is allowed, and the bug this guards
// against (a stale scroll limit after a route change) only shows up then.
test.use({ reducedMotion: 'no-preference' })

for (const start of ['/', '/projects', '/projects/vigil']) {
  test(`Contact link from ${start} reaches the contact section`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(start, { waitUntil: 'networkidle' })
    await page
      .getByRole('navigation', { name: 'Main' })
      .getByRole('link', { name: 'Contact' })
      .click()

    await expect(page).toHaveURL(/\/$/)
    // The section is near the bottom, so it may end below the nav rather than at
    // the top: require it to be on screen and the page scrolled to its end.
    await expect
      .poll(
        () =>
          page.evaluate(() => {
            // The URL changes before React renders the home page, so the section
            // can briefly be missing: report "not yet" instead of throwing.
            const contact = document.getElementById('contact')
            if (!contact) return false
            const rect = contact.getBoundingClientRect()
            const atBottom =
              Math.abs(window.scrollY - (document.documentElement.scrollHeight - innerHeight)) < 2
            return rect.top < innerHeight / 2 && (rect.top <= 80 || atBottom)
          }),
        { timeout: 5000 }
      )
      .toBe(true)
  })
}
