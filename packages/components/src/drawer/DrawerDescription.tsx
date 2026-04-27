import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { ComponentProps, Ref } from 'react'

export interface DrawerDescriptionProps extends Omit<
  ComponentProps<typeof BaseDialog.Description>,
  'render'
> {
  ref?: Ref<HTMLParagraphElement>
}

/**
 * A paragraph with additional information about the drawer. Renders a <p> element.
 */
export const DrawerDescription = (props: DrawerDescriptionProps) => {
  return <BaseDialog.Description data-spark-component="drawer-description" {...props} />
}

DrawerDescription.displayName = 'Drawer.Description'
