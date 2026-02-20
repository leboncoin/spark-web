import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { ComponentProps, Ref } from 'react'

export interface DrawerCloseProps extends ComponentProps<typeof BaseDialog.Close> {
  ref?: Ref<HTMLButtonElement>
}

export const DrawerClose = (props: DrawerCloseProps) => {
  return <BaseDialog.Close data-spark-component="drawer-close" {...props} />
}

DrawerClose.displayName = 'Drawer.Close'
