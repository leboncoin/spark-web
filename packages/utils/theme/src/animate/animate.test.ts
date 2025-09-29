import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { animate, useAnimate } from './index'

describe('animate', () => {
  let mockElement: HTMLElement
  let mockAddEventListener: ReturnType<typeof vi.fn>
  let mockRemoveEventListener: ReturnType<typeof vi.fn>
  let mockClassList: {
    add: ReturnType<typeof vi.fn>
    remove: ReturnType<typeof vi.fn>
    contains: ReturnType<typeof vi.fn>
  }
  let mockGetComputedStyle: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockAddEventListener = vi.fn()
    mockRemoveEventListener = vi.fn()
    mockClassList = {
      add: vi.fn(),
      remove: vi.fn(),
      contains: vi.fn().mockReturnValue(true),
    }
    mockGetComputedStyle = vi.fn().mockReturnValue({
      getPropertyValue: vi.fn().mockReturnValue('250'),
    })

    mockElement = {
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
      classList: mockClassList,
    } as unknown as HTMLElement

    // Mock global getComputedStyle
    Object.defineProperty(window, 'getComputedStyle', {
      value: mockGetComputedStyle,
      writable: true,
    })

    // Mock console.warn
    vi.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.restoreAllMocks()
  })

  it('should add single animation class to element', () => {
    animate(mockElement, 'animate-shake-x')

    expect(mockClassList.add).toHaveBeenCalledWith('animate-shake-x')
  })

  it('should add multiple animation classes to element', () => {
    animate(mockElement, 'animate-shake-x animation-duration-1000')

    expect(mockClassList.add).toHaveBeenCalledWith('animate-shake-x')
    expect(mockClassList.add).toHaveBeenCalledWith('animation-duration-1000')
  })

  it('should handle classes with extra whitespace', () => {
    animate(mockElement, '  animate-shake-x   animation-duration-1000  ')

    expect(mockClassList.add).toHaveBeenCalledWith('animate-shake-x')
    expect(mockClassList.add).toHaveBeenCalledWith('animation-duration-1000')
  })

  it('should add event listeners for animation end', () => {
    animate(mockElement, 'animate-shake-x')

    expect(mockAddEventListener).toHaveBeenCalledWith('animationend', expect.any(Function))
    expect(mockAddEventListener).toHaveBeenCalledWith('animationcancel', expect.any(Function))
  })

  it('should call onStart callback when provided', () => {
    const onStart = vi.fn()

    animate(mockElement, 'animate-shake-x', { onStart })

    expect(onStart).toHaveBeenCalled()
  })

  it('should remove single class and call onEnd when animation ends', () => {
    const onEnd = vi.fn()

    animate(mockElement, 'animate-shake-x', { onEnd })

    // Get the event handler function
    const eventHandler = mockAddEventListener.mock.calls.find(
      call => call[0] === 'animationend'
    )?.[1] as Function

    // Simulate animation end
    eventHandler()

    expect(mockClassList.remove).toHaveBeenCalledWith('animate-shake-x')
    expect(onEnd).toHaveBeenCalled()
  })

  it('should remove multiple classes and call onEnd when animation ends', () => {
    const onEnd = vi.fn()

    animate(mockElement, 'animate-shake-x animation-duration-1000', { onEnd })

    // Get the event handler function
    const eventHandler = mockAddEventListener.mock.calls.find(
      call => call[0] === 'animationend'
    )?.[1] as Function

    // Simulate animation end
    eventHandler()

    expect(mockClassList.remove).toHaveBeenCalledWith('animate-shake-x', 'animation-duration-1000')
    expect(onEnd).toHaveBeenCalled()
  })

  it('should not remove classes if removeAfterAnimation is false', () => {
    animate(mockElement, 'animate-shake-x', { removeAfterAnimation: false })

    // Get the event handler function
    const eventHandler = mockAddEventListener.mock.calls.find(
      call => call[0] === 'animationend'
    )?.[1] as Function

    // Simulate animation end
    eventHandler()

    expect(mockClassList.remove).not.toHaveBeenCalled()
  })

  it('should use CSS variable duration for fallback timeout', () => {
    const setTimeoutSpy = vi.spyOn(global, 'setTimeout')

    animate(mockElement, 'animate-shake-x')

    expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 250)
  })

  it('should warn when element is null', () => {
    animate(null, 'animate-shake-x')

    expect(console.warn).toHaveBeenCalledWith('animate: Element is null or undefined')
  })

  it('should warn when element is undefined', () => {
    animate(undefined as any, 'animate-shake-x')

    expect(console.warn).toHaveBeenCalledWith('animate: Element is null or undefined')
  })

  it('should clean up event listeners after animation end', () => {
    animate(mockElement, 'animate-shake-x')

    // Get the event handler function
    const eventHandler = mockAddEventListener.mock.calls.find(
      call => call[0] === 'animationend'
    )?.[1] as Function

    // Simulate animation end
    eventHandler()

    expect(mockRemoveEventListener).toHaveBeenCalledWith('animationend', eventHandler)
    expect(mockRemoveEventListener).toHaveBeenCalledWith('animationcancel', eventHandler)
  })

  it('should handle fallback timeout with multiple classes', () => {
    const setTimeoutSpy = vi.spyOn(global, 'setTimeout')
    mockClassList.contains.mockImplementation((cls: string) => cls === 'animate-shake-x')

    animate(mockElement, 'animate-shake-x animation-duration-1000')

    // Get the timeout callback
    const timeoutCall = setTimeoutSpy.mock.calls[0]
    if (timeoutCall && timeoutCall[0]) {
      const timeoutCallback = timeoutCall[0] as Function
      timeoutCallback()

      // Should only remove classes that are still present
      expect(mockClassList.remove).toHaveBeenCalledWith('animate-shake-x')
    }
  })
})

