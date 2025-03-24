import { Label as Root } from './Label'
import { LabelRequiredIndicator } from './LabelRequiredIndicator'

export const Label: typeof Root & {
  RequiredIndicator: typeof LabelRequiredIndicator
} = Object.assign(Root, {
  RequiredIndicator: LabelRequiredIndicator,
})

Label.displayName = 'Label'
LabelRequiredIndicator.displayName = 'Label.RequiredIndicator'

export type { LabelProps } from './Label'
export type { LabelRequiredIndicatorProps } from './LabelRequiredIndicator'
