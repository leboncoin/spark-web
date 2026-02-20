import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { ComponentProps, Ref } from 'react'

export interface DrawerTriggerProps extends ComponentProps<typeof BaseDialog.Trigger> {
  ref?: Ref<HTMLButtonElement>
}

export const DrawerTrigger = (props: DrawerTriggerProps) => {
  return <BaseDialog.Trigger data-spark-component="drawer-trigger" {...props} />
}

DrawerTrigger.displayName = 'Drawer.Trigger'
