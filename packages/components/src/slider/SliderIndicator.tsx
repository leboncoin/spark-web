import { Slider as BaseSlider } from '@base-ui/react/slider'
import { ComponentProps } from 'react'

import { useSliderContext } from './SliderContext'
import { rangeVariants } from './SliderTrack.styles'

export type SliderIndicatorProps = Omit<ComponentProps<typeof BaseSlider.Indicator>, 'render'>

export const SliderIndicator = ({ className, ref, ...rest }: SliderIndicatorProps) => {
  const { intent } = useSliderContext()

  return (
    <BaseSlider.Indicator
      data-spark-component="slider-indicator"
      ref={ref}
      className={rangeVariants({ intent, className })}
      {...rest}
    />
  )
}

SliderIndicator.displayName = 'Slider.Indicator'
