import { makeVariants, tw } from '@spark-ui/internal-utils'
import { cva, VariantProps } from 'class-variance-authority'

export const cardStyles = cva(
  [
    'group relative bg-clip-padding default:rounded-lg focus-visible:u-outline',
    'disabled:opacity-dim-3 disabled:cursor-not-allowed',
  ],
  {
    variants: {
      design: {
        outlined: ['border-sm'],
        tinted: [],
      },
      /**
       * Color scheme of the button.
       */
      intent: makeVariants<
        'intent',
        ['main', 'support', 'accent', 'success', 'alert', 'danger', 'info', 'neutral', 'surface']
      >({
        main: [],
        support: [],
        accent: [],
        success: [],
        alert: [],
        danger: [],
        info: [],
        neutral: [],
        surface: [],
      }),
    },
    compoundVariants: [
      // OUTLINED
      { intent: 'main', design: 'outlined', class: tw(['border-main']) },
      { intent: 'support', design: 'outlined', class: tw(['border-support']) },
      { intent: 'accent', design: 'outlined', class: tw(['border-accent']) },
      { intent: 'success', design: 'outlined', class: tw(['border-success']) },
      { intent: 'alert', design: 'outlined', class: tw(['border-alert']) },
      { intent: 'danger', design: 'outlined', class: tw(['border-error']) },
      { intent: 'info', design: 'outlined', class: tw(['border-info']) },
      { intent: 'neutral', design: 'outlined', class: tw(['border-neutral']) },
      { intent: 'surface', design: 'outlined', class: tw(['border-outline']) },
    ],
    defaultVariants: {
      design: 'outlined',
      intent: 'surface',
    },
  }
)

export type CardStylesProps = VariantProps<typeof cardStyles>
