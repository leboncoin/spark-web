import { cva, VariantProps } from 'class-variance-authority'

export const skeletonStyles = cva([], {
  variants: {
    isAnimated: {
      true: [
        '[mask-image:linear-gradient(90deg,#000_40%,rgba(0,0,0,.3)_60%,#000_100%)]',
        '[mask-size:200%_100%]',
        'animate-standalone-shimmer motion-reduce:animate-none!',
      ],
      false: [],
    },
  },
  defaultVariants: {
    isAnimated: true,
  },
})

export type SkeletonStyleProps = ExcludeNull<VariantProps<typeof skeletonStyles>>
