import { RefObject, useCallback, useEffect, useRef } from 'react'

/**
 * Hook to manage slide visibility using a centralized IntersectionObserver.
 * This optimizes performance by using a single observer per carousel instead of one per slide.
 *
 * @param carouselRef - Reference to the carousel container element
 * @returns Object with functions to register/unregister slides and check visibility
 */
export function useCarouselVisibility(carouselRef: RefObject<HTMLDivElement | null>) {
  const slideVisibilityMap = useRef<Map<HTMLElement, boolean>>(new Map())
  const visibilityObserverRef = useRef<IntersectionObserver | null>(null)
  const visibilityCallbacksRef = useRef<Map<HTMLElement, (isVisible: boolean) => void>>(new Map())

  // Create the shared IntersectionObserver callback
  const createObserverCallback = useCallback(() => {
    return (entries: IntersectionObserverEntry[]) => {
      // Batch all visibility updates to minimize re-renders
      entries.forEach(entry => {
        const isVisible = entry.isIntersecting
        const element = entry.target as HTMLElement
        slideVisibilityMap.current.set(element, isVisible)

        // Notify the callback if it exists
        const callback = visibilityCallbacksRef.current.get(element)
        if (callback) {
          callback(isVisible)
        }
      })
    }
  }, [])

  // Initialize or get the shared IntersectionObserver
  const getOrCreateObserver = useCallback(() => {
    if (visibilityObserverRef.current) {
      return visibilityObserverRef.current
    }

    const container = carouselRef.current
    if (!container) return null

    const observer = new IntersectionObserver(createObserverCallback(), {
      root: container,
      threshold: 0.2,
    })

    visibilityObserverRef.current = observer

    return observer
  }, [carouselRef, createObserverCallback])

  // Initialize the shared IntersectionObserver when container is ready
  useEffect(() => {
    const observer = getOrCreateObserver()
    // Capture ref values to avoid stale closure warnings
    const visibilityMap = slideVisibilityMap.current
    const callbacksMap = visibilityCallbacksRef.current

    return () => {
      if (observer) {
        observer.disconnect()
        visibilityMap.clear()
        callbacksMap.clear()
        visibilityObserverRef.current = null
      }
    }
  }, [getOrCreateObserver])

  // Register a slide element with the observer
  const registerSlide = useCallback(
    (element: HTMLElement | null, callback: (isVisible: boolean) => void) => {
      if (!element) return

      const observer = getOrCreateObserver()
      if (!observer) {
        // If container is not ready yet, retry on next tick
        setTimeout(() => registerSlide(element, callback), 0)

        return
      }

      // Check initial visibility (default to true for slides that are already in view)
      const initialVisible = slideVisibilityMap.current.get(element) ?? true
      slideVisibilityMap.current.set(element, initialVisible)
      visibilityCallbacksRef.current.set(element, callback)
      observer.observe(element)

      // Call callback with initial state
      callback(initialVisible)
    },
    [getOrCreateObserver]
  )

  // Unregister a slide element from the observer
  const unregisterSlide = useCallback((element: HTMLElement | null) => {
    if (!element) return

    const observer = visibilityObserverRef.current
    if (observer) {
      observer.unobserve(element)
    }
    slideVisibilityMap.current.delete(element)
    visibilityCallbacksRef.current.delete(element)
  }, [])

  // Get current visibility state for a slide
  const isSlideVisible = useCallback((element: HTMLElement | null): boolean => {
    if (!element) return true

    return slideVisibilityMap.current.get(element) ?? true
  }, [])

  return {
    registerSlide,
    unregisterSlide,
    isSlideVisible,
  }
}
