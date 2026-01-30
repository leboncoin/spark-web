import { Meter as Root } from './Meter'
import { MeterLabel } from './MeterLabel'
import { MeterTrack } from './MeterTrack'
import { MeterValue } from './MeterValue'

export const Meter: typeof Root & {
  Label: typeof MeterLabel
  Track: typeof MeterTrack
  Value: typeof MeterValue
} = Object.assign(Root, {
  Label: MeterLabel,
  Track: MeterTrack,
  Value: MeterValue,
})

Meter.displayName = 'Meter'
MeterLabel.displayName = 'Meter.Label'
MeterTrack.displayName = 'Meter.Track'
MeterValue.displayName = 'Meter.Value'

export { type MeterProps } from './Meter'
export { type MeterLabelProps } from './MeterLabel'
export { type MeterTrackProps } from './MeterTrack'
export { type MeterValueProps } from './MeterValue'
