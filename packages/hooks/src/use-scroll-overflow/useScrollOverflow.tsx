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

        setOverflow({
          top: scrollTop,
          bottom: scrollHeight - (scrollTop + clientHeight),
          left: scrollLeft,
          right: scrollWidth - (scrollLeft + clientWidth),
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
        window.addEventListener('resize', checkScrollContent)
      }
    }
  }, [scrollRef])

  return overflow
}
