import type { RefObject } from 'react'
import { useLayoutEffect, useState } from 'react'

/**
 * Computes the translateX (in pixels) to apply to the value element so it stays
 * within the horizontal bounds of the slider control when displayed inside the thumb.
 *
 * The thumb center is derived from `value` rather than measured from the DOM: with edge alignment,
 * Base UI positions the thumb in its own layout effect, which runs after this (child) one.
 *
 * @returns translateX in pixels (positive = right, negative = left), or 0 if refs are missing
 */
export function useSliderValueBoundaries(
  controlRef: RefObject<HTMLElement | null>,
  thumbRef: RefObject<HTMLElement | null>,
  valueRef: RefObject<HTMLElement | null>,
  value: number,
  min: number,
  max: number
): number {
  const [translateX, setTranslateX] = useState(0)
  const [refsRetryScheduled, setRefsRetryScheduled] = useState(false)

  useLayoutEffect(() => {
    const control = controlRef.current
    const thumb = thumbRef.current
    const valueEl = valueRef.current

    if (!control || !thumb || !valueEl) {
      setTranslateX(0)
      // Re-run once on next frame when refs may be set (e.g. Slider.Value mounts after Control/Thumb)
      if (!refsRetryScheduled) {
        requestAnimationFrame(() => setRefsRetryScheduled(true))
      }

      return
    }

    let cancelled = false

    const compute = () => {
      if (cancelled) return

      const controlWidth = control.getBoundingClientRect().width
      const thumbWidth = thumb.getBoundingClientRect().width
      const valueWidth = valueEl.scrollWidth

      // Skip until value label has been laid out (content from render prop may not be ready on first paint)
      if (valueWidth === 0) {
        requestAnimationFrame(compute)

        return
      }

      const ratio = max > min ? (value - min) / (max - min) : 0
      const thumbCenterPx = thumbWidth / 2 + (controlWidth - thumbWidth) * ratio

      const valueCenterMin = valueWidth / 2
      const valueCenterMax = controlWidth - valueWidth / 2

      const clampedCenter = Math.max(valueCenterMin, Math.min(valueCenterMax, thumbCenterPx))
      const nextTranslateX = clampedCenter - thumbCenterPx

      setTranslateX(prev => (prev !== nextTranslateX ? nextTranslateX : prev))
    }

    compute()

    const resizeObserver = new ResizeObserver(compute)
    resizeObserver.observe(control)
    resizeObserver.observe(valueEl)

    return () => {
      cancelled = true
      resizeObserver.disconnect()
    }
  }, [controlRef, thumbRef, valueRef, value, min, max, refsRetryScheduled])

  return translateX
}
