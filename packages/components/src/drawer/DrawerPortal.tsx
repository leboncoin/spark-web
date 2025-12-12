import { Dialog as BaseDialog } from '@base-ui-components/react/dialog'
import { ComponentProps } from 'react'

export type DrawerPortalProps = ComponentProps<typeof BaseDialog.Portal>

export const DrawerPortal = (props: DrawerPortalProps) => {
  return <BaseDialog.Portal data-spark-component="drawer-portal" {...props} />
}

DrawerPortal.displayName = 'Drawer.Portal'
