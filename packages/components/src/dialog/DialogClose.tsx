import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { ComponentProps, Ref } from 'react'

export interface CloseProps extends ComponentProps<typeof BaseDialog.Close> {
  ref?: Ref<HTMLButtonElement>
}

export const Close = (props: CloseProps) => {
  return <BaseDialog.Close data-spark-component="dialog-close" {...props} />
}
