import { cx } from 'class-variance-authority'
import { forwardRef, type ReactNode } from 'react'

import { useSliderContext } from './SliderContext'

export interface SliderMinValueProps {
  className?: string
  children?: (value: number) => ReactNode
}

export const SliderMinValue = forwardRef<HTMLDivElement, SliderMinValueProps>(
  ({ className, children }, ref) => {
    const { min = 0 } = useSliderContext()

    const content = children ? children(min) : min

    return (
      <div
        data-spark-component="slider-min-value"
        ref={ref}
        className={cx('text-on-surface/dim-1 text-body-2 col-start-1 text-left', className)}
      >
        {content}
      </div>
    )
  }
)

SliderMinValue.displayName = 'Slider.MinValue'
