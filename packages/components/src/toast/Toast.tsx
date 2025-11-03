import { Toast as BaseToast } from '@base-ui-components/react/toast'
import { Button, ButtonProps } from '@spark-ui/components/button'
import { Icon } from '@spark-ui/components/icon'
import { IconButton } from '@spark-ui/components/icon-button'
import { Close } from '@spark-ui/icons/Close'
import { cx } from 'class-variance-authority'

import { toastStyles } from './Toast.styles'
import type { ToastData, ToastDesign, ToastIntent, ToastObject } from './types'

function getButtonIntent(intent?: ToastIntent): ButtonProps['intent'] {
  if (intent === 'surfaceInverse') return 'surface'
  if (intent === 'surface') return 'surfaceInverse'
  if (intent === 'error') return 'danger'

  return intent as ButtonProps['intent']
}

function getCloseButtonIntent(intent?: ToastIntent): ButtonProps['intent'] {
  if (intent === 'surfaceInverse') return 'surfaceInverse'
  if (intent === 'surface') return 'surface'
  if (intent === 'error') return 'danger'

  return intent as ButtonProps['intent']
}

const getActionProps = (
  action: ToastData['action'],
  { toastDesign, toastIntent }: { toastDesign?: ToastDesign; toastIntent?: ToastIntent }
): ButtonProps => {
  if (!action) return {}

  const { design, intent, className, onClick, ...rest } = action

  return {
    design: design ?? (toastDesign === 'filled' ? 'tinted' : 'filled'),
    intent: intent ?? getButtonIntent(toastIntent),
    className: cx('mt-md self-end', className),
    onClick,
    ...rest,
  }
}

export function Toast({ toast }: { toast: ToastObject }) {
  const {
    icon: ToastIcon,
    intent = 'neutral',
    design = 'filled',
    action,
    isClosable,
    closeLabel = 'Close',
  } = toast.data ?? {}

  const ActionButton = action?.close ? BaseToast.Close : BaseToast.Action

  const actionProps = getActionProps(action, {
    toastDesign: design,
    toastIntent: intent,
  })

  return (
    <BaseToast.Root
      key={toast.id}
      swipeDirection={['down', 'right']}
      toast={toast}
      className={cx(
        toastStyles({
          design,
          intent,
        })
      )}
      style={{
        ['--gap' as string]: 'var(--spacing-md)',
        ['--offset-y' as string]:
          'calc(var(--toast-offset-y) * -1 + (var(--toast-index) * var(--gap) * -1) + var(--toast-swipe-movement-y))',
      }}
    >
      <div className="gap-sm flex flex-col">
        <div className="gap-lg flex items-center">
          {ToastIcon && <Icon size="md">{ToastIcon}</Icon>}
          <div className="gap-sm flex flex-col">
            <BaseToast.Title className={toast.description ? 'text-headline-2' : 'text-body-1'} />
            <BaseToast.Description className="text-body-1" />
          </div>
        </div>
        {action && <ActionButton render={<Button {...actionProps} />}>{action.label}</ActionButton>}
      </div>

      {isClosable && (
        <BaseToast.Close
          className="top-sm right-sm absolute"
          render={
            <IconButton
              aria-label={closeLabel}
              design={design}
              intent={getCloseButtonIntent(intent)}
              size="sm"
            />
          }
        >
          <Icon>
            <Close />
          </Icon>
        </BaseToast.Close>
      )}
    </BaseToast.Root>
  )
}
