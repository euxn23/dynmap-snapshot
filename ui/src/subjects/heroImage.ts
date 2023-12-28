import { BehaviorSubject } from 'rxjs'
import { Images } from './images.ts'

export const heroImageSubject = new BehaviorSubject<keyof Images>('home')
