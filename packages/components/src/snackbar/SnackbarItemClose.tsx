import { Close } from '@spark-ui/icons/Close'
import { cx } from 'class-variance-authority'
import { type ComponentPropsWithRef } from 'react'

import { Icon } from '../icon'
import { IconButton, type IconButtonProps } from '../icon-button'
import type { SnackbarItemVariantProps } from './SnackbarItem.styles'
import { useSnackbarItemContext } from './SnackbarItemContext'

export interface SnackbarItemCloseProps
  extends Omit<ComponentPropsWithRef<'button'>, 'aria-label' | 'disabled'>,
    Pick<IconButtonProps, 'aria-label'>,
    SnackbarItemVariantProps {}

export const SnackbarItemClose = ({
  design: designProp = 'filled',
  intent: intentProp = 'neutral',
  'aria-label': ariaLabel,
  onClick,
  className,
  ref,
  ...rest
}: SnackbarItemCloseProps) => {
  const { toast, state } = useSnackbarItemContext()

  const intent = intentProp ?? toast.content.intent
  const design = designProp ?? toast.content.design

  return (
    <IconButton
      ref={ref}
      size="md"
      shape="rounded"
      {...(intent === 'inverse'
        ? {
            design: 'ghost',
            intent: 'surface',
          }
        : {
            design,
            intent: intent === 'error' ? 'danger' : intent,
          })}
      aria-label={ariaLabel}
      onClick={e => {
        onClick?.(e)
        state.close(toast.key)
      }}
      style={{ gridArea: 'close', ...rest.style }}
      className={cx('ml-md justify-self-end', className)}
      {...rest}
    >
      <Icon size="sm">
        <Close />
      </Icon>
    </IconButton>
  )
}

SnackbarItemClose.displayName = 'Snackbar.ItemClose'
