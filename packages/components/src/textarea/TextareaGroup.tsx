import { InputGroup, InputGroupProps } from '../input'

export type TextareaGroupProps = Omit<InputGroupProps, 'onClear'>

export const TextareaGroup = (props: InputGroupProps) => {
  return <InputGroup {...props} />
}

TextareaGroup.displayName = 'TextareaGroup'
