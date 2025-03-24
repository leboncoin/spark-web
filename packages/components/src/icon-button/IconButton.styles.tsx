import { makeVariants } from '@spark-ui/internal-utils'
import { cva, VariantProps } from 'class-variance-authority'

// override the Button component's px-lg padding by using a more specific class selector (pl-0 pr-0)
export const iconButtonStyles = cva(['pl-0 pr-0'], {
  variants: {
    /**
     * Sets the size of the icon.
     */
    size: makeVariants<'size', ['sm', 'md', 'lg']>({
      sm: ['text-body-1'],
      md: ['text-body-1'],
      lg: ['text-display-3'],
    }),
  },
})

export type IconButtonStylesProps = VariantProps<typeof iconButtonStyles>
