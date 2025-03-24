import { ReactNode, useContext } from 'react'

import { FormFieldContext, FormFieldContextState } from './FormFieldContext'

type State = Partial<
  Pick<
    FormFieldContextState,
    | 'id'
    | 'name'
    | 'description'
    | 'labelId'
    | 'disabled'
    | 'readOnly'
    | 'state'
    | 'isInvalid'
    | 'isRequired'
  >
>

export interface FormFieldControlProps {
  children: (state: State) => ReactNode
}

export const useFormFieldControl = () => {
  const { id, name, description, disabled, readOnly, state, labelId, isInvalid, isRequired } =
    useContext(FormFieldContext) || {}

  return {
    id,
    name,
    description,
    disabled,
    readOnly,
    state,
    labelId,
    isInvalid,
    isRequired,
  } as State
}

export const FormFieldControl = ({ children }: FormFieldControlProps) => {
  const props = useFormFieldControl()

  return <>{children(props)}</>
}

FormFieldControl.displayName = 'FormField.Control'
