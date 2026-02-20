import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cx } from 'class-variance-authority'
import { Ref, useId } from 'react'

import { FormFieldContextState, ID_PREFIX } from './FormFieldContext'
import { FormFieldProvider } from './FormFieldProvider'

export interface FormFieldProps
  extends useRender.ComponentProps<'div'>,
    Pick<FormFieldContextState, 'name' | 'state' | 'isRequired'> {
  /**
   * When `true`, prevents the user from interacting.
   */
  disabled?: boolean
  /**
   * Sets the component as interactive or not.
   */
  readOnly?: boolean
  ref?: Ref<HTMLDivElement>
}

export const FormField = ({
  className,
  disabled = false,
  readOnly = false,
  name,
  state,
  isRequired = false,
  render,
  ref,
  ...others
}: FormFieldProps) => {
  const id = `${ID_PREFIX}-${useId()}`

  const defaultProps: useRender.ElementProps<'div'> & Record<string, unknown> = {
    'data-spark-component': 'form-field',
    className: cx(className, 'gap-md flex flex-col'),
  }

  const element = useRender({
    defaultTagName: 'div',
    render,
    ref,
    props: mergeProps<'div'>(defaultProps, others),
  })

  return (
    <FormFieldProvider
      id={id}
      name={name}
      isRequired={isRequired}
      disabled={disabled}
      readOnly={readOnly}
      state={state}
    >
      {element}
    </FormFieldProvider>
  )
}

FormField.displayName = 'FormField'
