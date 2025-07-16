import {
  type ToastOptions as SnackBarItemOptions,
  ToastQueue,
  useToastQueue,
} from '@react-stately/toast'
import { type ReactElement, Ref, type RefObject, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

import { type SnackbarItemValue } from './SnackbarItem'
import { SnackbarRegion, type SnackbarRegionProps } from './SnackbarRegion'
import { useSnackbarGlobalStore } from './useSnackbarGlobalStore'

/**
 * We define here a global queue thanks to dedicated util from React Spectrum.
 * It is based on React `useSyncExternalStore` and allows us to consume data from
 * an external data store, and thus preventing use of React context that could
 * lead to unwanted rerenderings. It also simplifies initial implementation.
 */
let GLOBAL_SNACKBAR_QUEUE: ToastQueue<SnackbarItemValue> | null = null

const getGlobalSnackBarQueue = () => {
  if (!GLOBAL_SNACKBAR_QUEUE) {
    GLOBAL_SNACKBAR_QUEUE = new ToastQueue({
      maxVisibleToasts: 1,
      hasExitAnimation: true,
    })
  }

  return GLOBAL_SNACKBAR_QUEUE
}

export const clearSnackbarQueue = () => {
  GLOBAL_SNACKBAR_QUEUE = null
}

/**
 * We define a global store to keep track of all providers instances, to ensure
 * we always have a single Snackbar container.
 */
const GLOBAL_SNACKBAR_STORE = {
  providers: new Set<RefObject<HTMLDivElement | null>>(),
  subscriptions: new Set<() => void>(),
}

export type SnackbarProps = Omit<SnackbarRegionProps, 'state'> & {
  ref?: Ref<HTMLDivElement>
}

export const Snackbar = ({ ref: forwardedRef, ...props }: SnackbarProps): ReactElement | null => {
  const ref = useRef<HTMLDivElement>(null)

  const state = useToastQueue(getGlobalSnackBarQueue())

  const { provider, addProvider, deleteProvider } = useSnackbarGlobalStore(GLOBAL_SNACKBAR_STORE)

  useEffect(() => {
    addProvider(ref)

    return () => {
      for (const toast of getGlobalSnackBarQueue().visibleToasts) {
        toast.animation = undefined
      }

      deleteProvider(ref)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ref === provider && state.visibleToasts.length > 0
    ? createPortal(<SnackbarRegion ref={forwardedRef} state={state} {...props} />, document.body)
    : null
}

Snackbar.displayName = 'Snackbar'

export interface AddSnackbarArgs extends SnackbarItemValue, Omit<SnackBarItemOptions, 'timeout'> {
  /**
   * Handler that is called when the snackbar is closed, either by the user
   * or after a timeout.
   */
  onClose?: () => void
  /**
   * A timeout to automatically close the snackbar after, in milliseconds.
   * @default 5000
   */
  timeout?: number | null
  /**
   * The priority of the snackbar relative to other snackbars. Larger numbers indicate higher priority.
   */
  priority?: number
}

export const addSnackbar = ({ onClose, timeout = 5000, priority, ...content }: AddSnackbarArgs) => {
  const queue = getGlobalSnackBarQueue()

  queue.add(content, {
    onClose,
    timeout: timeout && !content.onAction ? Math.max(timeout, 5000) : undefined,
    priority,
  })
}
