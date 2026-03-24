import { type ComponentProps, type CSSProperties, Ref, useEffect, useState } from 'react'

import { indicatorStyles } from './SegmentedControl.styles'
import { useSegmentedControlContext } from './SegmentedControlContext'

interface IndicatorRect {
  left: number
  top: number
  width: number
  height: number
}

export interface SegmentedControlIndicatorProps extends ComponentProps<'span'> {
  ref?: Ref<HTMLSpanElement>
}

export const SegmentedControlIndicator = ({
  className,
  ref,
  ...rest
}: SegmentedControlIndicatorProps) => {
  const { pressedValue, containerRef } = useSegmentedControlContext()
  const [rect, setRect] = useState<IndicatorRect | null>(null)

  useEffect(() => {
    const container = containerRef.current

    if (!container) {
      return
    }

    const selectedItem = pressedValue
      ? container.querySelector<HTMLElement>(`[data-value="${pressedValue}"]`)
      : null

    if (!selectedItem) {
      setRect(null)

      return
    }

    const containerRect = container.getBoundingClientRect()
    const itemRect = selectedItem.getBoundingClientRect()

    const borderWidth = 2

    setRect({
      left: itemRect.left - containerRect.left - borderWidth,
      top: itemRect.top - containerRect.top - borderWidth,
      width: itemRect.width,
      height: itemRect.height,
    })
  }, [pressedValue, containerRef])

  if (!rect) return null

  const style: CSSProperties = {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
  }

  return (
    <span
      ref={ref}
      data-spark-component="segmented-control-indicator"
      aria-hidden
      className={indicatorStyles({ className })}
      style={style}
      {...rest}
    />
  )
}

SegmentedControlIndicator.displayName = 'SegmentedControl.Indicator'
