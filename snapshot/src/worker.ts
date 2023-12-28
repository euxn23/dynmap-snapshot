import puppeteer, { BrowserWorker } from '@cloudflare/puppeteer'
import { snapshot } from './snapshot'
import { DateTime } from 'luxon'
import * as os from 'os'

export interface Env {
  BROWSER: BrowserWorker
  R2: R2Bucket
}

const baseUrl = 'https://minecraft.youkou.dev?nopanel=true&nogui=true'
const flatUrl = baseUrl + '&zoom=1'
const surfaceUrl = baseUrl + '&mapname=surface&zoom=1'
const homeUrl = baseUrl + '&mapname=surface&x=-931&z=-175&zoom=6'

const worker: ExportedHandler<Env> = {
  async scheduled(_event, env, _ctx) {
    const now = DateTime.now().setZone('Asia/Tokyo')

    const hourlyTimestamp = `${now.get('year')}-${('0' + (now.get('month') + 1)).slice(-2)}-${('0' + now.get('day')).slice(-2)}T${('0' + now.get('hour')).slice(
      -2,
    )}-00-00`

    const browser = await puppeteer.launch(env.BROWSER)
    const flatScreenshot = await snapshot(browser, flatUrl)
    await env.R2.put(`flat/${hourlyTimestamp}.png`, flatScreenshot, { httpMetadata: { contentType: 'image/png' } })
    const surfaceScreenshot = await snapshot(browser, surfaceUrl)
    await env.R2.put(`surface/${hourlyTimestamp}.png`, surfaceScreenshot, { httpMetadata: { contentType: 'image/png' } })
    const homeScreenshot = await snapshot(browser, homeUrl)
    await env.R2.put(`home/${hourlyTimestamp}.png`, homeScreenshot, { httpMetadata: { contentType: 'image/png' } })
    await browser.close()
  },
}

export default worker
