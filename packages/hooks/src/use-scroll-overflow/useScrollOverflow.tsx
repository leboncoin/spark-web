import { RefObject, useEffect, useState } from 'react'

export interface ScrollOverflow {
  top: number
  bottom: number
  left: number
  right: number
}

export function useScrollOverflow(scrollRef: RefObject<HTMLElement | null>): ScrollOverflow {
  const [overflow, setOverflow] = useState<ScrollOverflow>({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  })

  useEffect(() => {
    const checkScrollContent = () => {
      const scrollElement = scrollRef.current

      if (scrollElement) {
        const { scrollTop, scrollHeight, clientHeight, scrollLeft, scrollWidth, clientWidth } =
          scrollElement

        // Helper function to handle floating point precision issues
        // This fixes the bug where overflow.right = 1 instead of 0 in iframes
        const roundToNearestPixel = (value: number): number => {
          // Round to 2 decimal places to handle sub-pixel precision
          // This prevents issues like 0.9999999999999999 becoming 1
          return Math.round(value * 100) / 100
        }

        const rightOverflow = scrollWidth - (scrollLeft + clientWidth)
        const bottomOverflow = scrollHeight - (scrollTop + clientHeight)

        setOverflow({
          top: roundToNearestPixel(scrollTop),
          bottom: roundToNearestPixel(bottomOverflow),
          left: roundToNearestPixel(scrollLeft),
          right: roundToNearestPixel(rightOverflow),
        })
      }
    }

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
  }, [scrollRef])

  return overflow
}
