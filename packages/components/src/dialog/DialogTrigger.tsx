import { Dialog as RadixDialog } from 'radix-ui'
import { type ReactElement, ReactNode, Ref } from 'react'

export interface TriggerProps {
  /**
   * Children of the component.
   */
  children?: ReactNode
  /**
   * Change the component to the HTML tag or custom component of the only child.
   */
  asChild?: RadixDialog.DialogTriggerProps['asChild']
  ref?: Ref<HTMLButtonElement>
}

export const Trigger = (props: TriggerProps): ReactElement => <RadixDialog.Trigger {...props} />

Trigger.displayName = 'Dialog.Trigger'
