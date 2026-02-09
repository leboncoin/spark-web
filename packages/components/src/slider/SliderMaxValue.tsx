import { cx } from 'class-variance-authority'
import { forwardRef, type ReactNode } from 'react'

import { useSliderContext } from './SliderContext'

export interface SliderMaxValueProps {
  className?: string
  children?: (value: number) => ReactNode
}

export const SliderMaxValue = forwardRef<HTMLDivElement, SliderMaxValueProps>(
  ({ className, children }, ref) => {
    const { max = 100 } = useSliderContext()

    const content = children ? children(max) : max

    return (
      <div
        data-spark-component="slider-max-value"
        ref={ref}
        className={cx('text-on-surface/dim-1 text-body-2 col-start-2 text-right', className)}
      >
        {content}
      </div>
    )
  }
)

SliderMaxValue.displayName = 'Slider.MaxValue'
