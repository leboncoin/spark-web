import { cx } from 'class-variance-authority'
import { Ref, useId } from 'react'

import { useRadioGroup } from './RadioGroupContext'
import { RadioInput, RadioInputProps } from './RadioInput'
import { RadioLabel } from './RadioLabel'

export type RadioProps = RadioInputProps & {
  ref?: Ref<HTMLButtonElement>
}

const ID_PREFIX = ':radio'

export const Radio = ({
  className,
  children,
  id,
  disabled: disabledProp,
  ref,
  ...others
}: RadioProps) => {
  const innerId = `${ID_PREFIX}-input-${useId()}`
  const innerLabelId = `${ID_PREFIX}-label-${useId()}`

  const { intent, disabled, reverse } = useRadioGroup()

  const radioLabel = children && (
    <RadioLabel disabled={disabledProp || disabled} htmlFor={id || innerId} id={innerLabelId}>
      {children}
    </RadioLabel>
  )

  const radioInput = (
    <RadioInput
      ref={ref}
      id={id || innerId}
      intent={intent}
      aria-labelledby={children ? innerLabelId : undefined}
      {...others}
      disabled={disabledProp}
    />
  )

  const content = reverse ? (
    <>
      {radioLabel}
      {radioInput}
    </>
  ) : (
    <>
      {radioInput}
      {radioLabel}
    </>
  )

  return <div className={cx('gap-md text-body-1 flex items-start', className)}>{content}</div>
}

Radio.displayName = 'RadioGroup.Radio'
