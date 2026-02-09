import { Slider as Root, type SliderProps } from './Slider'
import { SliderControl as Control, type SliderControlProps } from './SliderControl'
import { SliderIndicator as Indicator, type SliderIndicatorProps } from './SliderIndicator'
import { SliderLabel as Label, type SliderLabelProps } from './SliderLabel'
import { SliderMaxValue as MaxValue, type SliderMaxValueProps } from './SliderMaxValue'
import { SliderMinValue as MinValue, type SliderMinValueProps } from './SliderMinValue'
import { SliderThumb as Thumb, type SliderThumbProps } from './SliderThumb'
import { SliderTrack as Track, type SliderTrackProps } from './SliderTrack'
import { SliderValue as Value, type SliderValueProps } from './SliderValue'

export const Slider: typeof Root & {
  Control: typeof Control
  Indicator: typeof Indicator
  Label: typeof Label
  MaxValue: typeof MaxValue
  MinValue: typeof MinValue
  Thumb: typeof Thumb
  Track: typeof Track
  Value: typeof Value
} = Object.assign(Root, {
  Control,
  Indicator,
  Label,
  MaxValue,
  MinValue,
  Thumb,
  Track,
  Value,
})

Slider.displayName = 'Slider'
Control.displayName = 'Slider.Control'
Indicator.displayName = 'Slider.Indicator'
Label.displayName = 'Slider.Label'
MaxValue.displayName = 'Slider.MaxValue'
MinValue.displayName = 'Slider.MinValue'
Thumb.displayName = 'Slider.Thumb'
Track.displayName = 'Slider.Track'
Value.displayName = 'Slider.Value'

export type {
  SliderProps,
  SliderControlProps,
  SliderIndicatorProps,
  SliderLabelProps,
  SliderMaxValueProps,
  SliderMinValueProps,
  SliderThumbProps,
  SliderTrackProps,
  SliderValueProps,
}
