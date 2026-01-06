import { NumberField } from '@base-ui-components/react/number-field'
import { type ComponentProps, type ReactNode, type Ref } from 'react'

import type { IconButtonProps } from '../icon-button'
import type { InputProps } from '../input'

export interface StepperProps
  extends Omit<ComponentProps<typeof NumberField.Root>, 'render' | 'min' | 'max' | 'format'> {
  children: ReactNode
  /**
   * Assign a specific state to the group, either `error`, `alert` or `success`. The outline styles will be updated.
   */
  state?: 'error' | 'alert' | 'success'
  /**
   * The minimum value of the input element.
   */
  minValue?: number
  /**
   * The maximum value of the input element.
   */
  maxValue?: number
  /**
   * Options to format the input value.
   */
  formatOptions?: Intl.NumberFormatOptions
}

/**
 * As we're using React Spectrum library to build this component, we also want
 * to build our typing uppon theirs.
 * Still, we have to adapt it to avoid exposing useless props.
 */
export type StepperButtonProps = Omit<
  IconButtonProps,
  'shape' | 'size' | 'disabled' | 'asChild' | 'isLoading' | 'loadingLabel'
> & {
  disabled?: boolean
  ref?: Ref<HTMLButtonElement>
}

export type StepperInputProps = Omit<InputProps, 'asChild'> & {
  ref?: Ref<HTMLInputElement>
}
