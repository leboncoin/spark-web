import { Toast as BaseToast } from '@base-ui-components/react/toast'
import { ButtonProps } from '@spark-ui/components/button'
import * as React from 'react'

export type ToastIntent =
  | 'main'
  | 'support'
  | 'accent'
  | 'basic'
  | 'success'
  | 'alert'
  | 'error'
  | 'info'
  | 'neutral'
  | 'surface'
  | 'surfaceInverse'

export type ToastDesign = 'tinted' | 'filled'

export interface ToastData {
  icon?: React.ReactNode
  design?: ToastDesign
  intent?: ToastIntent
  isClosable?: boolean
  closeLabel?: string
  action?: {
    close?: boolean
    label: string
    onClick: () => void
  } & ButtonProps
}

export type ToastObject = BaseToast.Root.ToastObject<ToastData>

interface AddOptions extends Omit<ToastObject, 'id' | 'animation' | 'height' | 'ref' | 'limited'> {
  id?: string
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
