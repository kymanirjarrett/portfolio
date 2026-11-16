import { test, expect } from '@playwright/test'

const navRoutes = [
  { label: 'About', path: '/about', heading: 'About me' },
  { label: 'Projects', path: '/projects', heading: "Things I've built" },
  { label: 'Experience', path: '/experience', heading: "Where I've worked" },
  { label: 'Leadership', path: '/leadership', heading: 'Outside of code' },
]

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
})

for (const route of navRoutes) {
  test(`${route.label} nav link resolves`, async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    await page
      .getByRole('navigation', { name: 'Main' })
      .getByRole('link', { name: route.label })
      .click()
    await expect(page).toHaveURL(new RegExp(`${route.path}$`))
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(route.heading)
  })
}

test('logo links home', async ({ page }) => {
  await page.goto('/projects', { waitUntil: 'networkidle' })
  await page.getByRole('link', { name: 'Kymani Jarrett, home' }).click()
  await expect(page).toHaveURL(/\/$/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText("Hey, I'm Kymani Jarrett")
})

test('has no resume and no contact nav link', async ({ page }) => {
  for (const path of ['/', '/about', '/projects']) {
    await page.goto(path, { waitUntil: 'networkidle' })
    await expect(page.getByText(/view resume/i)).toHaveCount(0)
    const nav = page.getByRole('navigation', { name: 'Main' })
    await expect(nav.getByRole('link', { name: 'Contact' })).toHaveCount(0)
  }
  const resume = await page.request.get('/resume.pdf')
  expect(resume.headers()['content-type'] ?? '').not.toContain('pdf')
})

test('command menu navigates by keyboard', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  await page.keyboard.press('ControlOrMeta+k')
  const dialog = page.getByRole('dialog', { name: 'Command menu' })
  await expect(dialog).toBeVisible()
  await page.keyboard.type('experience')
  await page.keyboard.press('Enter')
  await expect(dialog).toBeHidden()
  await expect(page).toHaveURL(/\/experience$/)
})
