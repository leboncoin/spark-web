import { Ref, RefCallback, RefObject, useMemo } from 'react'

export function assignRef<T>(ref: Ref<T> | null | undefined, value: T) {
  if (ref == null) {
    return
  }

  if (typeof ref === 'function') {
    ref(value)

    return
  }

  try {
    ;(ref as RefObject<T | null>).current = value
  } catch {
    throw new Error(`Cannot assign value '${value}' to ref '${ref}'`)
  }
}

export function mergeRefs<T>(...refs: (Ref<T> | undefined)[]): RefCallback<T> {
  return value => {
    refs.forEach(ref => assignRef(ref, value))
  }
}

export function useMergeRefs<T>(...refs: (Ref<T> | undefined)[]) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => mergeRefs(...refs), refs)
}
