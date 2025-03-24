import { cva, VariantProps } from 'class-variance-authority'

export const skeletonItemStyles = cva(['bg-neutral/dim-4', 'min-h-lg min-w-lg'], {
  variants: {
    shape: {
      line: ['w-full [&:last-child:not(:first-child)]:w-5/6', 'rounded-lg'],
      rectangle: ['rounded-sm'],
      circle: ['flex-none', 'rounded-full'],
    },
  },
  defaultVariants: {
    shape: 'rectangle',
  },
})

export const skeletonLineStyles = cva(['flex flex-col', 'w-full'], {
  variants: {
    gap: {
      sm: 'gap-sm',
      md: 'gap-md',
      lg: 'gap-lg',
      xl: 'gap-xl',
      '2xl': 'gap-2xl',
      '3xl': 'gap-3xl',
    },
  },
  defaultVariants: {
    gap: 'md',
  },
})

export type SkeletonItemStyleProps = ExcludeNull<VariantProps<typeof skeletonItemStyles>>
