import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { useMountedState } from './index'

describe('useMountedState', () => {
  it('should be defined', () => {
    expect(useMountedState).toBeDefined()
  })

  it('should return true if component is mounted', () => {
    // Given
    const initialProps = false

    // When
    const hook = renderHook(() => useMountedState(), { initialProps })

    // Then
    expect(hook.result.current()).toBeTruthy()
  })

  it('should return false if component is unmounted', () => {
    // Given
    const initialProps = false

    // When
    const hook = renderHook(() => useMountedState(), { initialProps })
    hook.unmount()

    // Then
    expect(hook.result.current()).toBeFalsy()
  })
})
