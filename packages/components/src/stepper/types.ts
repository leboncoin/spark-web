import type { NumberField } from '@base-ui/react/number-field'
import type { ComponentProps, Ref, RefObject } from 'react'

import type { IconButtonProps } from '../icon-button'
import type { InputGroupProps, InputProps } from '../input'

export type StepperButtonProps = Omit<
  IconButtonProps,
  'shape' | 'size' | 'disabled' | 'asChild' | 'isLoading' | 'loadingLabel'
> & {
  disabled?: boolean
  ref?: Ref<HTMLButtonElement>
}

export interface UseStepperArgs extends Omit<
  ComponentProps<typeof NumberField.Root>,
  | 'render'
  | 'children'
  | 'onValueChange'
  | 'onValueCommitted'
  | 'allowWheelScrub'
  | 'allowOutOfRange'
  | 'snapOnStep'
  | 'smallStep'
  | 'largeStep'
  | 'inputRef'
  | 'form'
  | 'min'
  | 'max'
  | 'format'
> {
  inputRef: RefObject<HTMLInputElement | null>
  /**
   * The minimum allowed value.
   */
  minValue?: number
  /**
   * The maximum allowed value.
   */
  maxValue?: number
  /**
   * Formatting options for number display.
   */
  formatOptions?: Intl.NumberFormatOptions
  /**
   * Callback fired when the value changes.
   * The value is null when the input is cleared.
   */
  onValueChange?: (value: number | null) => void
  /**
   * The [BCP47](https://www.ietf.org/rfc/bcp/bcp47.txt) language code for the locale.
   * @default 'fr'
   */
  locale?: string
}

export interface UseStepperReturn {
  groupProps: ComponentProps<typeof NumberField.Group>
  inputProps: ComponentProps<typeof NumberField.Input>
  incrementButtonProps: ComponentProps<typeof NumberField.Increment>
  decrementButtonProps: ComponentProps<typeof NumberField.Decrement>
}

export type StepperProps = Omit<
  Omit<UseStepperArgs, 'inputRef'> & Omit<InputGroupProps, 'onClear'>,
  'id' | 'name'
> & {
  ref?: Ref<HTMLDivElement>
  /**
   * The name of the stepper. Submitted with its owning form as part of a name/value pair.
   * If wrapped with a FormField with a name, will be inherited from it.
   */
  name?: string
}

export type StepperInputProps = Omit<InputProps, 'asChild'> & {
  ref?: Ref<HTMLInputElement>
}
