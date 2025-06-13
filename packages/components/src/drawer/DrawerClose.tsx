import { Dialog as RadixDrawer } from 'radix-ui'
import { Ref } from 'react'

export type DrawerCloseProps = RadixDrawer.DialogCloseProps & {
  ref?: Ref<HTMLButtonElement>
}

export const DrawerClose = (props: DrawerCloseProps) => (
  <RadixDrawer.Close data-spark-component="drawer-close" {...props} />
)

DrawerClose.displayName = 'Drawer.Close'
