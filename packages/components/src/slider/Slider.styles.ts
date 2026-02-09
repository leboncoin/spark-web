import { cva } from 'class-variance-authority'

export const rootStyles = cva([
  'grid grid-cols-[1fr_auto] gap-y-sm gap-x-md relative',
  'touch-none select-none',
  'data-disabled:cursor-not-allowed data-disabled:opacity-dim-3',
])
