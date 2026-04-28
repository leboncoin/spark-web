import { makeVariants, tw } from '@spark-ui/internal-utils'
import { cva, VariantProps } from 'class-variance-authority'

export const contentStyles = cva(
  [
    'relative h-full default:rounded-lg w-full focus-visible:u-outline',
    'default:transition-colors default:duration-200 ease-linear',
  ],
  {
    variants: {
      inset: {
        false: ['default:p-lg'],
      },
      design: {
        outlined: [
          'default:bg-surface group-focus:bg-surface-hovered group-not-disabled:group-data-[interactive=true]:group-hover:bg-surface-hovered',
        ],
        tinted: [],
      },
      hasType: {
        true: ['rounded-t-0'],
      },
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
      /**
       * Outlined styles are handled by the Card component (parent)
       */
      // TINTED
      {
        intent: 'main',
        design: 'tinted',
        class: tw([
          'bg-main-container text-on-main-container group-focus:bg-main-container-hovered',
          'group-not-disabled:group-data-[interactive=true]:group-hover:bg-main-container-hovered',
        ]),
      },
      {
        intent: 'support',
        design: 'tinted',
        class: tw([
          'bg-support-container text-on-support-container group-focus:bg-support-container-hovered',
          'group-not-disabled:group-data-[interactive=true]:group-hover:bg-support-container-hovered',
        ]),
      },
      {
        intent: 'accent',
        design: 'tinted',
        class: tw([
          'bg-accent-container text-on-accent-container group-focus:bg-accent-container-hovered',
          'group-not-disabled:group-data-[interactive=true]:group-hover:bg-accent-container-hovered',
        ]),
      },
      {
        intent: 'success',
        design: 'tinted',
        class: tw([
          'bg-success-container text-on-success-container group-focus:bg-success-container-hovered',
          'group-not-disabled:group-data-[interactive=true]:group-hover:bg-success-container-hovered',
        ]),
      },
      {
        intent: 'alert',
        design: 'tinted',
        class: tw([
          'bg-alert-container text-on-alert-container group-focus:bg-alert-container-hovered',
          'group-not-disabled:group-data-[interactive=true]:group-hover:bg-alert-container-hovered',
        ]),
      },
      {
        intent: 'danger',
        design: 'tinted',
        class: tw([
          'bg-error-container text-on-error-container group-focus:bg-error-container-hovered',
          'group-not-disabled:group-data-[interactive=true]:group-hover:bg-error-container-hovered',
        ]),
      },
      {
        intent: 'info',
        design: 'tinted',
        class: tw([
          'bg-info-container text-on-info-container group-focus:bg-info-container-hovered',
          'group-not-disabled:group-data-[interactive=true]:group-hover:bg-info-container-hovered',
        ]),
      },
      {
        intent: 'neutral',
        design: 'tinted',
        class: tw([
          'bg-neutral-container text-on-neutral-container group-focus:bg-neutral-container-hovered',
          'group-not-disabled:group-data-[interactive=true]:group-hover:bg-neutral-container-hovered',
        ]),
      },
      {
        intent: 'surface',
        design: 'tinted',
        class: tw([
          'bg-surface text-on-surface group-focus:bg-surface-hovered',
          'group-not-disabled:group-data-[interactive=true]:group-hover:bg-surface-hovered',
        ]),
      },
    ],
    defaultVariants: {
      design: 'outlined',
      intent: 'surface',
      inset: false,
      hasType: true,
    },
  }
)

export type ContentStylesProps = VariantProps<typeof contentStyles>
