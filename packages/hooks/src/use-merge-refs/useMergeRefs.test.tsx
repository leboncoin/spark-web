import { render } from '@testing-library/react'
import { createRef, RefCallback, RefObject, useEffect, useRef } from 'react'
import { describe, expect, it } from 'vitest'

import { useMergeRefs } from './index'

describe('useMergeRefs', () => {
  interface refsInterface {
    first?: unknown
    second?: unknown
    third?: unknown
  }

  it('should merge all the passed refs into a single one', () => {
    // Given
    const refs = {} as refsInterface
    function TestComponent() {
      const firstRef = useRef(null)
      const secondRef = useRef(null)
      const thirdRef = useRef(null)

      const ref = useMergeRefs<HTMLDivElement | undefined>(firstRef, secondRef, thirdRef)

      useEffect(() => {
        refs.first = firstRef.current
        refs.second = secondRef.current
        refs.third = thirdRef.current
      }, [])

      return <div ref={ref} />
    }

    // When
    render(<TestComponent />)

    // Then
    expect(refs.first).toBe(refs.second)
    expect(refs.first).toBe(refs.third)
    expect(refs.second).toBe(refs.third)
  })

  it('should merge both legacy and object references', () => {
    // Given
    const refs = {} as refsInterface
    const TestComponent = function TestComponent({
      ref: forwardedRef,
      ...props
    }: {
      ref?: RefObject<HTMLElement | null | undefined>
    }) {
      const firstRef = useRef(null)
      const secondRef = useRef(null)

      const ref = useMergeRefs(firstRef, secondRef, forwardedRef)

      useEffect(() => {
        refs.first = firstRef.current
        refs.second = secondRef.current
      }, [])

      return <div ref={ref} {...props} />
    }
    const refToBeForwarded = createRef<HTMLElement | null | undefined>()

    // When
    render(<TestComponent ref={refToBeForwarded} />)

    // Then
    expect(refs.first).toBe(refs.second)
    expect(refs.first).toBe(refToBeForwarded.current)
    expect(refs.second).toBe(refToBeForwarded.current)
  })

  it('should ignore null and undefined values given as a reference in the array of arguments', () => {
    // Given
    const refs = {} as refsInterface
    function TestComponent() {
      const firstRef = useRef(null)
      const secondRef = useRef(null)
      const thirdRef = useRef(null)

      const ref = useMergeRefs<HTMLDivElement | undefined>(
        firstRef,
        null,
        undefined,
        secondRef,
        thirdRef
      )

      useEffect(() => {
        refs.first = firstRef.current
        refs.second = secondRef.current
        refs.third = thirdRef.current
      }, [])

      return <div ref={ref} />
    }

    // When
    render(<TestComponent />)

    // Then
    expect(refs.first).toBe(refs.second)
    expect(refs.first).toBe(refs.third)
    expect(refs.second).toBe(refs.third)
  })

  it('should process function arguments in the array of arguments', () => {
    // Given
    const refs = {} as {
      first?: unknown
      second?: unknown
      third?: unknown
      fnRef?: unknown
    }
    const fnRef: RefCallback<HTMLDivElement> = node => {
      refs.fnRef = node
    }
    function TestComponent() {
      const firstRef = useRef(null)
      const secondRef = useRef(null)
      const thirdRef = useRef(null)

      const ref = useMergeRefs<HTMLDivElement | undefined>(firstRef, secondRef, thirdRef, fnRef)

      useEffect(() => {
        refs.first = firstRef.current
        refs.second = secondRef.current
        refs.third = thirdRef.current
      }, [])

      return <div ref={ref} />
    }

    // When
    render(<TestComponent />)

    // Then
    expect(refs.first).toBe(refs.second)
    expect(refs.first).toBe(refs.third)
    expect(refs.second).toBe(refs.third)
    expect(refs.fnRef).toBe(refs.first)
  })
})
