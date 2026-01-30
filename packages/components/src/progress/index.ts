import { Progress as Root } from './Progress'
import { ProgressLabel } from './ProgressLabel'
import { ProgressTrack } from './ProgressTrack'
import { ProgressValue } from './ProgressValue'

export const Progress: typeof Root & {
  Label: typeof ProgressLabel
  Track: typeof ProgressTrack
  Value: typeof ProgressValue
} = Object.assign(Root, {
  Label: ProgressLabel,
  Track: ProgressTrack,
  Value: ProgressValue,
})

Progress.displayName = 'Progress'
ProgressLabel.displayName = 'Progress.Label'
ProgressTrack.displayName = 'Progress.Track'
ProgressValue.displayName = 'Progress.Value'

export { type ProgressProps } from './Progress'
export { type ProgressLabelProps } from './ProgressLabel'
export { type ProgressTrackProps } from './ProgressTrack'
export { type ProgressValueProps } from './ProgressValue'
