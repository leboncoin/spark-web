import { cx } from 'class-variance-authority'
import { ComponentPropsWithoutRef, Ref, useId } from 'react'

import { Slot } from '../slot'
import { FormFieldContextState, ID_PREFIX } from './FormFieldContext'
import { FormFieldProvider } from './FormFieldProvider'

export interface FormFieldProps
  extends ComponentPropsWithoutRef<'div'>,
    Pick<FormFieldContextState, 'name' | 'state' | 'isRequired'> {
  /**
   * Change the component to the HTML tag or custom component of the only child. This will merge the original component props with the props of the supplied element/component and change the underlying DOM node.
   */
  asChild?: boolean
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
  asChild = false,
  ref,
  ...others
}: FormFieldProps) => {
  const id = `${ID_PREFIX}-${useId()}`
  const Component = asChild ? Slot : 'div'

  return (
    <FormFieldProvider
      id={id}
      name={name}
      isRequired={isRequired}
      disabled={disabled}
      readOnly={readOnly}
      state={state}
    >
      <Component
        ref={ref}
        data-spark-component="form-field"
        className={cx(className, 'gap-sm flex flex-col')}
        {...others}
      />
    </FormFieldProvider>
  )
}

FormField.displayName = 'FormField'
