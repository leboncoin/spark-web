import { Toast as BaseToast } from '@base-ui/react/toast'
import * as React from 'react'

import type { UseToastManagerReturnValue } from './types'

export function useToastManager(): UseToastManagerReturnValue {
  const baseToastManager = BaseToast.useToastManager()

  const closeAll = React.useCallback((): void => {
    baseToastManager.toasts.forEach(({ id }) => baseToastManager.close(id))
  }, [baseToastManager])

  // Memoize the returned object so its reference is stable across renders,
  // preventing infinite loops when used as a useEffect dependency.
  return React.useMemo(
    () => ({ ...baseToastManager, closeAll }) as UseToastManagerReturnValue,
    [baseToastManager, closeAll]
  )
}
