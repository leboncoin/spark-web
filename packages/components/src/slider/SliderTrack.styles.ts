import { cva, VariantProps } from 'class-variance-authority'

export const trackVariants = cva(['relative grow h-sz-4 bg-on-background/dim-4 rounded-sm'])

export const rangeVariants = cva(
  [
    'absolute h-full rounded-sm',
    // Disable transitions during drag to eliminate latency
    'transition-none',
  ],
  {
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
    },
    defaultVariants: {
      intent: 'basic',
    },
  }
)

export type SliderRangeVariantsProps = VariantProps<typeof rangeVariants>
