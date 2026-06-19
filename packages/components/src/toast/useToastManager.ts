import { Toast as BaseToast } from '@base-ui/react/toast'
import * as React from 'react'

import type { UseToastManagerReturnValue } from './types'

export function useToastManager(): UseToastManagerReturnValue {
  const manager = BaseToast.useToastManager()
  const managerRef = React.useRef(manager)
  managerRef.current = manager

  return React.useMemo(
    () => ({
      get toasts() {
        return managerRef.current.toasts
      },
      add: options => managerRef.current.add(options),
      update: (id, options) => managerRef.current.update(id, options),
      close: id => managerRef.current.close(id),
      promise: (p, options) => managerRef.current.promise(p, options),
      closeAll: () => managerRef.current.toasts.forEach(({ id }) => managerRef.current.close(id)),
    }),
    []
  )
}
