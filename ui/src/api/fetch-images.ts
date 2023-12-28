import { PROXY_ENDPOINT } from '../env'
import { imagesSubject } from '../subjects/images.ts'

export async function fetchImages() {
  const home = await fetch(PROXY_ENDPOINT + '?prefix=home')
    .then((res) => res.json())
    .then((keys: string[]) => keys.reverse())
  const flat = await fetch(PROXY_ENDPOINT + '?prefix=flat')
    .then((res) => res.json())
    .then((keys: string[]) => keys.reverse())
  const surface = await fetch(PROXY_ENDPOINT + '?prefix=surface')
    .then((res) => res.json())
    .then((keys: string[]) => keys.reverse())

  imagesSubject.next({
    flat,
    home,
    surface,
  })
}
