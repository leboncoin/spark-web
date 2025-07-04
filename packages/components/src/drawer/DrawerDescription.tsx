import { Dialog as RadixDrawer } from 'radix-ui'
import { Ref } from 'react'

export type DrawerDescriptionProps = RadixDrawer.DialogDescriptionProps & {
  ref?: Ref<HTMLParagraphElement>
}

export const DrawerDescription = (props: DrawerDescriptionProps) => (
  <RadixDrawer.Description data-spark-component="drawer-description" {...props} />
)

DrawerDescription.displayName = 'Drawer.Description'
