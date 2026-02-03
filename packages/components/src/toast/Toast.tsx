import { Toast as BaseToast } from '@base-ui/react/toast'
import { Button, ButtonProps } from '@spark-ui/components/button'
import { Icon } from '@spark-ui/components/icon'
import { IconButton } from '@spark-ui/components/icon-button'
import { AlertFill } from '@spark-ui/icons/AlertFill'
import { Close } from '@spark-ui/icons/Close'
import { InfoFill } from '@spark-ui/icons/InfoFill'
import { ValidFill } from '@spark-ui/icons/ValidFill'
import { WarningFill } from '@spark-ui/icons/WarningFill'
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
    design: design ?? toastDesign,
    intent: intent ?? getButtonIntent(toastIntent),
    className: cx('ml-auto', className),
    onClick,
    ...rest,
  }
}

const getToastRootProps = (toast: ToastObject, design: ToastDesign, intent: ToastIntent) => ({
  swipeDirection: ['down', 'right'] as ['down', 'right'],
  toast,
  className: cx(toastStyles({ design, intent })),
  style: {
    ['--gap' as string]: 'var(--spacing-md)',
    ['--offset-y' as string]:
      'calc(var(--toast-offset-y) * -1 + (var(--toast-index) * var(--gap) * -1) + var(--toast-swipe-movement-y))',
  },
})

function getDefaultIcon(intent: ToastIntent): React.ReactNode {
  switch (intent) {
    case 'info':
      return <InfoFill />
    case 'success':
      return <ValidFill />
    case 'alert':
      return <WarningFill />
    case 'error':
      return <AlertFill />
    case 'main':
    case 'support':
    case 'accent':
    case 'basic':
    case 'neutral':
    case 'surface':
    case 'surfaceInverse':
    default:
      return <InfoFill />
  }
}

export function Toast({ toast }: { toast: ToastObject }) {
  const {
    icon: ToastIcon,
    intent = 'info',
    design: _design, // deprecated prop, ignored
    action,
    isClosable,
    closeLabel = 'Close',
    compact = false,
  } = toast.data ?? {}

  // Always use 'tinted' design regardless of prop value
  const design = 'tinted' as const

  const ActionButton = action?.close ? BaseToast.Close : BaseToast.Action
  const actionProps = getActionProps(action, { toastDesign: design, toastIntent: intent })
  const rootProps = getToastRootProps(toast, design, intent)

  // Use provided icon or default icon based on intent
  const icon = ToastIcon ?? getDefaultIcon(intent)

  const getCloseButton = (className?: string) => {
    if (!isClosable) return null

    return (
      <BaseToast.Close
        className={className}
        render={
          <IconButton
            aria-label={closeLabel}
            design={design}
            intent={getCloseButtonIntent(intent)}
            size="md"
          />
        }
      >
        <Icon>
          <Close />
        </Icon>
      </BaseToast.Close>
    )
  }

  const renderTitle = () => {
    // Check ToastData first for JSX, then fallback to toast.title (string)
    const title = toast.data?.title ?? toast.title
    const hasDescription = !!(toast.data?.description ?? toast.description)

    if (typeof title !== 'string' && title !== undefined) {
      return (
        <BaseToast.Title
          className={hasDescription ? 'text-headline-2' : 'text-body-1'}
          render={<div />}
        >
          {title}
        </BaseToast.Title>
      )
    }

    return <BaseToast.Title className={hasDescription ? 'text-headline-2' : 'text-body-1'} />
  }

  const renderDescription = () => {
    // Check ToastData first for JSX, then fallback to toast.description (string)
    const description = toast.data?.description ?? toast.description

    if (!description) return null

    if (typeof description !== 'string') {
      return (
        <BaseToast.Description className="text-body-1" render={<div />}>
          {description}
        </BaseToast.Description>
      )
    }

    return <BaseToast.Description className="text-body-1" />
  }

  return (
    <BaseToast.Root key={toast.id} {...rootProps}>
      <div className={cx('flex', compact ? 'gap-lg items-center' : 'gap-md flex-col')}>
        <div className="gap-lg p-md flex grow items-center">
          {/* Icon */}
          <Icon size="md">{icon}</Icon>
          {/* Title and description */}
          <div
            className={cx(
              'gap-sm flex flex-col',
              compact && 'flex-1',
              !compact && isClosable && 'pr-3xl'
            )}
          >
            {renderTitle()}
            {renderDescription()}
          </div>
        </div>

        <div className={cx('flex')}>
          {/* Action button */}
          {action && (
            <ActionButton render={<Button {...actionProps} />}>{action.label}</ActionButton>
          )}
          {/* Close button - compact layout only */}
          {compact && getCloseButton()}
        </div>

        {/* Close button - default layout only */}
        {!compact && getCloseButton('top-md right-md absolute')}
      </div>
    </BaseToast.Root>
  )
}
