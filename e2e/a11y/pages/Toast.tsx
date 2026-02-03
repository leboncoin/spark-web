import { ToastProvider, useToastManager } from '@spark-ui/components/toast'
import React, { useEffect } from 'react'

const ToastExample = () => {
  const toastManager = useToastManager()

  useEffect(() => {
    toastManager.add({
      title: 'Toast notification',
      description: 'This is a toast notification with default icon based on intent.',
      timeout: 0,
      data: {
        intent: 'info',
        isClosable: true,
      },
    })
  }, [toastManager])

  return null
}

export const A11yToast = () => (
  <section>
    <ToastProvider>
      <ToastExample />
    </ToastProvider>
  </section>
)
