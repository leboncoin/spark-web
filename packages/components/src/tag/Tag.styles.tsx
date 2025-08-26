import { makeVariants } from '@spark-ui/internal-utils'
import { cva, VariantProps } from 'class-variance-authority'

import { filledVariants, outlinedVariants, tintedVariants } from './variants'

export const tagStyles = cva(
  [
    'box-border inline-flex items-center justify-center gap-sm whitespace-nowrap',
    'text-caption font-bold',
    'px-md',
  ],
  {
    variants: {
      /**
       * Main style of the tag.
       * - `filled`: Tag will be plain.
       * - `outlined`: Tag will have a surface background with an colored outline/text.
       * - `tinted`: Tag will be filled but using a lighter color scheme.
       */
      design: makeVariants<'design', ['filled', 'outlined', 'tinted']>({
        filled: [],
        outlined: ['border-sm', 'border-current'],
        tinted: [],
      }),
      size: makeVariants<'size', ['md', 'lg']>({
        md: ['h-sz-20'],
        lg: ['h-sz-24'],
      }),
      shape: makeVariants<'shape', ['square', 'rounded', 'pill']>({
        square: [],
        rounded: ['rounded-md'],
        pill: ['rounded-full'],
      }),
      /**
       * Color scheme of the tag.
       */
      intent: makeVariants<
        'intent',
        [
          'main',
          'support',
          'accent',
          'basic',
          'success',
          'alert',
          'info',
          'neutral',
          'danger',
          'surface',
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
      }),
      /**
       * Whether the tag should have a gradient background.
       */
      withGradient: {
        true: [],
        false: [],
      },
    },
    compoundVariants: [
      ...filledVariants,
      ...outlinedVariants,
      ...tintedVariants,
      // FILLED with gradient
      {
        intent: 'main',
        design: 'filled',
        withGradient: true,
        class: ['data-[with-gradient=true]:u-filled-gradient-main'],
      },
      {
        intent: 'support',
        design: 'filled',
        withGradient: true,
        class: ['data-[with-gradient=true]:u-filled-gradient-support'],
      },
      {
        intent: 'accent',
        design: 'filled',
        withGradient: true,
        class: ['data-[with-gradient=true]:u-filled-gradient-accent'],
      },
      {
        intent: 'basic',
        design: 'filled',
        withGradient: true,
        class: ['data-[with-gradient=true]:u-filled-gradient-basic'],
      },
      {
        intent: 'success',
        design: 'filled',
        withGradient: true,
        class: ['data-[with-gradient=true]:u-filled-gradient-success'],
      },
      {
        intent: 'alert',
        design: 'filled',
        withGradient: true,
        class: ['data-[with-gradient=true]:u-filled-gradient-alert'],
      },
      {
        intent: 'danger',
        design: 'filled',
        withGradient: true,
        class: ['data-[with-gradient=true]:u-filled-gradient-error'],
      },
      {
        intent: 'info',
        design: 'filled',
        withGradient: true,
        class: ['data-[with-gradient=true]:u-filled-gradient-info'],
      },
      {
        intent: 'neutral',
        design: 'filled',
        withGradient: true,
        class: ['data-[with-gradient=true]:u-filled-gradient-neutral'],
      },
      {
        intent: 'surface',
        design: 'filled',
        withGradient: true,
        class: ['data-[with-gradient=true]:u-filled-gradient-surface'],
      },
      // TINTED with gradient
      {
        intent: 'main',
        design: 'tinted',
        withGradient: true,
        class: ['data-[with-gradient=true]:u-tinted-gradient-main-container'],
      },
      {
        intent: 'support',
        design: 'tinted',
        withGradient: true,
        class: ['data-[with-gradient=true]:u-tinted-gradient-support-container'],
      },
      {
        intent: 'accent',
        design: 'tinted',
        withGradient: true,
        class: ['data-[with-gradient=true]:u-tinted-gradient-accent-container'],
      },
      {
        intent: 'basic',
        design: 'tinted',
        withGradient: true,
        class: ['data-[with-gradient=true]:u-tinted-gradient-basic-container'],
      },
      {
        intent: 'success',
        design: 'tinted',
        withGradient: true,
        class: ['data-[with-gradient=true]:u-tinted-gradient-success-container'],
      },
      {
        intent: 'alert',
        design: 'tinted',
        withGradient: true,
        class: ['data-[with-gradient=true]:u-tinted-gradient-alert-container'],
      },
      {
        intent: 'danger',
        design: 'tinted',
        withGradient: true,
        class: ['data-[with-gradient=true]:u-tinted-gradient-error-container'],
      },
      {
        intent: 'info',
        design: 'tinted',
        withGradient: true,
        class: ['data-[with-gradient=true]:u-tinted-gradient-info-container'],
      },
      {
        intent: 'neutral',
        design: 'tinted',
        withGradient: true,
        class: ['data-[with-gradient=true]:u-tinted-gradient-neutral-container'],
      },
    ],
    defaultVariants: {
      design: 'filled',
      intent: 'basic',
      size: 'md',
      shape: 'pill',
      withGradient: false,
    },
  }
)

export type TagStylesProps = VariantProps<typeof tagStyles>
