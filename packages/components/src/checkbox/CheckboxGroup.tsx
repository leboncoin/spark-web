import { useFormFieldControl } from '@spark-ui/components/form-field'
import { useCombinedState } from '@spark-ui/hooks/use-combined-state'
import { ComponentPropsWithoutRef, Ref, useEffect, useMemo, useRef } from 'react'

import { checkboxGroupStyles, CheckboxGroupStylesProps } from './CheckboxGroup.styles'
import { CheckboxGroupContext, CheckboxGroupContextState } from './CheckboxGroupContext'

export interface CheckboxGroupProps
  extends
    Omit<ComponentPropsWithoutRef<'div'>, 'value' | 'defaultValue' | 'onChange'>,
    CheckboxGroupStylesProps,
    Pick<CheckboxGroupContextState, 'intent' | 'name' | 'value' | 'reverse'> {
  /**
   * The initial value of the checkbox group
   */
  defaultValue?: string[]
  /**
   * The callback fired when any children Checkbox is checked or unchecked
   */
  onCheckedChange?: (value: string[]) => void
  ref?: Ref<HTMLDivElement>
}

/**
 * A group component that allows users to select one or more checkboxes from a list of choices,
 * managing their state collectively with support for controlled and uncontrolled modes.
 */
export const CheckboxGroup = ({
  name: nameProp,
  value: valueProp,
  defaultValue,
  className,
  intent,
  orientation = 'vertical',
  onCheckedChange: onCheckedChangeProp,
  reverse = false,
  children,
  ref,
  ...others
}: CheckboxGroupProps) => {
  const [value, setValue] = useCombinedState(valueProp, defaultValue)
  const field = useFormFieldControl()
  const onCheckedChangeRef = useRef(onCheckedChangeProp)

  const { id, labelId, description, state, isInvalid, isRequired } = field
  const name = nameProp ?? field.name

  const current = useMemo(() => {
    const handleCheckedChange = (checked: boolean, changed: string) => {
      const values = value || []
      const modified = checked
        ? [...values, changed]
        : values.filter((val: string) => val !== changed)

      setValue(modified)

      if (onCheckedChangeRef.current) {
        onCheckedChangeRef.current(modified)
      }
    }

    return {
      id,
      name,
      value,
      intent,
      state,
      isInvalid,
      description,
      isRequired,
      reverse,
      onCheckedChange: handleCheckedChange,
    }
  }, [id, name, value, intent, state, isInvalid, description, isRequired, setValue, reverse])

  useEffect(() => {
    onCheckedChangeRef.current = onCheckedChangeProp
  }, [onCheckedChangeProp])

  return (
    <CheckboxGroupContext.Provider value={current}>
      <div
        ref={ref}
        className={checkboxGroupStyles({ className, orientation })}
        role="group"
        aria-labelledby={labelId}
        aria-describedby={description}
        {...others}
      >
        {children}
      </div>
    </CheckboxGroupContext.Provider>
  )
}

CheckboxGroup.displayName = 'CheckboxGroup'
