import { Checkbox } from 'radix-ui'
import { Ref } from 'react'

const CheckboxIndicatorPrimitive = Checkbox.CheckboxIndicator

export type CheckboxIndicatorProps = Checkbox.CheckboxIndicatorProps & {
  ref?: Ref<HTMLSpanElement>
}

export const CheckboxIndicator = (props: CheckboxIndicatorProps) => (
  <CheckboxIndicatorPrimitive className="flex size-full items-center justify-center" {...props} />
)

CheckboxIndicator.displayName = 'CheckboxIndicator'
