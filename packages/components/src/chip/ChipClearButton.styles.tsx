import { tw } from '@spark-ui/internal-utils'
import { cva, type VariantProps } from 'class-variance-authority'

export const chipClearButtonWrapperStyles = cva(
  ['ml-md flex h-full items-center justify-center focus-visible:outline-hidden'],
  {
    variants: {
      disabled: {
        false: ['cursor-pointer'],
        true: ['cursor-not-allowed'],
      },
      isBordered: {
        false: ['pr-md'],
        true: ['pr-[7px]'],
      },
      design: {
        outlined: [],
        tinted: [],
        dashed: [],
      },
    },
    compoundVariants: [
      {
        design: 'outlined',
        disabled: false,
        class: tw(['hover:opacity-dim-1']),
      },
      {
        design: 'outlined',
        disabled: true,
        class: tw(['opacity-dim-3']),
      },
      {
        design: 'tinted',
        disabled: false,
        class: tw(['hover:opacity-dim-1']),
      },
      {
        design: 'tinted',
        disabled: true,
        class: tw(['opacity-dim-3']),
      },
      {
        design: 'dashed',
        disabled: false,
        class: tw(['hover:opacity-dim-1']),
      },
      {
        design: 'dashed',
        disabled: true,
        class: tw(['opacity-dim-3']),
      },
    ],
  }
)

export const chipClearButtonStyles = cva(
  ['rounded-full p-sz-2 [font-size:var(--spacing-sz-8)] border-sm', 'focus-visible:u-outline'],
  {
    variants: {
      disabled: {
        true: ['cursor-not-allowed'],
        false: ['cursor-pointer'],
      },
    },
  }
)

export type ChipClearButtonStylesProps = VariantProps<typeof chipClearButtonWrapperStyles>
