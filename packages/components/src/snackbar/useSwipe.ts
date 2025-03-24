/* eslint-disable complexity */
import { type RefObject, useEffect, useRef, useState } from 'react'

interface SwipeArgs<T> {
  swipeRef: RefObject<T | null>
  onSwipeStart?: ({ state, direction }: SwipeReturn) => void
  onSwipeMove?: ({ state, direction }: SwipeReturn) => void
  onSwipeCancel?: ({ state, direction }: SwipeReturn) => void
  onSwipeEnd?: ({ state, direction }: SwipeReturn) => void
  threshold?: number
}

interface SwipeReturn {
  state?: 'start' | 'move' | 'cancel' | 'end'
  direction?: 'up' | 'down' | 'right' | 'left' | null
}

const SWIPE_THRESHOLD = 75

export const useSwipe = <T extends HTMLElement>({
  swipeRef,
  onSwipeStart,
  onSwipeMove,
  onSwipeCancel,
  onSwipeEnd,
  threshold = 10,
}: SwipeArgs<T>): SwipeReturn => {
  const [state, setState] = useState<SwipeReturn['state']>()

  const direction = useRef<SwipeReturn['direction']>(null)
  const origin = useRef<Record<'x' | 'y', number> | null>(null)
  const delta = useRef<Record<'x' | 'y', number> | null>(null)

  const handleSwipeStart = (evt: PointerEvent) => {
    origin.current = { x: evt.clientX, y: evt.clientY }

    /**
     * Prevents unwanted text selection in Safari browser (longpress)
     */
    document.addEventListener('selectstart', e => e.preventDefault())
  }

  const handleSwipeMove = (evt: PointerEvent) => {
    if (!origin.current) return

    const deltaX = Math.abs(evt.clientX - origin.current.x)
    const deltaY = Math.abs(evt.clientY - origin.current.y)

    let moveState: SwipeReturn['state']

    if (deltaX > deltaY && deltaX > threshold) {
      direction.current = evt.clientX > origin.current.x ? 'right' : 'left'
    } else if (deltaY > threshold) {
      direction.current = evt.clientY > origin.current.y ? 'down' : 'up'
    }

    /**
     * If no direction could be defined, then no move should be handled.
     * This is particularly true with trackpads working with MacOS/Windows.
     */
    if (!direction.current) return

    if (!delta.current) {
      moveState = 'start'
      delta.current = { x: deltaX, y: deltaY }
      onSwipeStart?.({ state: moveState, direction: direction.current })
    } else {
      moveState = 'move'
      delta.current = { x: deltaX, y: deltaY }
      ;(swipeRef.current as T).style.setProperty(
        '--swipe-position-x',
        `${deltaX > deltaY ? evt.clientX - origin.current.x : 0}px`
      )
      ;(swipeRef.current as T).style.setProperty(
        '--swipe-position-y',
        `${!(deltaX > deltaY) ? evt.clientY - origin.current.y : 0}px`
      )
      onSwipeMove?.({ state: moveState, direction: direction.current })
    }

    setState(moveState)
  }

  const handleSwipeEnd = () => {
    const proxyDelta = delta.current

    origin.current = null
    delta.current = null

    if (proxyDelta) {
      const { x: deltaX, y: deltaY } = proxyDelta

      let endState: SwipeReturn['state']

      if (deltaX > deltaY) {
        if (deltaX > SWIPE_THRESHOLD) {
          endState = 'end'
          onSwipeEnd?.({ state: endState, direction: direction.current })
        } else {
          endState = 'cancel'
          onSwipeCancel?.({ state: endState, direction: direction.current })
        }
      } else {
        if (deltaY > SWIPE_THRESHOLD) {
          endState = 'end'
          onSwipeEnd?.({ state: endState, direction: direction.current })
        } else {
          endState = 'cancel'
          onSwipeCancel?.({ state: endState, direction: direction.current })
        }
      }

      setState(endState)

      /**
       * Prevents unwanted text selection in Safari browser (longpress)
       */
      document.removeEventListener('selectstart', e => e.preventDefault())
    }
  }

  useEffect(() => {
    if (!swipeRef.current) return

    const swipeElement = swipeRef.current

    swipeElement.addEventListener('pointerdown', handleSwipeStart)
    document.addEventListener('pointermove', handleSwipeMove)
    document.addEventListener('pointerup', handleSwipeEnd)

    return () => {
      swipeElement.removeEventListener('pointerdown', handleSwipeStart)
      document.removeEventListener('pointermove', handleSwipeMove)
      document.removeEventListener('pointerup', handleSwipeEnd)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    state,
    direction: direction.current,
  }
}
