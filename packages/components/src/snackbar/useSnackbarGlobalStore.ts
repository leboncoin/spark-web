import { type RefObject, useCallback, useSyncExternalStore } from 'react'

interface UseSnackbarGlobalStoreArgs<T> {
  providers: Set<T>
  subscriptions: Set<() => void>
}

interface UseSnackbarGlobalStoreReturn<T> {
  provider: T
  addProvider: (ref: T) => void
  deleteProvider: (ref: T) => void
}

/**
 * This hook is a basic abstraction of useSyncExternalStore hook which allows us
 * to consume data from an external data store.
 *
 * Cf. https://react.dev/reference/react/useSyncExternalStore#subscribing-to-an-external-store
 */

export const useSnackbarGlobalStore = <T = RefObject<HTMLDivElement | null>>({
  providers,
  subscriptions,
}: UseSnackbarGlobalStoreArgs<T>): UseSnackbarGlobalStoreReturn<T> => {
  const subscribe = useCallback(
    (listener: () => void) => {
      subscriptions.add(listener)

      return () => subscriptions.delete(listener)
    },
    [subscriptions]
  )

  const getLastSnackbarProvider = useCallback(() => [...providers].reverse()[0] as T, [providers])

  const addProvider = useCallback(
    (provider: T) => {
      providers.add(provider)

      for (const subscribeFn of subscriptions) {
        subscribeFn()
      }
    },
    [providers, subscriptions]
  )

  const deleteProvider = useCallback(
    (provider: T) => {
      providers.delete(provider)

      for (const subscribeFn of subscriptions) {
        subscribeFn()
      }
    },
    [providers, subscriptions]
  )

  const provider = useSyncExternalStore(subscribe, getLastSnackbarProvider, getLastSnackbarProvider)

  return {
    provider,
    addProvider,
    deleteProvider,
  }
}
