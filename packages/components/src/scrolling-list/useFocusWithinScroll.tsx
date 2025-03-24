import { RefObject, useEffect, useState } from 'react'

export function useFocusWithinScroll<T extends HTMLElement | null>(
  ref: RefObject<T>, // The container to detect focus within
  scrollRef: RefObject<HTMLDivElement | null> // The scrollable container
) {
  const [isFocusWithin, setIsFocusWithin] = useState(false)

  useEffect(() => {
    const handleFocusIn = (event: FocusEvent) => {
      setIsFocusWithin(true)

      const focusedElement = event.target as HTMLElement
      const scrollContainer = scrollRef.current

      if (focusedElement && scrollContainer) {
        const focusRect = focusedElement.getBoundingClientRect()
        const scrollRect = scrollContainer.getBoundingClientRect()

        // Check if the focused element is fully visible inside the scroll container
        const isFullyVisible =
          focusRect.left >= scrollRect.left &&
          focusRect.right <= scrollRect.right &&
          focusRect.top >= scrollRect.top &&
          focusRect.bottom <= scrollRect.bottom

        if (!isFullyVisible) {
          focusedElement.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
        }
      }
    }

    const handleFocusOut = (event: FocusEvent) => {
      if (ref.current && !ref.current.contains(event.relatedTarget as Node)) {
        setIsFocusWithin(false)
      }
    }

    const node = ref.current
    if (node) {
      node.addEventListener('focusin', handleFocusIn)
      node.addEventListener('focusout', handleFocusOut)
    }

    return () => {
      if (node) {
        node.removeEventListener('focusin', handleFocusIn)
        node.removeEventListener('focusout', handleFocusOut)
      }
    }
  }, [ref, scrollRef])

  return isFocusWithin
}
