import { Progress as Root } from './Progress'
import { ProgressBar } from './ProgressBar'
import { ProgressIndicator } from './ProgressIndicator'
import { ProgressLabel } from './ProgressLabel'

export const Progress: typeof Root & {
  Label: typeof ProgressLabel
  Bar: typeof ProgressBar
  Indicator: typeof ProgressIndicator
} = Object.assign(Root, {
  Label: ProgressLabel,
  Bar: ProgressBar,
  Indicator: ProgressIndicator,
})

Progress.displayName = 'Progress'
ProgressBar.displayName = 'Progress.Bar'
ProgressIndicator.displayName = 'Progress.Indicator'
ProgressLabel.displayName = 'Progress.Label'

export { type ProgressProps } from './Progress'
export { type ProgressBarProps } from './ProgressBar'
export { type ProgressLabelProps } from './ProgressLabel'
export { type ProgressIndicatorProps } from './ProgressIndicator'
