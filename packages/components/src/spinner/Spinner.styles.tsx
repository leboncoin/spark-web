import { makeVariants } from '@spark-ui/internal-utils'
import { cva, VariantProps } from 'class-variance-authority'

const defaultVariants = {
  intent: 'current',
  size: 'current',
  isBackgroundVisible: false,
} as const

export const spinnerStyles = cva(
  ['inline-block', 'border-solid', 'rounded-full', 'border-md', 'animate-spin'],
  {
    variants: {
      /**
       * Use `size` prop to set the size of the spinner. If you want to set the full size for the spinner, don't forget to add a wrapping container with its own size.
       */
      size: {
        current: ['u-current-font-size'],
        sm: ['w-sz-20', 'h-sz-20'],
        md: ['w-sz-28', 'h-sz-28'],
        full: ['w-full', 'h-full'],
      },
      /**
       * Color scheme of the spinner.
       */
      intent: makeVariants<
        'intent',
        [
          'current',
          'main',
          'support',
          'accent',
          'basic',
          'success',
          'alert',
          'error',
          'info',
          'neutral',
        ]
      >({
        current: ['border-current'],
        main: ['border-main'],
        support: ['border-support'],
        accent: ['border-accent'],
        basic: ['border-basic'],
        success: ['border-success'],
        alert: ['border-alert'],
        error: ['border-error'],
        info: ['border-info'],
        neutral: ['border-neutral'],
      }),
      /**
       * Size of the button.
       */
      isBackgroundVisible: {
        true: ['border-b-neutral-container', 'border-l-neutral-container'],
        false: ['border-b-transparent', 'border-l-transparent'],
      },
    },
    defaultVariants,
  }
)

export type SpinnerStylesProps = VariantProps<typeof spinnerStyles>
