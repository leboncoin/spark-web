import { CircularMeter as Root } from './CircularMeter'
import { CircularMeterContent } from './CircularMeterContent'
import { CircularMeterLabel } from './CircularMeterLabel'
import { CircularMeterTrack } from './CircularMeterTrack'
import { CircularMeterValue } from './CircularMeterValue'

export const CircularMeter: typeof Root & {
  Content: typeof CircularMeterContent
  Label: typeof CircularMeterLabel
  Track: typeof CircularMeterTrack
  Value: typeof CircularMeterValue
} = Object.assign(Root, {
  Content: CircularMeterContent,
  Label: CircularMeterLabel,
  Track: CircularMeterTrack,
  Value: CircularMeterValue,
})

CircularMeter.displayName = 'CircularMeter'
CircularMeterContent.displayName = 'CircularMeter.Content'
CircularMeterLabel.displayName = 'CircularMeter.Label'
CircularMeterTrack.displayName = 'CircularMeter.Track'
CircularMeterValue.displayName = 'CircularMeter.Value'

export { type CircularMeterProps } from './CircularMeter'
export { type CircularMeterContentProps } from './CircularMeterContent'
export { type CircularMeterLabelProps } from './CircularMeterLabel'
export { type CircularMeterTrackProps } from './CircularMeterTrack'
export { type CircularMeterValueProps } from './CircularMeterValue'
