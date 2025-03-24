import { cva, VariantProps } from 'class-variance-authority'

export const checkboxGroupStyles = cva(['flex'], {
  variants: {
    /**
     * Prop to set the orientation of the checkbox group which could be `vertical` or `horizontal`.
     */
    orientation: {
      vertical: ['flex-col', 'gap-lg'],
      horizontal: ['gap-xl'],
    },
  },
})

export type CheckboxGroupStylesProps = VariantProps<typeof checkboxGroupStyles>
