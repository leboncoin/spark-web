import { Chip as Root } from './Chip'
import { ChipClearButton } from './ChipClearButton'
import { ChipContent } from './ChipContent'
import { ChipLeadingIcon } from './ChipLeadingIcon'
import { ChipTrailingIcon } from './ChipTrailingIcon'

export const Chip: typeof Root & {
  Content: typeof ChipContent
  LeadingIcon: typeof ChipLeadingIcon
  TrailingIcon: typeof ChipTrailingIcon
  ClearButton: typeof ChipClearButton
} = Object.assign(Root, {
  Content: ChipContent,
  LeadingIcon: ChipLeadingIcon,
  TrailingIcon: ChipTrailingIcon,
  ClearButton: ChipClearButton,
})

Chip.displayName = 'Chip'
Chip.ClearButton.displayName = 'Chip.ClearButton'
Chip.Content.displayName = 'Chip.Content'
Chip.LeadingIcon.displayName = 'Chip.LeadingIcon'
Chip.TrailingIcon.displayName = 'Chip.TrailingIcon'

export { type ChipClearButtonProps } from './ChipClearButton'
export { type ChipContentProps } from './ChipContent'
export { type ChipLeadingIconProps } from './ChipLeadingIcon'
export { type ChipTrailingIconProps } from './ChipTrailingIcon'
