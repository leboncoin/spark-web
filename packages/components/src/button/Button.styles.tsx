import { makeVariants } from '@spark-ui/internal-utils'
import { cva, VariantProps } from 'class-variance-authority'

import {
  contrastVariants,
  filledVariants,
  ghostVariants,
  outlinedVariants,
  tintedVariants,
} from './variants'

export const buttonStyles = cva(
  [
    'u-shadow-border-transition',
    'box-border inline-flex items-center justify-center gap-md whitespace-nowrap',
    'default:px-lg',
    'text-body-1 font-bold',
    'focus-visible:u-outline',
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
      design: makeVariants<'design', ['filled', 'outlined', 'tinted', 'ghost', 'contrast']>({
        filled: ['data-[with-gradient=true]:hover:u-filled-gradient-hovered'],
        outlined: ['bg-transparent', 'border-sm', 'border-current'],
        tinted: ['data-[with-gradient=true]:hover:u-tinted-gradient-hovered'],
        ghost: ['default:-mx-md px-md hover:bg-main/dim-5'],
        contrast: [],
      }),
      underline: {
        true: ['underline'],
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
      /**
       * Size of the button.
       */
      size: makeVariants<'size', ['sm', 'md', 'lg']>({
        sm: ['min-w-sz-32', 'h-sz-32'],
        md: ['min-w-sz-44', 'h-sz-44'],
        lg: ['min-w-sz-56', 'h-sz-56'],
      }),
      /**
       * Shape of the button.
       */
      shape: makeVariants<'shape', ['rounded', 'square', 'pill']>({
        rounded: ['rounded-lg'],
        square: ['rounded-0'],
        pill: ['rounded-full'],
      }),
      /**
       * Disable the button, preventing user interaction and adding opacity.
       */
      disabled: {
        true: ['cursor-not-allowed', 'opacity-dim-3'],
        false: ['cursor-pointer'],
      },
      /**
       * Whether the button should have a gradient background.
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
      ...ghostVariants,
      ...contrastVariants,
    ],
    defaultVariants: {
      design: 'filled',
      intent: 'main',
      size: 'md',
      shape: 'rounded',
      withGradient: false,
    },
  }
)

export type ButtonStylesProps = VariantProps<typeof buttonStyles>
