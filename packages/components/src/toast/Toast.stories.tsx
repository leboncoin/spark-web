import { Button } from '@spark-ui/components/button'
import { AlertOutline } from '@spark-ui/icons/AlertOutline'
import { Meta, StoryFn } from '@storybook/react-vite'

import { ToastProvider, ToastTrigger, useToastManager } from '.'

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
  return (
    <ToastTrigger
      title="Toast with action"
      description="This toast contains an action button and can be closed. Use F6 to access it with the keyboard."
      icon={<AlertOutline />}
      action={{
        close: true,
        label: 'Cancel',
        onClick: () => console.log('Action canceled'),
      }}
      asChild
    >
      <Button>Open a toast</Button>
    </ToastTrigger>
  )
}

export const DesignAndIntents: StoryFn = () => {
  const intents = [
    'success',
    'alert',
    'error',
    'info',
    'neutral',
    'main',
    'basic',
    'support',
    'accent',
    'surface',
    'surfaceInverse',
  ]
  const designs = ['filled', 'tinted']

  return (
    <div className="gap-md flex flex-wrap">
      {intents.map(intent =>
        designs.map(design => {
          const buttonIntent = intent === 'error' ? 'danger' : intent

          return (
            <ToastTrigger
              key={`${intent}-${design}`}
              title={`Toast ${intent} ${design}`}
              description={'Some content'}
              intent={intent as any}
              design={design as any}
              action={{
                close: true,
                label: 'Cancel',
                onClick: () => console.log('Action canceled'),
              }}
              asChild
            >
              <Button intent={buttonIntent as any} design={design as any}>
                {intent} + {design}
              </Button>
            </ToastTrigger>
          )
        })
      )}
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
        loading: { title: 'Loading data...', data: { design: 'tinted' } },
        success: data => ({
          title: `Success: ${data}`,
          data: {
            intent: 'success',
            design: 'tinted',
          },
        }),
        error: (err: Error) => ({
          title: `Error: ${err.message}`,
          data: {
            intent: 'error',
            design: 'tinted',
          },
        }),
      }
    )
  }

  return <Button onClick={runPromise}>Run Promise Toast</Button>
}
