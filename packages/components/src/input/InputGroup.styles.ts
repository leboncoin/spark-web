import { cva, VariantProps } from 'class-variance-authority'

export const inputGroupStyles = cva(['relative inline-flex w-full'], {
  variants: {
    /**
     * When `true`, prevents the user from interacting.
     */
    disabled: {
      true: [
        'cursor-not-allowed',
        'relative',
        'after:absolute',
        'after:top-0',
        'after:h-full',
        'after:w-full',
        'after:border-sm after:border-outline',
        'after:rounded-lg',
      ],
      false: 'after:hidden',
    },
    /**
     * Sets the component as interactive or not.
     */
    readOnly: {
      true: [
        'relative',
        'after:absolute',
        'after:top-0',
        'after:h-full',
        'after:w-full',
        'after:border-sm after:border-outline',
        'after:rounded-lg',
      ],
      false: 'after:hidden',
    },
  },
})

export type InputGroupStylesProps = VariantProps<typeof inputGroupStyles>
