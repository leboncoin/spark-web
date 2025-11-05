import { RefObject, useCallback, useEffect, useRef, useState } from 'react'

export interface ScrollOverflow {
  top: number
  bottom: number
  left: number
  right: number
}

export interface UseScrollOverflowReturn {
  overflow: ScrollOverflow
  refresh: () => void
}

export function useScrollOverflow(
  scrollRef: RefObject<HTMLElement | null>,
  /**
   * Tolerance threshold for floating-point precision issues.
   * Values below this threshold are considered as "no overflow" to handle sub-pixel rendering artifacts.
   */
  { precisionTreshold = 0 }: { precisionTreshold?: number } = {}
): UseScrollOverflowReturn {
  const [overflow, setOverflow] = useState<ScrollOverflow>({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  })

  const precisionTresholdRef = useRef(precisionTreshold)
  precisionTresholdRef.current = precisionTreshold

  const checkScrollContent = useCallback(() => {
    const scrollElement = scrollRef.current

    if (scrollElement) {
      const { scrollTop, scrollHeight, clientHeight, scrollLeft, scrollWidth, clientWidth } =
        scrollElement

      const applyPrecision = (value: number): number => {
        return value <= precisionTresholdRef.current ? 0 : value
      }

      const rightOverflow = scrollWidth - (scrollLeft + clientWidth)
      const bottomOverflow = scrollHeight - (scrollTop + clientHeight)

      setOverflow({
        top: applyPrecision(scrollTop),
        bottom: applyPrecision(bottomOverflow),
        left: applyPrecision(scrollLeft),
        right: applyPrecision(rightOverflow),
      })
    }
  }, [scrollRef])

  useEffect(() => {
    checkScrollContent()

    const scrollElement = scrollRef.current
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScrollContent)
      window.addEventListener('resize', checkScrollContent)
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', checkScrollContent)
        window.removeEventListener('resize', checkScrollContent)
      }
    }
  }, [scrollRef, checkScrollContent])

  return {
    overflow,
    refresh: checkScrollContent,
  }
}
