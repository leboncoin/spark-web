import { makeVariants } from '@spark-ui/internal-utils'
import { cva, VariantProps } from 'class-variance-authority'

import { filledVariants, highlightedVariants, outlinedVariants, tintedVariants } from './variants'

export const cardStyles = cva(['default:rounded-lg'], {
  variants: {
    inset: {
      false: ['default:p-lg'],
    },
    /**
     * Main style of the button.
     *
     * - `filled`: Button will be plain.
     *
     * - `outlined`: Button will be transparent with an outline.
     *
     * - `tinted`: Button will be filled but using a lighter color scheme.
     *
     * - `ghost`: Button will look like a link. No borders, plain text.
     *
     */
    design: {
      filled: [],
      outlined: ['default:bg-surface default:border-sm'],
      tinted: [],
      highlighted: [
        'default:bg-surface rounded-t-[16px_8px]',
        'relative before:absolute before:top-0 before:left-0 before:right-0 before:h-md',
        'before:rounded-t-lg before:h-sz-16 before:translate-y-[-8px] before:z-hide',
        'before:bg-surface before:bg-gradient-to-r',
        'mt-sz-8', // Compense le décalage du pseudo-élément
      ],
    },
    /**
     * Color scheme of the button.
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
    ...filledVariants,
    ...outlinedVariants,
    ...tintedVariants,
    ...highlightedVariants,
  ],
  defaultVariants: {
    design: 'filled',
    intent: 'surface',
    inset: false,
  },
})

export type CardStylesProps = VariantProps<typeof cardStyles>
