import { makeVariants } from '@spark-ui/internal-utils'
import { cva, type VariantProps } from 'class-variance-authority'

export const styles = cva(
  [
    'inline-flex h-fit',
    'empty:p-0',
    'text-center font-bold default:border-surface',
    'rounded-full box-content',
  ],
  {
    variants: {
      /**
       * Visual color appearance of the component.
       * @default 'danger'
       */
      intent: makeVariants<
        'intent',
        [
          'main',
          'support',
          'accent',
          'success',
          'alert',
          'danger',
          'info',
          'neutral',
          'surface',
          'basic',
        ]
      >({
        main: ['bg-main text-on-main'],
        support: ['bg-support text-on-support'],
        accent: ['bg-accent text-on-accent'],
        success: ['bg-success text-on-success'],
        alert: ['bg-alert text-on-alert'],
        danger: ['bg-error text-on-error'],
        info: ['bg-info text-on-info'],
        neutral: ['bg-neutral text-on-neutral'],
        surface: ['bg-surface text-on-surface'],
        basic: ['bg-basic text-on-basic'],
      }),
      /**
       * Size of the component.
       * @default 'md'
       */
      size: makeVariants<'size', ['sm', 'md']>({
        sm: ['text-small', 'px-[var(--spacing-sz-6)] py-[var(--spacing-sz-2)]', 'empty:size-sz-8'],
        md: ['text-caption', 'px-md py-sm', 'empty:size-sz-16'],
      }),
      /**
       * Type of the component.
       * @default 'relative'
       */
      type: {
        relative: ['absolute right-0 default:border-md', 'translate-x-1/2 -translate-y-1/2'],
        standalone: ['border-surface'],
      },
    },
    compoundVariants: [
      {
        size: 'sm',
        type: 'standalone',
        className: 'border-md',
      },
      {
        size: 'md',
        type: 'standalone',
        className: 'border-lg',
      },
    ],
    defaultVariants: {
      intent: 'danger',
      size: 'md',
      type: 'relative',
    },
  }
)

export type StylesProps = VariantProps<typeof styles>
