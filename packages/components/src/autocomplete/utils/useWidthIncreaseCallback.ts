import { RefObject, useEffect, useRef } from 'react'

export const useWidthIncreaseCallback = (
  elementRef: RefObject<HTMLDivElement | null>,
  callback: () => void
): void => {
  const prevWidthRef = useRef<number | null>(null)

  useEffect(() => {
    const checkWidthIncrease = () => {
      const currentWidth = elementRef.current?.scrollWidth || null

      if (prevWidthRef.current && currentWidth && currentWidth > prevWidthRef.current) {
        callback()
      }

      prevWidthRef.current = currentWidth
      requestAnimationFrame(checkWidthIncrease)
    }

    const interval = requestAnimationFrame(checkWidthIncrease)

    return () => cancelAnimationFrame(interval)
  }, [elementRef])
}
