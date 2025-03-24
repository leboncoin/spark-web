import { useCallback, useLayoutEffect, useRef } from 'react'

type AnyFunction = (...args: any[]) => any

/**
 * Directly from this gist: https://gist.github.com/diegohaz/695097a06f038a707c3a1b11e4e40195
 * Until React releases a native `useEvent` hook.
 */
export function useEvent<T extends AnyFunction>(callback?: T) {
  const ref = useRef<AnyFunction | undefined>(() => {
    throw new Error('Cannot call an event handler while rendering.')
  })

  useLayoutEffect(() => {
    ref.current = callback
  })

  return useCallback<AnyFunction>((...args) => ref.current?.(...args), []) as T
}
