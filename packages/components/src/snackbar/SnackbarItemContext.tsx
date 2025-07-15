import { createContext, useContext } from 'react'

import { QueuedToast, ToastState } from './local-toast'
import type { SnackbarItemValue } from './SnackbarItem'

export interface SnackbarItemState<T = SnackbarItemValue> {
  toast: QueuedToast<T>
  state: ToastState<T>
}

export const SnackbarItemContext = createContext<SnackbarItemState>({} as SnackbarItemState)

export const useSnackbarItemContext = () => useContext(SnackbarItemContext)
