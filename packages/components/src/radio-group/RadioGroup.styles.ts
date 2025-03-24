import { cva, VariantProps } from 'class-variance-authority'

export const radioGroupStyles = cva(['flex'], {
  variants: {
    orientation: {
      vertical: ['flex-col', 'gap-lg'],
      horizontal: ['flex-row', 'gap-xl'],
    },
  },
})

export type RadioGroupVariantsProps = VariantProps<typeof radioGroupStyles>
