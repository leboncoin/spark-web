import { makeVariants } from '@spark-ui/internal-utils'
import { cva, type VariantProps } from 'class-variance-authority'

import { dashedVariants, outlinedVariants, tintedVariants } from './variants'

export const chipStyles = cva(
  [
    'box-border inline-flex h-sz-32 flex-nowrap items-center justify-center rounded-md text-body-1 font-regular',
    'focus-visible:u-outline',
    'ease-out duration-150',
  ],
  {
    variants: {
      /**
       * Main style of the chip.
       *
       * - `filled`: Chip will be plain.
       *
       * - `outlined`: Chip will be transparent with an outline.
       *
       * - `tinted`: Chip will be filled but using a lighter color scheme.
       *
       * - `dashed`: Chip will be transparent with an outline dashed.
       */
      design: makeVariants<'design', ['outlined', 'tinted', 'dashed']>({
        outlined: ['bg-transparent border-sm border-solid border-current'],
        tinted: [''],
        dashed: [
          'bg-transparent border-sm border-dashed shadow-none focus-visible:border-outline-high',
        ],
      }),
      /**
       * Color scheme of the chip.
       */
      intent: makeVariants<
        'intent',
        [
          'main',
          'support',
          'basic',
          'accent',
          'success',
          'alert',
          'danger',
          'info',
          'neutral',
          'surface',
        ]
      >({
        main: [],
        support: [],
        basic: [],
        accent: [],
        success: [],
        alert: [],
        danger: [],
        info: [],
        neutral: [],
        surface: [],
      }),
      /**
       * Disable the chip, preventing user interaction and adding opacity.
       */
      disabled: {
        true: ['cursor-not-allowed', 'opacity-dim-3'],
      },
      hasClearButton: {
        true: [],
        false: [],
      },
      // 'pl-[calc(var(--spacing-md)-(var(--border-width-sm)))]'
    },
    compoundVariants: [...outlinedVariants, ...tintedVariants, ...dashedVariants],
    defaultVariants: {
      design: 'outlined',
      intent: 'basic',
    },
  }
)

export type ChipStylesProps = VariantProps<typeof chipStyles>
