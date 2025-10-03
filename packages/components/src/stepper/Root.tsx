import { NumberField } from '@base-ui-components/react/number-field'
import { useFormFieldControl } from '@spark-ui/components/form-field'
import { cx } from 'class-variance-authority'

import { StepperProps } from './types'
import { useRenderSlot } from './useRenderSlot'

export const Root = ({
  children,
  allowWheelScrub = true,
  state: stateProp,
  minValue,
  maxValue,
  formatOptions,
  step: stepProp,
  className,
  ...props
}: StepperProps) => {
  const render = useRenderSlot(true, 'div')

  const field = useFormFieldControl()
  const state = field.state ?? stateProp

  /**
   * By default, a percent format will increment in steps of 1 (100% on each increment)
   */
  const step = stepProp == null && formatOptions?.style === 'percent' ? 0.01 : stepProp

  return (
    <NumberField.Root
      data-spark-component="stepper"
      allowWheelScrub={allowWheelScrub}
      render={render}
      min={minValue}
      max={maxValue}
      format={formatOptions}
      step={step}
      {...(field.id && { id: field.id })}
      {...props}
    >
      <NumberField.Group
        className={cx('group relative inline-flex w-full', className)}
        data-field-state={state}
      >
        {children}
      </NumberField.Group>
    </NumberField.Root>
  )
}

Root.displayName = 'Stepper'
