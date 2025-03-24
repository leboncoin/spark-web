import { makeVariants } from '@spark-ui/internal-utils'
import { cva, VariantProps } from 'class-variance-authority'

export const radioIndicatorStyles = cva(
  [
    'relative block',
    'size-3/5',
    'after:absolute',
    'after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2',
    'after:h-0',
    'after:w-0',
    'after:block',
    'after:rounded-[50%]',
    "after:content-['']",
    'after:transition-all',
    'data-[state=checked]:after:size-full',
  ],
  {
    variants: {
      intent: makeVariants<
        'intent',
        ['main', 'support', 'accent', 'basic', 'success', 'alert', 'error', 'info', 'neutral']
      >({
        main: ['after:bg-main'],
        support: ['after:bg-support'],
        accent: ['after:bg-accent'],
        basic: ['after:bg-basic'],
        neutral: ['after:bg-neutral'],
        success: ['after:bg-success'],
        alert: ['after:bg-alert'],
        error: ['after:bg-error'],
        info: ['after:bg-info'],
      }),
    },
    defaultVariants: {
      intent: 'basic',
    },
  }
)

export type RadioIndicatorStylesProps = VariantProps<typeof radioIndicatorStyles>
