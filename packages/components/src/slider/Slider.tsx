import { Slider as RadixSlider } from 'radix-ui'
import { type PropsWithChildren, Ref } from 'react'

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
  ...rest
}: SliderProps) => (
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
      {...rest}
    >
      {children}
    </RadixSlider.Root>
  </SliderContext.Provider>
)

Slider.displayName = 'Slider'
