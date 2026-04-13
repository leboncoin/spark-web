import { Slider as BaseSlider } from '@base-ui/react/slider'
import { ComponentProps } from 'react'

import { trackVariants } from './SliderTrack.styles'

export type SliderTrackProps = Omit<ComponentProps<typeof BaseSlider.Track>, 'render'>

/** The track element of the slider. Renders a <span> element. */
export const SliderTrack = ({ className, ref, ...rest }: SliderTrackProps) => {
  return (
    <BaseSlider.Track
      data-spark-component="slider-track"
      ref={ref}
      className={trackVariants({ className })}
      {...rest}
    />
  )
}

SliderTrack.displayName = 'Slider.Track'
