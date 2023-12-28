import { BehaviorSubject } from 'rxjs'

export type Images = {
  flat: string[]
  home: string[]
  surface: string[]
}
export const imagesSubject = new BehaviorSubject<Images | null>(null)
