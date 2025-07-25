import { makeVariants, tw } from '@spark-ui/internal-utils'
import { cva, VariantProps } from 'class-variance-authority'

export const contentStyles = cva(
  ['relative h-full default:rounded-lg w-full focus-visible:u-outline'],
  {
    variants: {
      inset: {
        false: ['default:p-lg'],
      },
      design: {
        filled: [],
        outlined: ['default:bg-surface'],
        tinted: [],
      },
      hasBackdrop: {
        true: ['rounded-t-[16px_8px] '],
      },
      intent: makeVariants<
        'intent',
        [
          'main',
          'support',
          'accent',
          'basic',
          'success',
          'alert',
          'danger',
          'info',
          'neutral',
          'surface',
          'surfaceInverse',
        ]
      >({
        main: [],
        support: [],
        accent: [],
        basic: [],
        success: [],
        alert: [],
        danger: [],
        info: [],
        neutral: [],
        surface: [],
        surfaceInverse: [],
      }),
    },
    compoundVariants: [
      // FILLED
      { intent: 'main', design: 'filled', class: tw(['bg-main text-on-main ']) },
      { intent: 'support', design: 'filled', class: tw(['bg-support text-on-support']) },
      { intent: 'accent', design: 'filled', class: tw(['bg-accent text-on-accent']) },
      { intent: 'basic', design: 'filled', class: tw(['bg-basic text-on-basic']) },
      { intent: 'success', design: 'filled', class: tw(['bg-success text-on-success']) },
      { intent: 'alert', design: 'filled', class: tw(['bg-alert text-on-alert']) },
      { intent: 'danger', design: 'filled', class: tw(['text-on-error bg-error']) },
      { intent: 'info', design: 'filled', class: tw(['text-on-error bg-info']) },
      { intent: 'neutral', design: 'filled', class: tw(['bg-neutral text-on-neutral']) },
      { intent: 'surface', design: 'filled', class: tw(['bg-surface text-on-surface']) },
      // OUTLINED
      /**
       * Outlined styles are handled by the Card component (parent)
       */
      // TINTED
      { intent: 'main', design: 'tinted', class: tw(['bg-main-container text-on-main-container']) },
      {
        intent: 'support',
        design: 'tinted',
        class: tw(['bg-support-container text-on-support-container']),
      },
      {
        intent: 'accent',
        design: 'tinted',
        class: tw(['bg-accent-container text-on-accent-container']),
      },
      {
        intent: 'basic',
        design: 'tinted',
        class: tw(['bg-basic-container text-on-basic-container']),
      },
      {
        intent: 'success',
        design: 'tinted',
        class: tw(['bg-success-container text-on-success-container']),
      },
      {
        intent: 'alert',
        design: 'tinted',
        class: tw(['bg-alert-container text-on-alert-container']),
      },
      {
        intent: 'danger',
        design: 'tinted',
        class: tw(['bg-error-container text-on-error-container']),
      },
      { intent: 'info', design: 'tinted', class: tw(['bg-info-container text-on-info-container']) },
      {
        intent: 'neutral',
        design: 'tinted',
        class: tw(['bg-neutral-container text-on-neutral-container']),
      },
      { intent: 'surface', design: 'tinted', class: tw(['bg-surface text-on-surface']) },
    ],
    defaultVariants: {
      design: 'filled',
      intent: 'surface',
      inset: false,
      hasBackdrop: true,
    },
  }
)

export type ContentStylesProps = VariantProps<typeof contentStyles>
