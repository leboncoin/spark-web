import { makeVariants } from '@spark-ui/internal-utils'
import { cva, VariantProps } from 'class-variance-authority'

export const iconStyles = cva(['fill-current shrink-0'], {
  variants: {
    /**
     * Color scheme of the icon.
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
      current: ['text-current'],
      main: ['text-main'],
      support: ['text-support'],
      accent: ['text-accent'],
      basic: ['text-basic'],
      success: ['text-success'],
      alert: ['text-alert'],
      error: ['text-error'],
      info: ['text-info'],
      neutral: ['text-neutral'],
    }),
    /**
     * Sets the size of the icon.
     */
    size: makeVariants<'size', ['current', 'sm', 'md', 'lg', 'xl']>({
      current: ['u-current-font-size'],
      sm: ['w-sz-16', 'h-sz-16'],
      md: ['w-sz-24', 'h-sz-24'],
      lg: ['w-sz-32', 'h-sz-32'],
      xl: ['w-sz-40', 'h-sz-40'],
    }),
  },
})

export type IconVariantsProps = VariantProps<typeof iconStyles>
