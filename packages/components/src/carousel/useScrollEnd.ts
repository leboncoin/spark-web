import { useEffect, useRef, RefObject } from 'react'

export function useScrollEnd(scrollRef: RefObject<HTMLDivElement | null>, callback: () => void) {
  const scrollLeft = useRef(0)

  /**
   * Safari (and some smaller browsers) to not yet support the `scrollend` event.
   * For those we must rely on the `scroll` event and and an idle state delay to trigger the "scroll end".
   *
   * Caveats:
   * - when using a trackpad or your fingers on a touch device, scrolling then holding the position might trigger the "scrollend" callback too early.
   */
  const safariTimeout = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const element = scrollRef.current
    if (!element) return

    const supportsScrollend = 'onscrollend' in window

    const handleScrollEnd = () => {
      callback()
    }

    const handleSafariScroll = () => {
      if (safariTimeout.current) {
        clearTimeout(safariTimeout.current)
      }

      if (scrollRef.current) {
        scrollLeft.current = scrollRef.current.scrollLeft

        safariTimeout.current = setTimeout(() => {
          if (scrollRef.current) {
            handleScrollEnd()
          }
        }, 150)
      }
    }

    if (supportsScrollend) {
      element.addEventListener('scrollend', handleScrollEnd)
    } else {
      element.addEventListener('scroll', handleSafariScroll)
    }

    return () => {
      if (safariTimeout.current) {
        clearTimeout(safariTimeout.current)
      }

      if (supportsScrollend) {
        element.removeEventListener('scrollend', handleScrollEnd)
      } else {
        element.removeEventListener('scroll', handleSafariScroll)
      }
    }
  }, [callback, scrollRef])
}

export default useScrollEnd
