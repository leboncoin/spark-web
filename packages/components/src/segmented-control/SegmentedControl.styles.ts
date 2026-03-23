import { cva, VariantProps } from 'class-variance-authority'

export const rootStyles = cva([
  'group inline-grid grid-flow-col auto-cols-fr',
  'relative items-stretch min-w-max',
  'rounded-xl',
  'bg-surface border-md border-outline',
  'p-sz-2',
])

export const itemStyles = cva(
  [
    'relative z-raised min-h-sz-44 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-inset',
    'flex flex-none items-center justify-center flex-col',
    'px-lg',
    'rounded-xl',
    'cursor-pointer select-none',
    'font-medium',
    'transition-colors duration-150',
    'outline-none',
    'focus-visible:u-outline',
    'disabled:cursor-not-allowed disabled:opacity-dim-3',
    'not-disabled:hover:text-on-surface',
    'aria-pressed:text-on-support-container',
    'aria-pressed:font-bold',
  ],
  {
    variants: {
      /**
       * Change the size of the segmented control
       * @default md
       */
      size: {
        sm: ['h-sz-32 min-w-sz-32 text-caption'],
        md: ['h-sz-36 min-w-sz-36 text-body-2'],
        lg: ['h-sz-40 min-w-sz-40 text-body-1'],
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export const indicatorStyles = cva([
  'absolute z-base',
  'rounded-xl',
  'bg-support-container border-md border-support',
  'transition-[left,top,width,height] duration-200 ease-in-out',
  'pointer-events-none',
])

export type SegmentedControlStylesProps = VariantProps<typeof itemStyles>
