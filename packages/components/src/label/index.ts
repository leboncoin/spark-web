import { Label as Root } from './Label'
import { LabelRequiredIndicator } from './LabelRequiredIndicator'

/**
 * A text label component that describes a form control and provides accessible name for inputs.
 */
export const Label: typeof Root & {
  RequiredIndicator: typeof LabelRequiredIndicator
} = Object.assign(Root, {
  RequiredIndicator: LabelRequiredIndicator,
})

Label.displayName = 'Label'
LabelRequiredIndicator.displayName = 'Label.RequiredIndicator'

export type { LabelProps } from './Label'
export type { LabelRequiredIndicatorProps } from './LabelRequiredIndicator'
