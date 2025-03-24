import { Slider as Root, type SliderProps } from './Slider'
import { SliderThumb as Thumb, type SliderThumbProps } from './SliderThumb'
import { SliderTrack as Track, type SliderTrackProps } from './SliderTrack'

export const Slider: typeof Root & {
  Thumb: typeof Thumb
  Track: typeof Track
} = Object.assign(Root, {
  Thumb,
  Track,
})

Slider.displayName = 'Slider'
Thumb.displayName = 'Slider.Thumb'
Track.displayName = 'Slider.Track'

export type { SliderProps, SliderThumbProps, SliderTrackProps }
