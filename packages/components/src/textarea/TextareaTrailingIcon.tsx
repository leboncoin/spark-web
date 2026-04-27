import { InputGroup, InputTrailingIconProps } from '../input'

export type TextareaTrailingIconProps = InputTrailingIconProps

/** An icon displayed after the textarea text. Renders a <div> element. */
export const TextareaTrailingIcon = (props: InputTrailingIconProps) => {
  return <InputGroup.TrailingIcon data-spark-component="textarea-group-trailing-icon" {...props} />
}

TextareaTrailingIcon.id = InputGroup.TrailingIcon.id
TextareaTrailingIcon.displayName = 'TextareaGroup.TrailingIcon'
