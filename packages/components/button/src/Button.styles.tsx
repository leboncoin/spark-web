import { makeVariants } from '@spark-ui/internal-utils'
import { cva, type VariantProps } from 'class-variance-authority'

import { filledVariants, ghostVariants, outlinedVariants, tintedVariants } from './variants'

export const buttonStyles = cva(
  [
    'u-shadow-border-transition',
    'box-border inline-flex items-center justify-center gap-md whitespace-nowrap',
    'px-lg',
    'text-body-1 font-bold',
    'ring-inset focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-outline-high',
  ],
  {
    variants: {
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
       * - `contrast`: Button will be surface filled. No borders, plain text.
       *
       */
      design: makeVariants<'design', ['filled', 'outlined', 'tinted', 'ghost']>({
        filled: [],
        outlined: ['bg-transparent', 'ring-1', 'ring-current'],
        tinted: [],
        ghost: [],
      }),

      /**
       * Color scheme of the button.
       */
      intent: makeVariants<
        'intent',
        [
          'primary',
          'secondary',
          'success',
          'alert',
          'danger',
          'info',
          'neutral',
          'surface',
          'contrast'
        ]
      >({
        primary: [],
        secondary: [],
        success: [],
        alert: [],
        danger: [],
        info: [],
        neutral: [],
        surface: [],
        contrast: [],
      }),

      size: makeVariants<'size', ['sm', 'md', 'lg']>({
        sm: ['min-w-sz-32', 'h-sz-32'],
        md: ['min-w-sz-44', 'h-sz-44'],
        lg: ['min-w-sz-56', 'h-sz-56'],
      }),

      shape: makeVariants<'shape', ['rounded', 'square', 'pill']>({
        rounded: ['rounded-lg'],
        square: ['rounded-none'],
        pill: ['rounded-full'],
      }),

      /**
       * Disable the button, preventing user interaction and adding opacity.
       */
      disabled: {
        true: ['cursor-not-allowed', 'opacity-dim-3'],
      },
    },
    compoundVariants: [...filledVariants, ...outlinedVariants, ...tintedVariants, ...ghostVariants],
    defaultVariants: {
      design: 'filled',
      intent: 'contrast',
      size: 'md',
      shape: 'rounded',
    },
  }
)

export type ButtonStylesProps = VariantProps<typeof buttonStyles>
