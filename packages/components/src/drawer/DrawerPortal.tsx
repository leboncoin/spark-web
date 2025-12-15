import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { cx } from 'class-variance-authority'
import { ComponentProps } from 'react'

export type DrawerPortalProps = ComponentProps<typeof BaseDialog.Portal>

export const DrawerPortal = ({ className, ...props }: DrawerPortalProps) => {
  return (
    <BaseDialog.Portal
      data-spark-component="drawer-portal"
      className={cx(className, 'z-modal absolute')}
      {...props}
    />
  )
}

DrawerPortal.displayName = 'Drawer.Portal'
