import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { cx } from 'class-variance-authority'
import { ComponentProps } from 'react'

export type PortalProps = ComponentProps<typeof BaseDialog.Portal>

export const Portal = ({ className, ...props }: PortalProps) => {
  return (
    <BaseDialog.Portal
      data-spark-component="dialog-portal"
      className={cx(className, 'z-modal absolute')}
      {...props}
    />
  )
}

Portal.displayName = 'Dialog.Portal'
