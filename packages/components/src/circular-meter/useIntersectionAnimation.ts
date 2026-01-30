import { RefObject, useEffect, useRef } from 'react'

export interface UseIntersectionAnimationOptions {
  /**
   * The threshold at which the callback should be triggered.
   * A value of 0 means as soon as any part of the element is visible.
   * A value of 1 means the entire element must be visible.
   * @default 0.1
   */
  threshold?: number
  /**
   * The root margin for the Intersection Observer.
   * This can be used to trigger the animation before the element enters the viewport.
   * @default undefined
   */
  rootMargin?: string
}

/**
 * Hook to trigger an animation callback when an element enters the viewport.
 * The callback is only triggered once, when the element first becomes visible.
 *
 * @param elementRef - Reference to the element to observe
 * @param onIntersect - Callback to execute when the element enters the viewport
 * @param options - Configuration options for the Intersection Observer
 * @returns Whether the animation has been triggered
 */
export function useIntersectionAnimation(
  elementRef: RefObject<Element | null>,
  onIntersect: () => void,
  options: UseIntersectionAnimationOptions = {}
): boolean {
  const { threshold = 0.1, rootMargin } = options
  const hasTriggeredRef = useRef(false)
  const callbackRef = useRef(onIntersect)

  // Keep callback ref up to date
  useEffect(() => {
    callbackRef.current = onIntersect
  }, [onIntersect])

  useEffect(() => {
    const element = elementRef.current
    if (!element || hasTriggeredRef.current) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasTriggeredRef.current) {
            // Use requestAnimationFrame to ensure the callback runs at the right time
            requestAnimationFrame(() => {
              if (!hasTriggeredRef.current) {
                hasTriggeredRef.current = true
                callbackRef.current()
                // Disconnect observer after callback is triggered (only trigger once)
                observer.disconnect()
              }
            })
          }
        })
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [elementRef, threshold, rootMargin])

  return hasTriggeredRef.current
}
