import { TextareaClearButton } from './TextareaClearButton'
import { TextareaGroup as Root } from './TextareaGroup'
import { TextareaLeadingIcon } from './TextareaLeadingIcon'
import { TextareaTrailingIcon } from './TextareaTrailingIcon'

export * from './Textarea'

export const TextareaGroup: typeof Root & {
  LeadingIcon: typeof TextareaLeadingIcon
  TrailingIcon: typeof TextareaTrailingIcon
  ClearButton: typeof TextareaClearButton
} = Object.assign(Root, {
  LeadingIcon: TextareaLeadingIcon,
  TrailingIcon: TextareaTrailingIcon,
  ClearButton: TextareaClearButton,
})

TextareaGroup.displayName = 'TextareaGroup'
TextareaLeadingIcon.displayName = 'TextareaGroup.LeadingIcon'
TextareaTrailingIcon.displayName = 'TextareaGroup.TrailingIcon'
TextareaClearButton.displayName = 'TextareaGroup.ClearButton'

export { type TextareaGroupProps } from './TextareaGroup'
export { type TextareaLeadingIconProps } from './TextareaLeadingIcon'
export { type TextareaTrailingIconProps } from './TextareaTrailingIcon'
export { type TextareaClearButtonProps } from './TextareaClearButton'
