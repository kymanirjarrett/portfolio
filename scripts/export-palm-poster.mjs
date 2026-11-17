// Renders the palm tree's resting pose and saves it as public/palm-poster.webp,
// the image used on small screens and when WebGL is unavailable.
//
// Usage: npm run build && npm run preview -- --port 4173
//        node scripts/export-palm-poster.mjs [baseURL]
import { writeFile } from 'node:fs/promises'
import { chromium } from '@playwright/test'

const baseURL = process.argv[2] ?? 'http://localhost:4173'
const out = new URL('../public/palm-poster.webp', import.meta.url)

const browser = await chromium.launch()
// Reduced motion freezes the palm in its resting pose (no sway, no lean).
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1.5,
  reducedMotion: 'reduce',
})
await page.goto(baseURL, { waitUntil: 'networkidle' })
await page.waitForSelector('#palm-view')
// Transparent page, nothing but the canvas, so the image has an alpha channel.
await page.addStyleTag({
  content: `html, body, main { background: transparent !important; }
            header, #main-content > section { visibility: hidden !important; }`,
})
await page.waitForTimeout(1500)

const box = await page.locator('#palm-view').boundingBox()
if (!box) throw new Error('Palm view not found')
const png = await page.screenshot({ clip: box, omitBackground: true })

// Encode to WebP with the browser's own encoder: no image dependency needed.
const webp = await page.evaluate(async (b64) => {
  const img = new Image()
  img.src = `data:image/png;base64,${b64}`
  await img.decode()
  const canvas = document.createElement('canvas')
  canvas.width = img.naturalWidth
  canvas.height = img.naturalHeight
  canvas.getContext('2d').drawImage(img, 0, 0)
  return canvas.toDataURL('image/webp', 0.86).split(',')[1]
}, png.toString('base64'))

await writeFile(out, Buffer.from(webp, 'base64'))
console.log(`Wrote ${out.pathname} (${Math.round((webp.length * 3) / 4 / 1024)} KB)`)
await browser.close()
