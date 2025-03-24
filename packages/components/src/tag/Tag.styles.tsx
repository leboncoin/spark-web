import { makeVariants } from '@spark-ui/internal-utils'
import { cva, type VariantProps } from 'class-variance-authority'

import { filledVariants, outlinedVariants, tintedVariants } from './variants'

export const tagStyles = cva(
  [
    'box-border inline-flex items-center justify-center gap-sm whitespace-nowrap',
    'text-caption font-bold',
    'h-sz-20 px-md',
    'rounded-full',
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
    },
    compoundVariants: [...filledVariants, ...outlinedVariants, ...tintedVariants],
    defaultVariants: {
      design: 'filled',
      intent: 'basic',
    },
  }
)

export type TagStylesProps = VariantProps<typeof tagStyles>
