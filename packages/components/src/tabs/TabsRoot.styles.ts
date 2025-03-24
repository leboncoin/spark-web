import { cva } from 'class-variance-authority'

export const rootStyles = cva([
  'flex',
  'data-[orientation=horizontal]:flex-col',
  'data-[orientation=vertical]:flex-row',
  'max-w-full',
])
