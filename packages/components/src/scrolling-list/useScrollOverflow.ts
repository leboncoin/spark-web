import { useEffect, useState, RefObject } from 'react'

export interface ScrollOverflow {
  left: number
  right: number
}

export function useScrollOverflow(scrollRef: RefObject<HTMLElement | null>): ScrollOverflow {
  const [overflow, setOverflow] = useState<ScrollOverflow>({
    left: 0,
    right: 0,
  })

  useEffect(() => {
    const checkScrollContent = () => {
      const scrollElement = scrollRef.current

      if (scrollElement) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollElement

        setOverflow({
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
