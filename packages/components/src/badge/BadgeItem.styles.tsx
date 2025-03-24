import { makeVariants } from '@spark-ui/internal-utils'
import { cva, type VariantProps } from 'class-variance-authority'

export const styles = cva(
  ['inline-flex h-fit', 'empty:p-0', 'text-center font-bold', 'rounded-full box-content'],
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
        main: ['bg-main', 'text-on-main', 'border-surface'],
        support: ['bg-support', 'text-on-support', 'border-surface'],
        accent: ['bg-accent', 'text-on-accent', 'border-surface'],
        success: ['bg-success', 'text-on-success', 'border-surface'],
        alert: ['bg-alert', 'text-on-alert', 'border-surface'],
        danger: ['bg-error', 'text-on-error', 'border-surface'],
        info: ['bg-info', 'text-on-info', 'border-surface'],
        neutral: ['bg-neutral', 'text-on-neutral', 'border-surface'],
        surface: ['bg-surface', 'text-on-surface', 'border-surface'],
        basic: ['bg-basic', 'text-on-basic', 'border-surface'],
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
        relative: ['absolute right-0 border-md', 'translate-x-1/2 -translate-y-1/2'],
        standalone: [],
      },
    },
    defaultVariants: {
      intent: 'danger',
      size: 'md',
      type: 'relative',
    },
  }
)

export type StylesProps = VariantProps<typeof styles>
