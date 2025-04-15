import { ComponentPropsWithoutRef, Ref } from 'react'

import { InputGroup } from '../input'

export interface TextareaClearButtonProps extends ComponentPropsWithoutRef<'button'> {
  'aria-label': string
  ref?: Ref<HTMLButtonElement>
}

export const TextareaClearButton = (props: TextareaClearButtonProps) => {
  return (
    <InputGroup.ClearButton inline data-spark-component="textarea-group-trailing-icon" {...props} />
  )
}

TextareaClearButton.id = InputGroup.ClearButton.id
TextareaClearButton.displayName = 'TextareaGroup.ClearButton'
