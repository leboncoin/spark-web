import { SegmentedGauge as Root } from './SegmentedGauge'
import { SegmentedGaugeTrack } from './SegmentedGauge'
import { SegmentedGaugeSegment } from './SegmentedGauge'
import { SegmentedGaugeLabel } from './SegmentedGauge'

export const SegmentedGauge: typeof Root & {
  Track: typeof SegmentedGaugeTrack
  Segment: typeof SegmentedGaugeSegment
  Label: typeof SegmentedGaugeLabel
} = Object.assign(Root, {
  Track: SegmentedGaugeTrack,
  Segment: SegmentedGaugeSegment,
  Label: SegmentedGaugeLabel,
})

SegmentedGauge.displayName = 'SegmentedGauge'
SegmentedGaugeTrack.displayName = 'SegmentedGauge.Track'
SegmentedGaugeSegment.displayName = 'SegmentedGauge.Segment'
SegmentedGaugeLabel.displayName = 'SegmentedGauge.Label'

export { type SegmentedGaugeProps } from './SegmentedGauge'
export { type SegmentedGaugeTrackProps } from './SegmentedGauge'
export { type SegmentedGaugeSegmentProps } from './SegmentedGauge'
export { type SegmentedGaugeLabelProps } from './SegmentedGauge'
