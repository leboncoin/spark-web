import { cva, VariantProps } from 'class-variance-authority'

export const progressBarStyles = cva(
  ['relative', 'h-sz-4 w-full', 'transform-gpu overflow-hidden', 'bg-on-background/dim-4'],
  {
    variants: {
      shape: {
        square: [],
        rounded: ['rounded-sm'],
      },
    },
  }
)

export type ProgressBarStylesProps = VariantProps<typeof progressBarStyles>
