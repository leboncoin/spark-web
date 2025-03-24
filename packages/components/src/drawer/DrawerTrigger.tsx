import { Dialog as RadixDrawer } from 'radix-ui'
import { type ReactElement, Ref } from 'react'

export interface DrawerTriggerProps extends RadixDrawer.DialogTriggerProps {
  /**
   * Change the component to the HTML tag or custom component of the only child. This will merge the original component props with the props of the supplied element/component and change the underlying DOM node.
   */
  asChild?: boolean
  ref?: Ref<HTMLButtonElement>
}

export const DrawerTrigger = (props: DrawerTriggerProps): ReactElement => (
  <RadixDrawer.Trigger {...props} />
)

DrawerTrigger.displayName = 'Drawer.Trigger'
