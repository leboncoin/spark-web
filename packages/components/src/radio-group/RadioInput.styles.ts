import { makeVariants } from '@spark-ui/internal-utils'
import { cva, VariantProps } from 'class-variance-authority'

export const radioInputVariants = cva(
  [
    'flex shrink-0 items-center justify-center',
    'rounded-full',
    'border-md',
    'outline-hidden',
    'hover:ring-4',
    'focus-visible:u-outline',
    'data-disabled:cursor-not-allowed data-disabled:border-outline/dim-2 data-disabled:hover:ring-transparent',
    'u-shadow-border-transition',
    'size-sz-24',
  ],
  {
    variants: {
      /**
       * Color scheme of the radio input.
       */
      intent: makeVariants<
        'intent',
        ['main', 'support', 'accent', 'success', 'alert', 'error', 'info', 'neutral']
      >({
        main: ['border-outline', 'data-checked:border-main', 'hover:ring-main-container'],
        support: ['border-outline', 'data-checked:border-support', 'hover:ring-support-container'],
        accent: ['border-outline', 'data-checked:border-accent', 'hover:ring-accent-container'],
        neutral: ['border-outline', 'data-checked:border-neutral', 'hover:ring-neutral-container'],
        info: ['border-info', 'data-checked:border-info', 'hover:ring-info-container'],
        success: ['border-success', 'data-checked:border-success', 'hover:ring-success-container'],
        alert: ['border-alert', 'data-checked:border-alert', 'hover:ring-alert-container'],
        error: ['border-error', 'data-checked:border-error', 'hover:ring-error-container'],
      }),
    },
    defaultVariants: {
      intent: 'support',
    },
  }
)

export type RadioInputVariantsProps = VariantProps<typeof radioInputVariants>
