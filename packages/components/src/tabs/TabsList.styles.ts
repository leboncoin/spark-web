import { cva } from 'class-variance-authority'

export const wrapperStyles = cva(['relative flex'])

export const listStyles = cva([
  'flex w-full',
  'data-[orientation=horizontal]:flex-row',
  'data-[orientation=vertical]:flex-col',
  'overflow-y-hidden u-no-scrollbar data-[orientation=vertical]:overflow-x-hidden',
  'after:flex after:shrink after:grow after:border-outline',
  'data-[orientation=horizontal]:after:border-b-sm',
  'data-[orientation=vertical]:after:border-r-sm',
])

export const navigationArrowStyles = cva([
  'h-auto! flex-none',
  'border-b-sm border-outline',
  'outline-hidden',
  'focus-visible:border-none focus-visible:bg-surface-hovered focus-visible:u-outline-inset!',
])
