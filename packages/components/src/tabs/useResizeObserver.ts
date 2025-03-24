import { type RefObject, useEffect, useRef, useState } from 'react'

interface Size {
  width?: number
  height?: number
}

type ResizeCallback = (entry?: ResizeObserverEntry) => void

export const useResizeObserver = <T extends HTMLElement>(
  target: RefObject<T | null> | T | null,
  onResize?: ResizeCallback
): Size => {
  const [size, setSize] = useState<Size>({ width: undefined, height: undefined })
  const resizeObserverRef = useRef<ResizeObserver>(null)
  const resizeCallbackRef = useRef<ResizeCallback | undefined>(onResize)

  useEffect(() => {
    resizeCallbackRef.current = onResize
  }, [onResize])

  useEffect(() => {
    const targetElm = target && 'current' in target ? target.current : target
    if (!targetElm || resizeObserverRef.current) {
      return
    }

    resizeObserverRef.current = new ResizeObserver(([entry]) => {
      const { inlineSize: width, blockSize: height } = entry?.borderBoxSize?.[0] ?? {}
      resizeCallbackRef.current?.(entry)

      setSize({ width, height })
    })

    resizeObserverRef.current.observe(targetElm as unknown as HTMLElement)

    return () => {
      resizeObserverRef.current &&
        resizeObserverRef.current.unobserve(targetElm as unknown as HTMLElement)
    }
  }, [target, resizeObserverRef, resizeCallbackRef])

  return size
}
