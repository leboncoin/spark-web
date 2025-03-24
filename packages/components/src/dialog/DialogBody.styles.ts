import { cva, VariantProps } from 'class-variance-authority'

export const dialogBodyStyles = cva(
  ['grow', 'overflow-y-auto', 'outline-hidden', 'focus-visible:u-outline'],
  {
    variants: {
      inset: {
        true: '',
        false: 'px-xl py-lg',
      },
    },
  }
)

export type DialogBodyStylesProps = VariantProps<typeof dialogBodyStyles>
