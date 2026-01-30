import { cva, VariantProps } from 'class-variance-authority'

export const dialogContentStyles = cva(
  [
    'z-modal flex flex-col bg-surface group transition-all',
    'focus-visible:outline-hidden focus-visible:u-outline',
    '[&:not(:has(footer))]:pb-lg',
    '[&:not(:has(header))]:pt-lg',
    'data-open:animation-duration-400 data-closed:animation-duration-200',
    'data-starting-style:scale-90 data-starting-style:opacity-0',
    'data-ending-style:scale-90 data-ending-style:opacity-0',
    // Nested dialog effect
    'data-nested-dialog-open:after:pointer-events-none',
    'after:bg-transparent',
    'after:transition-all',
    'after:duration-200',
    'data-nested-dialog-open:after:inset-0',
    'data-nested-dialog-open:after:absolute',
    'data-nested-dialog-open:after:rounded-[inherit]',
    'data-nested-dialog-open:after:bg-overlay/dim-3',
  ],
  {
    variants: {
      size: {
        fullscreen: 'fixed size-full top-0 left-0',
        sm: 'max-w-[min(480px,calc(100vw-2rem))] data-nested-dialog-open:scale-90',
        md: 'max-w-[min(672px,calc(100vw-2rem))] data-nested-dialog-open:scale-90',
        lg: 'max-w-[min(864px,calc(100vw-2rem))] data-nested-dialog-open:scale-90',
      },
      isNarrow: {
        true: ['max-w-[calc(100vw-2rem)]'],
        false: [],
      },
    },
    compoundVariants: [
      {
        size: ['sm', 'md', 'lg'],
        class: [
          'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
          'max-h-[80%]',
          'shadow-md rounded-lg',
          'data-open:animate-fade-in',
          'data-closed:animate-fade-out',
        ],
      },
      {
        size: ['sm', 'md', 'lg'],
        isNarrow: false,
        class: ['w-full'],
      },
    ],
    defaultVariants: {
      size: 'md',
      isNarrow: false,
    },
  }
)

export type DialogContentStylesProps = VariantProps<typeof dialogContentStyles>
