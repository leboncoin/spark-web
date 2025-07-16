import { QueuedToast, ToastState } from '@react-stately/toast'
import { createContext, useContext } from 'react'

import type { SnackbarItemValue } from './SnackbarItem'

export interface SnackbarItemState<T = SnackbarItemValue> {
  toast: QueuedToast<T>
  state: ToastState<T>
}

export const SnackbarItemContext = createContext<SnackbarItemState>({} as SnackbarItemState)

export const useSnackbarItemContext = () => useContext(SnackbarItemContext)
