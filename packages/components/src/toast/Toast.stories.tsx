import { Button } from '@spark-ui/components/button'
import { Check } from '@spark-ui/icons/Check'
import { Meta, StoryFn } from '@storybook/react-vite'

import { ToastProvider, useToastManager } from '.'

const meta: Meta<typeof ToastProvider> = {
  title: 'Components/Toast',
  component: ToastProvider,
  tags: ['data-display'],
  decorators: [
    Story => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
}

export default meta

export const Default: StoryFn = () => {
  const toastManager = useToastManager()

  const openToast = () => {
    toastManager.add({
      title: 'Toast with action',
      description:
        'This toast contains an action button and can be closed. Use F6 to access it with the keyboard.',
      timeout: 5000,
      data: {
        isClosable: true,
        intent: 'info',
        action: {
          close: true,
          label: 'Cancel',
          onClick: () => console.log('Action canceled'),
        },
      },
    })
  }

  return <Button onClick={openToast}>Open a toast</Button>
}

export const DesignAndIntents: StoryFn = () => {
  const toastManager = useToastManager()

  const intents = ['info', 'success', 'alert', 'error']

  const openToast = (intent: string) => {
    toastManager.add({
      title: `Toast ${intent}`,
      description: 'Some content',
      timeout: 5000,
      data: {
        isClosable: true,
        intent: intent as any,
        action: {
          close: true,
          label: 'Cancel',
          onClick: () => console.log('Action canceled'),
        },
      },
    })
  }

  return (
    <div className="gap-md flex flex-wrap">
      {intents.map(intent => {
        const buttonIntent = intent === 'error' ? 'danger' : intent

        return (
          <Button key={intent} intent={buttonIntent as any} onClick={() => openToast(intent)}>
            {intent}
          </Button>
        )
      })}
    </div>
  )
}

export const ToastManager: StoryFn = () => {
  const toastManager = useToastManager()

  const toggleToast = () => {
    if (toastManager.toasts.length === 0) {
      const newToastId = toastManager.add({
        title: 'Hello world!',
        description: 'This toast will close in 5s',
        timeout: 0,
        data: {
          intent: 'accent',
        },
      })

      let countdown = 5
      const id = setInterval(() => {
        countdown--
        if (countdown > 0) {
          toastManager.update(newToastId, {
            description: `This toast will close in ${countdown}s`,
          })
        } else {
          toastManager.close(newToastId)
          clearInterval(id)
        }
      }, 1000)
    }
  }

  return (
    <div>
      <Button onClick={toggleToast}>Open toast</Button>
    </div>
  )
}

export const WithPromise: StoryFn = () => {
  const toastManager = useToastManager()

  function runPromise() {
    toastManager.promise<string>(
      // Simulate an API request with a promise that resolves after 2 seconds
      new Promise((resolve, reject) => {
        const shouldSucceed = Math.random() > 0.3 // 70% success rate
        setTimeout(() => {
          if (shouldSucceed) {
            resolve('operation completed')
          } else {
            reject(new Error('operation failed'))
          }
        }, 2000)
      }),
      {
        loading: { title: 'Loading data...' },
        success: data => ({
          title: `Success: ${data}`,
          data: {
            intent: 'success',
          },
        }),
        error: (err: Error) => ({
          title: `Error: ${err.message}`,
          data: {
            intent: 'error',
          },
        }),
      }
    )
  }

  return <Button onClick={runPromise}>Run Promise Toast</Button>
}

export const Compact: StoryFn = () => {
  const toastManager = useToastManager()

  const openCompactToast = () => {
    toastManager.add({
      title: 'Compact toast',
      description: 'This toast uses the compact layout with inline action and close buttons.',
      timeout: 0,
      data: {
        isClosable: true,
        compact: true,
        intent: 'success',
        action: {
          close: true,
          label: 'Undo',
          onClick: () => console.log('Action clicked'),
        },
      },
    })
  }

  const openDefaultToast = () => {
    toastManager.add({
      title: 'Default toast',
      description: 'This toast uses the default layout with action button below.',
      timeout: 0,
      data: {
        isClosable: true,
        intent: 'success',
        action: {
          close: true,
          label: 'Undo',
          onClick: () => console.log('Action clicked'),
        },
      },
    })
  }

  return (
    <div className="gap-md flex">
      <Button onClick={openCompactToast}>Open Compact Toast</Button>
      <Button onClick={openDefaultToast}>Open Default Toast</Button>
    </div>
  )
}

export const WithJSX: StoryFn = () => {
  const toastManager = useToastManager()

  const openToastWithJSX = () => {
    toastManager.add({
      title: (
        <>
          <span>Payment</span>
          <span className="text-accent"> processed</span>
        </>
      ),
      description: (
        <span>
          Your payment of <strong>€29.99</strong> has been processed successfully.
        </span>
      ),
      timeout: 0,
      data: {
        isClosable: true,
        intent: 'success',
      },
    })
  }

  return <Button onClick={openToastWithJSX}>Open toast with JSX</Button>
}

export const CustomIcon: StoryFn = () => {
  const toastManager = useToastManager()

  const openToastWithDefaultIcon = () => {
    toastManager.add({
      title: 'Default icon',
      description: 'This toast uses the default icon for the success intent (ValidFill).',
      timeout: 5000,
      data: {
        isClosable: true,
        intent: 'success',
      },
    })
  }

  const openToastWithCustomIcon = () => {
    toastManager.add({
      title: 'Custom icon',
      description: 'This toast overrides the default icon with a custom one (Check).',
      timeout: 5000,
      data: {
        isClosable: true,
        intent: 'success',
        icon: <Check />,
      },
    })
  }

  return (
    <div className="gap-md flex flex-wrap">
      <Button onClick={openToastWithDefaultIcon}>Default Icon</Button>
      <Button onClick={openToastWithCustomIcon}>Custom Icon</Button>
    </div>
  )
}
