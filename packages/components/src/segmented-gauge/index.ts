import { SegmentedGauge as Root } from './SegmentedGauge'
import { SegmentedGaugeLabel } from './SegmentedGaugeLabel'
import { SegmentedGaugeSegment } from './SegmentedGaugeSegment'
import { SegmentedGaugeTrack } from './SegmentedGaugeTrack'

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
export { type SegmentedGaugeTrackProps } from './SegmentedGaugeTrack'
export { type SegmentedGaugeSegmentProps } from './SegmentedGaugeSegment'
export { type SegmentedGaugeLabelProps } from './SegmentedGaugeLabel'
