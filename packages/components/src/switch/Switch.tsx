import { cx } from 'class-variance-authority'
import { useId } from 'react'

import { useFormFieldControl } from '../form-field'
import { SwitchInput, SwitchInputProps } from './SwitchInput'
import { SwitchLabel } from './SwitchLabel'

export type SwitchProps = SwitchInputProps

const ID_PREFIX = ':switch'

export const Switch = ({
  size = 'md',
  children,
  className,
  id,
  disabled,
  reverse = false,
  ref,
  ...rest
}: SwitchProps) => {
  const field = useFormFieldControl()

  const labelID = `${ID_PREFIX}-label-${useId()}`
  const innerID = `${ID_PREFIX}-input-${useId()}`
  const fieldID = field.id || id || innerID

  const switchLabel = children && (
    <SwitchLabel disabled={disabled} htmlFor={fieldID} id={labelID}>
      {children}
    </SwitchLabel>
  )

  const switchInput = (
    <SwitchInput
      ref={ref}
      size={size}
      id={fieldID}
      disabled={disabled}
      /**
       * If the switch doesn't have any direct label (children) then we should try to
       * get an eventual alternative label from FormField.
       * On last resort, we shouldn't forget to define an aria-label attribute.
       */
      aria-labelledby={children ? labelID : field.labelId}
      {...rest}
    />
  )

  const content = reverse ? (
    <>
      {switchLabel}
      {switchInput}
    </>
  ) : (
    <>
      {switchInput}
      {switchLabel}
    </>
  )

  return (
    <div
      data-spark-component="switch"
      className={cx('gap-md text-body-1 flex items-center', className)}
    >
      {content}
    </div>
  )
}

Switch.displayName = 'Switch'
