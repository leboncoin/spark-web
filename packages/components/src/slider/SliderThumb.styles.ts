import { cva, VariantProps } from 'class-variance-authority'

export const thumbVariants = cva(
  [
    'relative block size-sz-24 rounded-full cursor-pointer',
    'outline-hidden',
    'has-focus-visible:ring-2 has-focus-visible:ring-offset-2 has-focus-visible:ring-focus',
    'data-disabled:hover:ring-0 data-disabled:cursor-not-allowed data-disabled:before:hidden',
    // visual thumb
    'after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2',
    'after:size-sz-24 after:rounded-full',
    // hover effect
    'before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2',
    'before:size-sz-24 before:rounded-full before:border-solid before:border-sm before:transition-all before:duration-75',
    'hover:before:size-sz-32 data-dragging:before:size-sz-32',
  ],
  {
    variants: {
      intent: {
        main: ['after:bg-main', 'before:bg-main-container before:border-main'],
        support: ['after:bg-support', 'before:bg-support-container before:border-support'],
        accent: ['after:bg-accent', 'before:bg-accent-container before:border-accent'],
        basic: ['after:bg-basic', 'before:bg-basic-container before:border-basic'],
        info: ['after:bg-info', 'before:bg-info-container before:border-info'],
        neutral: ['after:bg-neutral', 'before:bg-neutral-container before:border-neutral'],
        success: ['after:bg-success', 'before:bg-success-container before:border-success'],
        alert: ['after:bg-alert', 'before:bg-alert-container before:border-alert'],
        error: ['after:bg-error', 'before:bg-error-container before:border-error'],
      },
    },
    defaultVariants: {
      intent: 'basic',
    },
  }
)

export type SliderThumbVariantsProps = VariantProps<typeof thumbVariants>
