import { useLayoutEffect, RefObject } from 'react'

export function useResizeObserver<T extends HTMLElement | null>(
  ref: RefObject<T>,
  callback: (width: number) => void
) {
  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        callback(entry.contentRect.width)
      }
    })

    observer.observe(element)

    return () => observer.disconnect() // Cleanup on unmount
  }, [ref, callback])
}
