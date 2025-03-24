import { cva, type VariantProps } from 'class-variance-authority'

export const trackVariants = cva(['relative grow h-sz-4 bg-on-background/dim-4'], {
  variants: {
    shape: {
      rounded: 'rounded-sm',
      square: 'rounded-0',
    },
  },
  defaultVariants: {
    shape: 'square',
  },
})

export const rangeVariants = cva(['absolute h-full'], {
  variants: {
    intent: {
      main: ['bg-main'],
      support: ['bg-support'],
      accent: ['bg-accent'],
      basic: ['bg-basic'],
      info: ['bg-info'],
      neutral: ['bg-neutral'],
      success: ['bg-success'],
      alert: ['bg-alert'],
      error: ['bg-error'],
    },
    shape: {
      rounded: 'rounded-sm',
      square: 'rounded-0',
    },
  },
  defaultVariants: {
    intent: 'basic',
    shape: 'square',
  },
})

export type SliderRangeVariantsProps = VariantProps<typeof rangeVariants>
