import { cva } from 'class-variance-authority'

export const contentStyles = cva(['w-full p-lg', 'focus-visible:u-outline-inset'], {
  variants: {
    forceMount: {
      true: 'data-[state=inactive]:hidden',
      false: '',
    },
  },
})
