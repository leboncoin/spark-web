import { act, renderHook } from '@testing-library/react'
import { mockResizeObserver } from 'jsdom-testing-mocks'
import { describe, expect, it, vi } from 'vitest'

import { useResizeObserver } from './useResizeObserver'

const resizeObserver = mockResizeObserver()
const element = document.createElement('div')

describe('useResizeObserver', () => {
  it('should be defined', () => {
    expect(useResizeObserver).toBeDefined()
  })

  it('should return undefined width and height on nullish target element', () => {
    const { result } = renderHook(() => useResizeObserver(null))

    expect(result.current).toEqual({ width: undefined, height: undefined })
  })

  it('should return target element width and height', () => {
    const { result } = renderHook(() => useResizeObserver(element))

    resizeObserver.mockElementSize(element, {
      borderBoxSize: { inlineSize: 300, blockSize: 200 },
    })

    act(() => resizeObserver.resize())

    expect(result.current).toEqual({ width: 300, height: 200 })

    resizeObserver.mockElementSize(element, {
      borderBoxSize: { inlineSize: 175, blockSize: 200 },
    })

    act(() => resizeObserver.resize(element))

    expect(result.current).toEqual({ width: 175, height: 200 })
  })

  it('should handle callback on resize', () => {
    const onResize = vi.fn()
    renderHook(() => useResizeObserver(element, onResize))

    resizeObserver.mockElementSize(element, {
      borderBoxSize: { inlineSize: 300, blockSize: 200 },
    })

    act(() => resizeObserver.resize())

    expect(onResize).toHaveBeenCalledTimes(1)
    expect(onResize).toHaveBeenCalledWith(
      expect.objectContaining({
        target: element,
      })
    )
  })
})
