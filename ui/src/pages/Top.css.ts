import { style } from '@vanilla-extract/css'
import { slate, slateDark } from '@radix-ui/colors'

export const header = style({
  padding: '8px 0',
  backgroundColor: slateDark.slate1,
})

export const title = style({
  fontSize: '32px',
  color: slate.slate6,
  fontFamily: 'DotGothic16',
})
export const top = style({
  width: '75%',
})

export const footer = style({
  padding: '16px 0 4px',
  backgroundColor: slateDark.slate1,
  color: slate.slate6,
})

export const sub = style({
  width: '50%',
})
