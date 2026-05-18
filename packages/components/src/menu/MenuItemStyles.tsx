import { makeVariants } from '@spark-ui/internal-utils'
import { cva, type VariantProps } from 'class-variance-authority'

export const menuItemStyles = cva(
  [
    'gap-md flex w-full cursor-pointer items-center justify-start',
    'text-left text-body-1',
    'transition-colors duration-100',
    'outline-none',
    'focus-visible:u-outline focus-visible:-outline-offset-2',
    'data-disabled:cursor-not-allowed data-disabled:opacity-dim-3',
    'min-h-sz-44',
    'px-lg py-md',
    'data-highlighted:bg-surface-hovered',
    'data-popup-open:bg-surface-hovered',
  ],
  {
    variants: {
      intent: makeVariants<
        'intent',
        ['surface', 'main', 'support', 'accent', 'success', 'alert', 'danger', 'info', 'neutral']
      >({
        surface: ['text-on-surface'],
        main: ['text-on-surface'],
        support: ['text-on-surface'],
        accent: ['text-on-surface'],
        success: ['text-on-surface'],
        alert: ['text-on-surface'],
        danger: ['text-on-surface'],
        info: ['text-on-surface'],
        neutral: ['text-on-surface'],
      }),
    },
    defaultVariants: {
      intent: 'surface',
    },
  }
)

export type MenuItemStylesProps = VariantProps<typeof menuItemStyles>
