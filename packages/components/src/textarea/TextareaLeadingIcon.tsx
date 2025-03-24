import { InputGroup, InputLeadingIconProps } from '../input'

export type TextareaLeadingIconProps = InputLeadingIconProps

export const TextareaLeadingIcon = (props: InputLeadingIconProps) => {
  return <InputGroup.LeadingIcon data-spark-component="textarea-group-leading-icon" {...props} />
}

TextareaLeadingIcon.id = InputGroup.LeadingIcon.id
TextareaLeadingIcon.displayName = 'TextareaGroup.LeadingIcon'