describe('useAnimate', () => {
  it('should return a function that calls animate', () => {
    const mockRef = { current: document.createElement('div') }
    const triggerAnimation = useAnimate(mockRef)

    expect(typeof triggerAnimation).toBe('function')

    // Mock animate to verify it's called
    const originalSparkAnimate = require('./animate').animate
    const mockSparkAnimate = vi.fn()
    require('./animate').animate = mockSparkAnimate

    triggerAnimation('animate-shake-x')

    expect(mockSparkAnimate).toHaveBeenCalledWith(mockRef.current, 'animate-shake-x', undefined)

    // Restore original function
    require('./animate').animate = originalSparkAnimate
  })

  it('should pass options to animate', () => {
    const mockRef = { current: document.createElement('div') }
    const triggerAnimation = useAnimate(mockRef)
    const options = { onStart: () => console.log('started') }

    // Mock animate to verify it's called
    const originalSparkAnimate = require('./animate').animate
    const mockSparkAnimate = vi.fn()
    require('./animate').animate = mockSparkAnimate

    triggerAnimation('animate-shake-x', options)

    expect(mockSparkAnimate).toHaveBeenCalledWith(mockRef.current, 'animate-shake-x', options)

    // Restore original function
    require('./animate').animate = originalSparkAnimate
  })

  it('should handle multiple classes in useAnimate', () => {
    const mockRef = { current: document.createElement('div') }
    const triggerAnimation = useAnimate(mockRef)

    // Mock animate to verify it's called
    const originalSparkAnimate = require('./animate').animate
    const mockSparkAnimate = vi.fn()
    require('./animate').animate = mockSparkAnimate

    triggerAnimation('animate-shake-x animation-duration-1000')

    expect(mockSparkAnimate).toHaveBeenCalledWith(
      mockRef.current,
      'animate-shake-x animation-duration-1000',
      undefined
    )

    // Restore original function
    require('./animate').animate = originalSparkAnimate
  })
})
