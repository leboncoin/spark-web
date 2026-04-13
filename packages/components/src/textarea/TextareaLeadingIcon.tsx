import { InputGroup, InputLeadingIconProps } from '../input'

export type TextareaLeadingIconProps = InputLeadingIconProps

/** An icon displayed before the textarea text. Renders a <div> element. */
export const TextareaLeadingIcon = (props: InputLeadingIconProps) => {
  return <InputGroup.LeadingIcon data-spark-component="textarea-group-leading-icon" {...props} />
}

TextareaLeadingIcon.id = InputGroup.LeadingIcon.id
TextareaLeadingIcon.displayName = 'TextareaGroup.LeadingIcon'
