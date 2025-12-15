import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { ComponentProps, Ref } from 'react'

import { useRenderSlot } from '../drawer/useRenderSlot'

export interface CloseProps extends Omit<ComponentProps<typeof BaseDialog.Close>, 'render'> {
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
  asChild?: boolean
  ref?: Ref<HTMLButtonElement>
}

export const Close = ({ asChild = false, ...props }: CloseProps) => {
  const renderSlot = useRenderSlot(asChild, 'button')

  return <BaseDialog.Close data-spark-component="dialog-close" render={renderSlot} {...props} />
}
