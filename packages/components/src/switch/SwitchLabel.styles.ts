import { cva, VariantProps } from 'class-variance-authority'

export const labelStyles = cva('', {
  variants: {
    disabled: {
      true: ['text-neutral/dim-2', 'cursor-not-allowed'],
      false: ['cursor-pointer'],
    },
  },
  defaultVariants: {
    disabled: false,
  },
})

export type LabelStylesProps = VariantProps<typeof labelStyles>
