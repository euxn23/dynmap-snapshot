import { style } from '@vanilla-extract/css'

export const imageBox = style({
  position: 'relative',
})

export const imageContent = style({
  height: '100%',
  width: '100%',
})

export const imageBoxButton = style({
  position: 'absolute',
  top: '16px',
  right: '16px',
})

export const imageBoxTime = style({
  position: 'absolute',
  bottom: '8px',
  left: '50%',
  transform: 'translateX(-50%)',
  color: 'white',
  fontWeight: 'bold',
})
