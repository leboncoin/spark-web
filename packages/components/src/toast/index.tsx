import { Toast as BaseToast } from '@base-ui-components/react/toast'
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

export function ToastProvider({ children, limit = 3 }: ToastProviderProps) {
  return (
    <BaseToast.Provider limit={limit}>
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
  extends React.ComponentPropsWithRef<'button'>,
    Pick<ToastObject, 'priority'>,
    Pick<ToastData, 'design' | 'intent' | 'icon' | 'isClosable' | 'action'> {
  children: React.ReactNode
  asChild?: boolean
  title: string
  description?: string
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
  priority = 'low',
}: ToastTriggerProps) {
  const toastManager = BaseToast.useToastManager()

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
      },
    })
  }

  return (
    <Component {...(!asChild && { type: 'button' })} onClick={createToast}>
      {children}
    </Component>
  )
}

export { useToastManager }
