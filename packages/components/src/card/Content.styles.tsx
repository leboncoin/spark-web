import { makeVariants, tw } from '@spark-ui/internal-utils'
import { cva, VariantProps } from 'class-variance-authority'

export const contentStyles = cva(
  [
    'relative h-full default:rounded-lg w-full focus-visible:u-outline',
    'default:transition-colors default:duration-200 ease-linear',
    'before:content-[""] before:absolute before:inset-0 before:rounded-lg before:bg-surface before:z-hide',
  ],
  {
    variants: {
      inset: {
        false: ['default:p-lg'],
      },
      design: {
        filled: [
          'group-not-disabled:group-data-[interactive=true]:group-hover:data-[with-gradient=true]:u-filled-gradient-hovered',
        ],
        outlined: [
          'default:bg-surface group-focus:bg-surface-hovered group-not-disabled:group-data-[interactive=true]:group-hover:bg-surface-hovered',
        ],
        tinted: [
          'group-not-disabled:group-data-[interactive=true]:group-hover:data-[with-gradient=true]:u-tinted-gradient-hovered',
        ],
      },
      hasBackdrop: {
        true: ['rounded-t-[16px_8px] before:rounded-t-[16px_8px]'],
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
      {
        intent: 'main',
        design: 'filled',
        class: tw([
          'data-[with-gradient=true]:u-filled-gradient-main',
          'bg-main text-on-main group-focus:bg-main-hovered',
          'group-not-disabled:group-data-[interactive=true]:group-hover:bg-main-hovered',
        ]),
      },
      {
        intent: 'support',
        design: 'filled',
        class: tw([
          'data-[with-gradient=true]:u-filled-gradient-support',
          'bg-support',
          'text-on-support group-focus:bg-support-hovered',
          'group-not-disabled:group-data-[interactive=true]:group-hover:bg-support-hovered',
        ]),
      },
      {
        intent: 'accent',
        design: 'filled',
        class: tw([
          'data-[with-gradient=true]:u-filled-gradient-accent',
          'bg-accent',
          'text-on-accent group-focus:bg-accent-hovered',
          'group-not-disabled:group-data-[interactive=true]:group-hover:bg-accent-hovered',
        ]),
      },
      {
        intent: 'basic',
        design: 'filled',
        class: tw([
          'data-[with-gradient=true]:u-filled-gradient-basic',
          'bg-basic',
          'text-on-basic group-focus:bg-basic-hovered',
          'group-not-disabled:group-data-[interactive=true]:group-hover:bg-basic-hovered',
        ]),
      },
      {
        intent: 'success',
        design: 'filled',
        class: tw([
          'data-[with-gradient=true]:u-filled-gradient-success',
          'bg-success',
          'text-on-success group-focus:bg-success-hovered',
          'group-not-disabled:group-data-[interactive=true]:group-hover:bg-success-hovered',
        ]),
      },
      {
        intent: 'alert',
        design: 'filled',
        class: tw([
          'data-[with-gradient=true]:u-filled-gradient-alert',
          'bg-alert',
          'text-on-alert group-focus:bg-alert-hovered',
          'group-not-disabled:group-data-[interactive=true]:group-hover:bg-alert-hovered',
        ]),
      },
      {
        intent: 'danger',
        design: 'filled',
        class: tw([
          'data-[with-gradient=true]:u-filled-gradient-error',
          'bg-error',
          'text-on-error group-focus:bg-error-hovered',
          'group-not-disabled:group-data-[interactive=true]:group-hover:bg-error-hovered',
        ]),
      },
      {
        intent: 'info',
        design: 'filled',
        class: tw([
          'data-[with-gradient=true]:u-filled-gradient-info',
          'bg-info',
          'text-on-error group-focus:bg-info-hovered',
          'group-not-disabled:group-data-[interactive=true]:group-hover:bg-info-hovered',
        ]),
      },
      {
        intent: 'neutral',
        design: 'filled',
        class: tw([
          'data-[with-gradient=true]:u-filled-gradient-neutral',
          'bg-neutral',
          'text-on-neutral group-focus:bg-neutral-hovered',
          'group-not-disabled:group-data-[interactive=true]:group-hover:bg-neutral-hovered',
        ]),
      },
      {
        intent: 'surface',
        design: 'filled',
        class: tw([
          'data-[with-gradient=true]:u-filled-gradient-surface',
          'bg-surface',
          'text-on-surface group-focus:bg-surface-hovered',
          'group-not-disabled:group-data-[interactive=true]:group-hover:bg-surface-hovered',
        ]),
      },
      // OUTLINED
      /**
       * Outlined styles are handled by the Card component (parent)
       */
      // TINTED
      {
        intent: 'main',
        design: 'tinted',
        class: tw([
          'data-[with-gradient=true]:u-tinted-gradient-main-container',
          'bg-main-container',
          'text-on-main-container group-focus:bg-main-container-hovered',
          'group-not-disabled:group-data-[interactive=true]:group-hover:bg-main-container-hovered',
          'group-not-disabled:group-data-[interactive=true]:group-hover:data-[with-gradient=true]:bg-surface-inverse',
        ]),
      },
      {
        intent: 'support',
        design: 'tinted',
        class: tw([
          'data-[with-gradient=true]:u-tinted-gradient-support-container',
          'bg-support-container',
          'text-on-support-container group-focus:bg-support-container-hovered',
          'group-not-disabled:group-data-[interactive=true]:group-hover:bg-support-container-hovered',
        ]),
      },
      {
        intent: 'accent',
        design: 'tinted',
        class: tw([
          'data-[with-gradient=true]:u-tinted-gradient-accent-container',
          'bg-accent-container',
          'text-on-accent-container group-focus:bg-accent-container-hovered',
          'group-not-disabled:group-data-[interactive=true]:group-hover:bg-accent-container-hovered',
        ]),
      },
      {
        intent: 'basic',
        design: 'tinted',
        class: tw([
          'data-[with-gradient=true]:u-tinted-gradient-basic-container',
          'bg-basic-container',
          'text-on-basic-container group-focus:bg-basic-container-hovered',
          'group-not-disabled:group-data-[interactive=true]:group-hover:bg-basic-container-hovered',
        ]),
      },
      {
        intent: 'success',
        design: 'tinted',
        class: tw([
          'data-[with-gradient=true]:u-tinted-gradient-success-container',
          'bg-success-container',
          'text-on-success-container group-focus:bg-success-container-hovered',
          'group-not-disabled:group-data-[interactive=true]:group-hover:bg-success-container-hovered',
        ]),
      },
      {
        intent: 'alert',
        design: 'tinted',
        class: tw([
          'data-[with-gradient=true]:u-tinted-gradient-alert-container',
          'bg-alert-container',
          'text-on-alert-container group-focus:bg-alert-container-hovered',
          'group-not-disabled:group-data-[interactive=true]:group-hover:bg-alert-container-hovered',
        ]),
      },
      {
        intent: 'danger',
        design: 'tinted',
        class: tw([
          'data-[with-gradient=true]:u-tinted-gradient-error-container',
          'bg-error-container',
          'text-on-error-container group-focus:bg-error-container-hovered',
          'group-not-disabled:group-data-[interactive=true]:group-hover:bg-error-container-hovered',
        ]),
      },
      {
        intent: 'info',
        design: 'tinted',
        class: tw([
          'data-[with-gradient=true]:u-tinted-gradient-info-container',
          'bg-info-container',
          'text-on-info-container group-focus:bg-info-container-hovered',
          'group-not-disabled:group-data-[interactive=true]:group-hover:bg-info-container-hovered',
        ]),
      },
      {
        intent: 'neutral',
        design: 'tinted',
        class: tw([
          'data-[with-gradient=true]:u-tinted-gradient-neutral-container',
          'bg-neutral-container',
          'text-on-neutral-container group-focus:bg-neutral-container-hovered',
          'group-not-disabled:group-data-[interactive=true]:group-hover:bg-neutral-container-hovered',
        ]),
      },
      {
        intent: 'surface',
        design: 'tinted',
        class: tw([
          'data-[with-gradient=true]:u-tinted-gradient-surface',
          'bg-surface',
          'text-on-surface group-focus:bg-surface-hovered',
          'group-not-disabled:group-data-[interactive=true]:group-hover:bg-surface-hovered',
        ]),
      },
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
