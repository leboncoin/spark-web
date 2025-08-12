import { InputGroup, InputGroupProps } from '../input'

export type TextareaGroupProps = InputGroupProps

export const TextareaGroup = (props: TextareaGroupProps) => {
  return <InputGroup {...props} />
}

TextareaGroup.displayName = 'TextareaGroup'
