import { RefObject, useEffect, useState } from 'react'

import { useCarouselContext } from './Carousel'

/**
 * Hook to track slide visibility using the centralized IntersectionObserver.
 * This optimizes performance by using a single observer per carousel instead of one per slide.
 */
export function useIsVisible(
  elementRef: RefObject<HTMLElement | null>,
  _parentRef: RefObject<HTMLElement | null>
) {
  const [isVisible, setIsVisible] = useState(true)
  const ctx = useCarouselContext()

  useEffect(() => {
    const el = elementRef.current
    if (!el) return

    // Extract stable functions from context to avoid unnecessary re-renders
    const { registerSlide, unregisterSlide } = ctx

    // Register the slide with the centralized observer
    registerSlide(el, setIsVisible)

    // Cleanup: unregister when the component unmounts
    return () => {
      unregisterSlide(el)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef]) // Only depend on elementRef, registerSlide/unregisterSlide are stable callbacks

  return isVisible
}
