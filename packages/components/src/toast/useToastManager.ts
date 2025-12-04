import { Toast as BaseToast } from '@base-ui-components/react/toast'
import * as React from 'react'

import type { UseToastManagerReturnValue } from './types'

export function useToastManager(): UseToastManagerReturnValue {
  const baseToastManager = BaseToast.useToastManager()

  const closeAll = React.useCallback((): void => {
    baseToastManager.toasts.forEach(({ id }) => baseToastManager.close(id))
  }, [baseToastManager])

  return {
    ...baseToastManager,
    closeAll,
  } as UseToastManagerReturnValue
}
