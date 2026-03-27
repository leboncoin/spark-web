import { cx } from 'class-variance-authority'
import { Ref, useId } from 'react'

import { Label } from '../label'
import { useRadioGroup } from './RadioGroupContext'
import { RadioInput, RadioInputProps } from './RadioInput'

export type RadioProps = RadioInputProps & {
  ref?: Ref<HTMLElement>
}

const ID_PREFIX = ':radio'

export const Radio = ({
  className,
  children,
  disabled: disabledProp,
  ref,
  ...others
}: RadioProps) => {
  const innerLabelId = `${ID_PREFIX}-label-${useId()}`

  const { intent, disabled, reverse } = useRadioGroup()

  const isDisabled = disabledProp || disabled

  const radioLabel = children && (
    <Label
      data-spark-component="radio-label"
      id={innerLabelId}
      className={cx(
        'grow',
        isDisabled ? 'text-neutral/dim-2 cursor-not-allowed' : 'cursor-pointer'
      )}
    >
      {children}
    </Label>
  )

  const radioInput = (
    <RadioInput
      ref={ref}
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

  return <span className={cx('gap-md text-body-1 flex items-start', className)}>{content}</span>
}

Radio.displayName = 'RadioGroup.Radio'
