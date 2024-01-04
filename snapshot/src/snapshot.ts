import { Browser, Viewport } from '@cloudflare/puppeteer'

export async function snapshot(browser: Browser, url: string, viewport: Viewport = { width: 3840, height: 2160 }): Promise<Buffer> {
  const page = await browser.newPage()
  await page.setViewport(viewport)

  await page.goto(url, { waitUntil: 'networkidle0' })
  const screenshot = (await page.screenshot()) as Buffer

  return screenshot
}

async function main() {}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
