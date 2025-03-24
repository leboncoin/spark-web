import { cva, type VariantProps } from 'class-variance-authority'

export const snackbarRegionVariant = cva(
  [
    'fixed inset-x-lg z-toast group',
    'outline-hidden pointer-events-none',
    'grid grid-rows-1 grid-cols-1 gap-lg',
  ],
  {
    variants: {
      /**
       * Set snackbar item position
       * @default 'bottom'
       */
      position: {
        top: 'top-lg justify-items-center',
        'top-right': 'top-lg justify-items-end',
        'top-left': 'top-lg justify-items-start',
        bottom: 'bottom-lg justify-items-center',
        'bottom-right': 'bottom-lg justify-items-end',
        'bottom-left': 'bottom-lg justify-items-start',
      },
    },
    defaultVariants: {
      position: 'bottom',
    },
  }
)

export type SnackbarRegionVariantProps = VariantProps<typeof snackbarRegionVariant>
