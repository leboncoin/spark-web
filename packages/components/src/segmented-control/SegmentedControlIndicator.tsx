import { type ComponentProps, type CSSProperties, Ref, useEffect, useMemo, useState } from 'react'

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

/** The visual indicator that highlights the selected item. Renders a <span> element. */
export const SegmentedControlIndicator = ({
  className,
  ref,
  ...rest
}: SegmentedControlIndicatorProps) => {
  const { checkedValue, containerRef } = useSegmentedControlContext()
  const [rect, setRect] = useState<IndicatorRect | null>(null)

  const selector = useMemo(
    () => (checkedValue ? `[data-value="${CSS.escape(checkedValue)}"]` : null),
    [checkedValue]
  )

  useEffect(() => {
    const container = containerRef.current

    if (!container) {
      return
    }

    const selectedItem = selector ? container.querySelector<HTMLElement>(selector) : null

    const update = () => {
      const currentContainer = containerRef.current
      if (!currentContainer || !selector) {
        setRect(null)

        return
      }

      const currentSelected = currentContainer.querySelector<HTMLElement>(selector)
      if (!currentSelected) {
        setRect(null)

        return
      }

      const containerRect = currentContainer.getBoundingClientRect()
      const itemRect = currentSelected.getBoundingClientRect()

      // Storybook canvas "zoom" can be implemented via `transform: scale()`.
      // In that case, `getBoundingClientRect()` returns *scaled* values, but CSS positioning/sizing
      // expects unscaled layout pixels. We infer the scale factor from offset sizes and normalize.
      const scaleX =
        currentSelected.offsetWidth > 0 ? itemRect.width / currentSelected.offsetWidth : 1
      const scaleY =
        currentSelected.offsetHeight > 0 ? itemRect.height / currentSelected.offsetHeight : 1

      // `getBoundingClientRect()` is border-box; absolute positioning is relative to the padding box.
      setRect({
        left: (itemRect.left - containerRect.left) / scaleX - currentContainer.clientLeft,
        top: (itemRect.top - containerRect.top) / scaleY - currentContainer.clientTop,
        width: itemRect.width / scaleX,
        height: itemRect.height / scaleY,
      })
    }

    update()

    const ro =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            update()
          })
        : null

    ro?.observe(container)
    if (selectedItem) ro?.observe(selectedItem)

    window.addEventListener('resize', update, { passive: true })
    window.visualViewport?.addEventListener('resize', update, { passive: true })

    return () => {
      ro?.disconnect()
      window.removeEventListener('resize', update)
      window.visualViewport?.removeEventListener('resize', update)
    }
  }, [containerRef, selector])

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
