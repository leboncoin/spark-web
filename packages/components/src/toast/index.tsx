import { Toast as BaseToast } from '@base-ui/react/toast'
import { Slot } from '@spark-ui/components/slot'
import { cx } from 'class-variance-authority'
import * as React from 'react'

import { Toast } from './Toast'
import type { ToastData, ToastObject } from './types'
import { useToastManager } from './useToastManager'

export * from './types'

function ToastList() {
  const { toasts } = useToastManager()

  return toasts.map(toast => <Toast key={toast.id} toast={toast} />)
}

interface ToastProviderProps extends React.ComponentProps<typeof BaseToast.Provider> {
  children: React.ReactNode
}

export function ToastProvider({ children, limit = 3, ...props }: ToastProviderProps) {
  return (
    <BaseToast.Provider limit={limit} {...props}>
      <BaseToast.Portal>
        <BaseToast.Viewport
          className={cx(
            'z-toast right-lg bottom-lg text-on-surfa- fixed top-auto mx-auto flex w-fit flex-col items-end'
          )}
        >
          <ToastList />
        </BaseToast.Viewport>
      </BaseToast.Portal>
      {children}
    </BaseToast.Provider>
  )
}

interface ToastTriggerProps
  extends Omit<React.ComponentPropsWithRef<'button'>, 'title'>,
    Pick<ToastObject, 'priority'>,
    Pick<ToastData, 'design' | 'intent' | 'icon' | 'isClosable' | 'action' | 'compact'> {
  children: React.ReactNode
  asChild?: boolean
  title: string | React.ReactNode
  description?: string | React.ReactNode
  timeout?: number
}

export function ToastTrigger({
  children,
  onClick,
  asChild = false,
  title,
  description,
  timeout = 5000,
  design = 'filled',
  intent = 'neutral',
  isClosable = true,
  icon,
  action,
  compact,
  priority = 'low',
}: ToastTriggerProps) {
  const toastManager = useToastManager()

  const Component = asChild ? Slot : 'button'

  function createToast(e: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(e)
    toastManager.add({
      title,
      description,
      timeout,
      priority,
      data: {
        design,
        intent,
        isClosable,
        ...(icon && { icon }),
        action,
        ...(compact !== undefined && { compact }),
      },
    })
  }

  return (
    <Component {...(!asChild && { type: 'button' })} onClick={createToast}>
      {children}
    </Component>
  )
}

export type ToastManager = ReturnType<typeof BaseToast.createToastManager>

export const createToastManager: () => ToastManager = BaseToast.createToastManager

export { useToastManager }
