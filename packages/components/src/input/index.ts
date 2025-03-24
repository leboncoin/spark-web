import { InputClearButton } from './InputClearButton'
import { InputGroup as Root } from './InputGroup'
import { InputLeadingAddon } from './InputLeadingAddon'
import { InputLeadingIcon } from './InputLeadingIcon'
import { InputTrailingAddon } from './InputTrailingAddon'
import { InputTrailingIcon } from './InputTrailingIcon'

export * from './Input'

export const InputGroup: typeof Root & {
  LeadingAddon: typeof InputLeadingAddon
  TrailingAddon: typeof InputTrailingAddon
  LeadingIcon: typeof InputLeadingIcon
  TrailingIcon: typeof InputTrailingIcon
  ClearButton: typeof InputClearButton
} = Object.assign(Root, {
  LeadingAddon: InputLeadingAddon,
  TrailingAddon: InputTrailingAddon,
  LeadingIcon: InputLeadingIcon,
  TrailingIcon: InputTrailingIcon,
  ClearButton: InputClearButton,
})

InputGroup.displayName = 'InputGroup'
InputLeadingAddon.displayName = 'InputGroup.LeadingAddon'
InputTrailingAddon.displayName = 'InputGroup.TrailingAddon'
InputLeadingIcon.displayName = 'InputGroup.LeadingIcon'
InputTrailingIcon.displayName = 'InputGroup.TrailingIcon'
InputClearButton.displayName = 'InputGroup.ClearButton'

export { useInputGroup } from './InputGroupContext'
export { type InputGroupProps } from './InputGroup'
export { type InputLeadingIconProps } from './InputLeadingIcon'
export { type InputTrailingIconProps } from './InputTrailingIcon'
export { type InputLeadingAddonProps } from './InputLeadingAddon'
export { type InputTrailingAddonProps } from './InputTrailingAddon'
export { type InputClearButtonProps } from './InputClearButton'
