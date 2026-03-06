import { Slider as BaseSlider } from '@base-ui/react/slider'
import { useFormFieldControl } from '@spark-ui/components/form-field'
import { ComponentProps, type PropsWithChildren, Ref, useCallback, useRef, useState } from 'react'

import { rootStyles } from './Slider.styles'
import { SliderContext } from './SliderContext'
import type { SliderRangeVariantsProps } from './SliderTrack.styles'

export interface SliderProps
  extends Omit<
      ComponentProps<typeof BaseSlider.Root>,
      'render' | 'orientation' | 'onValueChange' | 'onValueCommitted'
    >,
    PropsWithChildren<SliderRangeVariantsProps> {
  /**
   * The value of the slider when initially rendered. Use when you do not need to control the state of the slider.
   */
  defaultValue?: number
  /**
   * The controlled value of the slider. Must be used in conjunction with `onValueChange`.
   */
  value?: number
  /**
   * Event handler called when the value changes.
   */
  onValueChange?: (value: number) => void
  /**
   * Event handler called when the value changes at the end of an interaction. Useful when you only need to capture a final value e.g. to update a backend service.
   */
  onValueCommit?: (value: number) => void
  /**
   * The name of the slider. Submitted with its owning form as part of a name/value pair.
   * If wrapped with a FormField with a name, will be inherited from it.
   */
  name?: string
  /**
   * When `true`, prevents the user from interacting with the slider.
   * @default false
   */
  disabled?: boolean
  /**
   * Sets the slider as interactive or not.
   */
  readOnly?: boolean
  /**
   * The minimum value for the range.
   * @default 0
   */
  min?: number
  /**
   * The maximum value for the range.
   * @default 100
   */
  max?: number
  /**
   * The stepping interval.
   * @default 1
   */
  step?: number
  ref?: Ref<HTMLDivElement>
}

export const Slider = ({
  intent = 'basic',
  children,
  className,
  ref,
  value: valueProp,
  defaultValue: defaultValueProp,
  disabled: disabledProp,
  readOnly: readOnlyProp,
  name: nameProp,
  onValueChange,
  onValueCommit,
  min = 0,
  max = 100,
  ...rest
}: SliderProps) => {
  const field = useFormFieldControl()

  const disabled = field.disabled ?? disabledProp
  const readOnly = field.readOnly ?? readOnlyProp
  const name = field.name ?? nameProp

  const [labelId, setLabelId] = useState<string | undefined>(field.labelId)
  const [valueInThumbCount, setValueInThumbCount] = useState(0)
  const controlRef = useRef<HTMLElement | null>(null)
  const thumbRef = useRef<HTMLElement | null>(null)

  const handleLabelId = useCallback((id: string | undefined) => {
    setLabelId(id)
  }, [])

  const registerValueInThumb = useCallback(() => {
    setValueInThumbCount(c => c + 1)

    return () => setValueInThumbCount(c => c - 1)
  }, [])

  return (
    <SliderContext.Provider
      value={{
        intent,
        min,
        max,
        fieldLabelId: field.labelId || labelId,
        fieldId: field.id,
        onLabelId: handleLabelId,
        hasValueInThumb: valueInThumbCount > 0,
        registerValueInThumb,
        controlRef,
        thumbRef,
      }}
    >
      <BaseSlider.Root
        ref={ref}
        data-spark-component="slider"
        className={rootStyles({ className })}
        orientation="horizontal"
        disabled={disabled || readOnly}
        thumbAlignment="edge"
        name={name}
        aria-describedby={field.description}
        aria-invalid={field.isInvalid}
        aria-disabled={disabled || readOnly ? true : undefined}
        value={valueProp !== undefined ? [valueProp] : undefined}
        defaultValue={defaultValueProp !== undefined ? [defaultValueProp] : undefined}
        onValueChange={
          onValueChange
            ? (value: number | readonly number[]) => {
                const v = Array.isArray(value) ? (value[0] ?? 0) : value
                onValueChange(v)
              }
            : undefined
        }
        onValueCommitted={
          onValueCommit
            ? (value: number | readonly number[]) => {
                const v = Array.isArray(value) ? (value[0] ?? 0) : value
                onValueCommit(v)
              }
            : undefined
        }
        min={min}
        max={max}
        {...rest}
      >
        {children}
      </BaseSlider.Root>
    </SliderContext.Provider>
  )
}

Slider.displayName = 'Slider'
