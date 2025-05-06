import { Slider as RadixSlider } from 'radix-ui'
import { type PropsWithChildren, Ref, useRef } from 'react'

import { rootStyles } from './Slider.styles'
import { SliderContext } from './SliderContext'
import type { SliderRangeVariantsProps } from './SliderTrack.styles'

export interface SliderProps
  extends Omit<
      RadixSlider.SliderProps,
      'dir' | 'orientation' | 'inverted' | 'minStepsBetweenThumbs'
    >,
    PropsWithChildren<SliderRangeVariantsProps> {
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   * @default false
   */
  asChild?: boolean
  /**
   * The value of the slider when initially rendered. Use when you do not need to control the state of the slider.
   */
  defaultValue?: number[]
  /**
   * The controlled value of the slider. Must be used in conjunction with `onValueChange`.
   */
  value?: number[]
  /**
   * Event handler called when the value changes.
   */
  onValueChange?: (value: number[]) => void
  /**
   * Event handler called when the value changes at the end of an interaction. Useful when you only need to capture a final value e.g. to update a backend service.
   */
  onValueCommit?: (value: number[]) => void
  /**
   * The name of the slider. Submitted with its owning form as part of a name/value pair.
   */
  name?: string
  /**
   * When `true`, prevents the user from interacting with the slider.
   * @default false
   */
  disabled?: boolean
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
  asChild = false,
  intent = 'basic',
  shape = 'square',
  children,
  className,
  ref,
  onValueCommit,
  onValueChange,
  ...rest
}: SliderProps) => {
  /**
   * There is a know issue in Chromium related to some trackpads causing `onValueCommit` not to fire.
   * This is a workaround to ensure `onValueCommit` is called when the user is done interacting with the slider.
   *
   * In case `onValueCommit` is not triggered, we used a local ref to the slider value and trigger the commit using the `onLostPointerCapture` event.
   *
   * Issues:
   *  https://github.com/radix-ui/primitives/issues/1760
   *  https://issues.chromium.org/issues/41488929
   */
  const cachedValue = useRef(rest.value)
  const shouldCommit = useRef(false)

  return (
    <SliderContext.Provider value={{ intent, shape }}>
      <RadixSlider.Root
        ref={ref}
        data-spark-component="slider"
        asChild={asChild}
        className={rootStyles({ className })}
        dir="ltr"
        orientation="horizontal"
        inverted={false}
        minStepsBetweenThumbs={0}
        onValueChange={value => {
          shouldCommit.current = true
          cachedValue.current = value
          onValueChange?.(cachedValue.current)
        }}
        onValueCommit={value => {
          shouldCommit.current = false
          onValueCommit?.(value)
        }}
        onLostPointerCapture={() => {
          if (cachedValue.current && shouldCommit.current) {
            onValueCommit?.(cachedValue.current)
          }
          shouldCommit.current = false
        }}
        {...rest}
      >
        {children}
      </RadixSlider.Root>
    </SliderContext.Provider>
  )
}

Slider.displayName = 'Slider'
