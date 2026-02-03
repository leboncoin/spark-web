import { Toast as BaseToast } from '@base-ui/react/toast'
import { ButtonProps } from '@spark-ui/components/button'
import * as React from 'react'

export type ToastIntent =
  | /** @deprecated Use 'info', 'success', 'alert', or 'error' instead */ 'main'
  | /** @deprecated Use 'info', 'success', 'alert', or 'error' instead */ 'support'
  | /** @deprecated Use 'info', 'success', 'alert', or 'error' instead */ 'accent'
  | /** @deprecated Use 'info', 'success', 'alert', or 'error' instead */ 'basic'
  | 'success'
  | 'alert'
  | 'error'
  | 'info'
  | /** @deprecated Use 'info', 'success', 'alert', or 'error' instead */ 'neutral'
  | /** @deprecated Use 'info', 'success', 'alert', or 'error' instead */ 'surface'
  | /** @deprecated Use 'info', 'success', 'alert', or 'error' instead */ 'surfaceInverse'

export type ToastDesign = 'tinted' | 'filled'

export interface ToastData {
  icon?: React.ReactNode
  /**
   * @deprecated The design prop is deprecated. All toasts now use the 'tinted' design.
   */
  design?: ToastDesign
  intent?: ToastIntent
  isClosable?: boolean
  closeLabel?: string
  compact?: boolean
  title?: React.ReactNode
  description?: React.ReactNode
  action?: {
    close?: boolean
    label: string
    onClick: () => void
  } & ButtonProps
}

export type ToastObject = BaseToast.Root.ToastObject<ToastData>

export interface AddOptions
  extends Omit<
    ToastObject,
    'id' | 'animation' | 'height' | 'ref' | 'limited' | 'title' | 'description'
  > {
  id?: string
  title?: string | React.ReactNode
  description?: string | React.ReactNode
}

type UpdateOptions = Partial<AddOptions>

interface PromiseOptions<Value> {
  loading: string | UpdateOptions
  success: string | UpdateOptions | ((result: Value) => string | UpdateOptions)
  error: string | UpdateOptions | ((error: any) => string | UpdateOptions)
}

// extends Omit<BaseToast.useToastManager.ReturnValue, 'promise'>
export interface UseToastManagerReturnValue {
  toasts: ToastObject[]
  add: (options: AddOptions) => string
  update: (toastId: string, options: UpdateOptions) => void
  close: (toastId: string) => void
  promise: <Value>(promise: Promise<Value>, options: PromiseOptions<Value>) => Promise<Value>
  closeAll: () => void
}
