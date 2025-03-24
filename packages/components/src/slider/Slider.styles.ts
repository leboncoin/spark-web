import { cva } from 'class-variance-authority'

export const rootStyles = cva([
  'flex relative h-sz-24 items-center',
  'touch-none select-none',
  'data-disabled:cursor-not-allowed data-disabled:opacity-dim-3',
])
