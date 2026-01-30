import { cva, VariantProps } from 'class-variance-authority'

export const circularMeterStyles = cva(['focus-visible:u-outline gap-md flex items-center'], {
  variants: {
    orientation: {
      vertical: ['default:flex-col'],
      horizontal: ['default:flex-row'],
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
})

export type CircularMeterStylesProps = VariantProps<typeof circularMeterStyles>
