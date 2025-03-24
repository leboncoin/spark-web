import { fireEvent, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useSwipe } from './useSwipe'

const swipeRef = { current: document.createElement('div') }

describe('useSwipe', () => {
  /**
   * PointerEvent is not available in JSDom
   * cf: https://github.com/jsdom/jsdom/issues/2527
   */
  beforeAll(() => vi.stubGlobal('PointerEvent', MouseEvent))

  it('should be defined', () => {
    expect(useSwipe).toBeDefined()
  })

  it('should return undefined state and direction on nullish target element', () => {
    const { result } = renderHook(() => useSwipe({ swipeRef: { current: null } }))

    expect(result.current).toEqual({ state: undefined, direction: null })
  })

  it('should handle callback on pointerdown event', () => {
    const { result } = renderHook(() => useSwipe({ swipeRef }))

    fireEvent.pointerDown(swipeRef.current, { clientX: 0, clientY: 0 })

    expect(result.current).toEqual({ state: undefined, direction: null })
  })

  it('should handle callback and return state and direction on pointerdown event', () => {
    const onSwipeStart = vi.fn()
    const onSwipeMove = vi.fn()
    const { result } = renderHook(() => useSwipe({ swipeRef, onSwipeStart, onSwipeMove }))

    fireEvent.pointerDown(swipeRef.current, { clientX: 0, clientY: 0 })

    fireEvent.pointerMove(document, { clientX: 25, clientY: 0 })
    expect(result.current).toEqual({ state: 'start', direction: 'right' })

    fireEvent.pointerMove(document, { clientX: 25, clientY: -100 })
    expect(result.current).toEqual({ state: 'move', direction: 'up' })

    expect(onSwipeStart).toHaveBeenCalledTimes(1)
    expect(onSwipeStart).toHaveBeenCalledWith({ state: 'start', direction: 'right' })
    expect(onSwipeMove).toHaveBeenCalledTimes(1)
    expect(onSwipeMove).toHaveBeenCalledWith({ state: 'move', direction: 'up' })
  })

  it('should handle callbacks and return state and direction on pointerup event', () => {
    const onSwipeCancel = vi.fn()
    const onSwipeEnd = vi.fn()
    const { result } = renderHook(() => useSwipe({ swipeRef, onSwipeCancel, onSwipeEnd }))

    fireEvent.pointerDown(swipeRef.current, { clientX: 0, clientY: 0 })
    fireEvent.pointerMove(document, { clientX: 25, clientY: 0 })
    fireEvent.pointerUp(document, { clientX: 25, clientY: 0 })

    expect(result.current).toEqual({ state: 'cancel', direction: 'right' })

    fireEvent.pointerDown(swipeRef.current, { clientX: 0, clientY: 0 })
    fireEvent.pointerMove(document, { clientX: 0, clientY: -100 })
    fireEvent.pointerUp(document, { clientX: 0, clientY: -100 })

    expect(result.current).toEqual({ state: 'end', direction: 'up' })

    expect(onSwipeCancel).toHaveBeenCalledTimes(1)
    expect(onSwipeCancel).toHaveBeenCalledWith({ state: 'cancel', direction: 'right' })
    expect(onSwipeEnd).toHaveBeenCalledTimes(1)
    expect(onSwipeEnd).toHaveBeenCalledWith({ state: 'end', direction: 'up' })
  })
})
