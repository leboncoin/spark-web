import { Slider as RadixSlider } from 'radix-ui'
import { type FocusEvent, type KeyboardEvent, type PointerEvent, Ref, useRef } from 'react'

import { useSliderContext } from './SliderContext'
import { thumbVariants } from './SliderThumb.styles'

export interface SliderThumbProps extends RadixSlider.SliderThumbProps {
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   * @default false
   */
  asChild?: boolean
  ref?: Ref<HTMLSpanElement>
}

export const SliderThumb = ({
  asChild = false,
  className,
  onPointerDown,
  onKeyDown,
  onBlur,
  ref: forwardedRef,
  ...rest
}: SliderThumbProps) => {
  const { intent } = useSliderContext()

  const innerRef = useRef(null)
  const ref = forwardedRef || innerRef

  const setInteractionType = (e: KeyboardEvent | FocusEvent | PointerEvent) => {
    /**
     * Radix Slider implementation uses `.focus()` and thus prevent us to handle
     * distinctively focus/focus-visible styles. So we use a `data-interaction` attribute to stay
     * aware of the type of event, and adapt styles if needed.
     */
    if (typeof ref === 'function' || !ref.current) return
    ref.current.dataset.interaction = e.type
  }

  return (
    <RadixSlider.Thumb
      ref={ref}
      asChild={asChild}
      onPointerDown={(e: PointerEvent<HTMLSpanElement>) => {
        setInteractionType(e)
        onPointerDown?.(e)
      }}
      onKeyDown={(e: KeyboardEvent<HTMLSpanElement>) => {
        setInteractionType(e)
        onKeyDown?.(e)
      }}
      onBlur={(e: FocusEvent<HTMLSpanElement>) => {
        setInteractionType(e)
        onBlur?.(e)
      }}
      className={thumbVariants({ intent, className })}
      {...rest}
    />
  )
}

SliderThumb.displayName = 'Slider.Thumb'
