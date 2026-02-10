import { Slider as BaseSlider } from '@base-ui/react/slider'
import { useMergeRefs } from '@spark-ui/hooks/use-merge-refs'
import { cx } from 'class-variance-authority'
import type { ReactNode } from 'react'
import { ComponentProps, useCallback, useEffect, useRef, useState } from 'react'

import { useSliderContext } from './SliderContext'
import { useSliderThumbContext } from './SliderThumbContext'
import { useSliderValueBoundaries } from './useSliderValueBoundaries'

export type SliderValueProps = Omit<ComponentProps<typeof BaseSlider.Value>, 'render'>

/**
 * Normalizes Base UI's (formattedValues, values) to single (formatted, value) for the render prop.
 */
export const SliderValue = ({ className, children, ref, ...rest }: SliderValueProps) => {
  const { registerValueInThumb, controlRef, thumbRef } = useSliderContext()
  const thumbContext = useSliderThumbContext()
  const isInsideThumb = thumbContext !== null

  const valueRef = useRef<HTMLOutputElement | null>(null)
  const mergedRef = useMergeRefs(valueRef, ref)

  const [currentValue, setCurrentValue] = useState(0)
  const translateX = useSliderValueBoundaries(controlRef, thumbRef, valueRef, currentValue)

  useEffect(() => {
    if (!isInsideThumb) return

    return registerValueInThumb()
  }, [isInsideThumb, registerValueInThumb])

  const resolvedClassName = cx(
    isInsideThumb
      ? 'absolute left-1/2 -translate-x-1/2 top-[calc(-100%-var(--spacing-sm))] text-body-1 font-bold whitespace-nowrap'
      : 'default:text-body-1 col-start-2 text-right default:font-bold',
    className
  )

  const normalizedChildren = useCallback(
    (formattedValues: readonly string[], values: readonly number[]) => {
      const formatted = formattedValues[0] ?? String(values[0] ?? '')
      const value = values[0] ?? 0
      setCurrentValue(value)
      if (typeof children === 'function') {
        return (children as unknown as (formatted: string, value: number) => ReactNode)(
          formatted,
          value
        )
      }

      return formatted
    },
    [children]
  )

  const style = isInsideThumb
    ? { transform: `translate(calc(0% + ${translateX}px), 0)` }
    : undefined

  return (
    <BaseSlider.Value
      data-spark-component="slider-value"
      ref={mergedRef}
      className={resolvedClassName}
      style={style}
      {...rest}
    >
      {normalizedChildren}
    </BaseSlider.Value>
  )
}

SliderValue.displayName = 'Slider.Value'
