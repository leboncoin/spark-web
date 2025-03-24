import { useLayoutEffect, useState, RefObject } from 'react'

export function useIsVisible(
  elementRef: RefObject<HTMLElement | null>,
  parentRef: RefObject<HTMLElement | null>
) {
  const [isVisible, setIsVisible] = useState(true)

  useLayoutEffect(() => {
    const el = elementRef.current
    const parent = parentRef.current

    if (!parent || !el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) {
          setIsVisible(entry.isIntersecting)
        }
      },
      { root: parent, threshold: 0.2 }
    )

    observer.observe(el)

    return () => observer.disconnect()
  })

  return isVisible
}
