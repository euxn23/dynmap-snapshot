import { Browser } from '@cloudflare/puppeteer'

export async function snapshot(browser: Browser, url: string): Promise<Buffer> {
  const page = await browser.newPage()
  await page.setViewport({ width: 3840, height: 2160 })

  await page.goto(url, { waitUntil: 'networkidle0' })
  const screenshot = (await page.screenshot()) as Buffer

  return screenshot
}

async function main() {}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
