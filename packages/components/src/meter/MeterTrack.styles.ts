import { cva, VariantProps } from 'class-variance-authority'

export const meterTrackStyles = cva([
  'relative col-span-2',
  'h-sz-8 w-full',
  'transform-gpu overflow-hidden',
  'bg-on-background/dim-4',
])

export type MeterTrackStylesProps = VariantProps<typeof meterTrackStyles>

export const meterIndicatorStyles = cva(
  ['size-full', 'ease-standard transition-[width] duration-700', 'motion-reduce:transition-none'],
  {
    variants: {
      /**
       * Color scheme of the meter component.
       */
      intent: {
        main: ['bg-main'],
        support: ['bg-support'],
        success: ['bg-success'],
        alert: ['bg-alert'],
        danger: ['bg-error'],
        info: ['bg-info'],
      },
      /**
       * Shape of the meter component.
       */
      shape: {
        square: [],
        rounded: ['rounded-sm'],
      },
    },
  }
)

export type MeterIndicatorStylesProps = VariantProps<typeof meterIndicatorStyles>
