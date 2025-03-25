import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { useCombinedState } from './index'

describe('useCombinedState', () => {
  const map = ({
    value,
    defaultValue,
  }: {
    value?: unknown
    defaultValue?: unknown
  }): [unknown?, unknown?] => [value, defaultValue]
  interface argsType {
    value: unknown
    defaultValue: unknown
  }

  it('should be defined', () => {
    expect(useCombinedState).toBeDefined()
  })

  it('given no value and default value should return defaultValue and do not update its value until a controlled value is set', () => {
    // Given
    const args = { value: undefined, defaultValue: 123 } as argsType

    // When
    const hook = renderHook(() => useCombinedState(...map(args)))
    let [response, _, isControlledValue, initialValue] = hook.result.current

    // Then
    expect(response).toBe(123)
    expect(isControlledValue).toBe(false)
    expect(initialValue).toBe(123)

    // And
    // Given
    args.defaultValue = 456

    // When
    hook.rerender(args)
    ;[response, _, isControlledValue, initialValue] = hook.result.current

    // Then
    expect(response).toBe(123)
    expect(isControlledValue).toBe(false)
    expect(initialValue).toBe(123)

    // And
    // Given
    args.value = 789

    // When
    hook.rerender(args)
    ;[response, _, isControlledValue, initialValue] = hook.result.current

    // Then
    expect(response).toBe(789)
    expect(isControlledValue).toBe(true)
    expect(initialValue).toBe(123)
  })

  it('value must be more relevant than defaultValue', () => {
    // Given
    const args = { value: 123, defaultValue: 456 }

    // When
    const hook = renderHook(() => useCombinedState(...map(args)))
    const [response, _, isControlledValue, initialValue] = hook.result.current

    // Then
    expect(response).toBe(123)
    expect(isControlledValue).toBe(true)
    expect(initialValue).toBe(123)
  })

  it('value must be updated using its setter when using uncontrolled mode and blocked when using controlled mode', () => {
    // Given
    const args = { value: undefined, defaultValue: 123 } as argsType

    // When
    const hook = renderHook(() => useCombinedState(...map(args)))
    let [response, setResponse, isControlledValue, initialValue] = hook.result.current

    // Then
    expect(response).toBe(123)
    expect(isControlledValue).toBe(false)
    expect(initialValue).toBe(123)

    // And
    // When
    act(() => {
      setResponse(456)
    })
    ;[response] = hook.result.current

    // Then
    expect(isControlledValue).toBe(false)
    expect(response).toBe(456)

    // And
    // Then
    args.value = 789

    // When
    hook.rerender(args)
    ;[, setResponse] = hook.result.current
    act(() => {
      setResponse(123)
    })
    ;[response, , isControlledValue] = hook.result.current

    // Then
    expect(isControlledValue).toBe(true)
    expect(response).toBe(789)
  })

  it('value must NOT be updated using its setter when using uncontrolled mode using shouldUpdate flag to false', () => {
    // Given
    const args = { value: undefined, defaultValue: 123 } as argsType

    // When
    const hook = renderHook(() => useCombinedState(...map(args)))
    let [response, setResponse, isControlledValue, initialValue] = hook.result.current

    // Then
    expect(response).toBe(123)
    expect(isControlledValue).toBe(false)
    expect(initialValue).toBe(123)

    // And
    // When
    act(() => {
      setResponse(456, () => false)
    })
    ;[response] = hook.result.current

    // Then
    expect(isControlledValue).toBe(false)
    expect(response).toBe(123)
  })

  it('value must NOT be updated using its setter when using uncontrolled mode using shouldUpdate flag to true', () => {
    // Given
    const args = { value: 123, defaultValue: undefined } as argsType

    // When
    const hook = renderHook(() => useCombinedState(...map(args)))
    let [response, setResponse, isControlledValue, initialValue] = hook.result.current

    // Then
    expect(response).toBe(123)
    expect(isControlledValue).toBe(true)
    expect(initialValue).toBe(123)

    // And
    // When
    act(() => {
      setResponse(456, () => true)
    })
    ;[response] = hook.result.current

    // Then
    expect(isControlledValue).toBe(true)
    expect(response).toBe(123)
  })
})
