import { Ref } from 'react'

import { Dialog, DialogTitleProps } from '../dialog'

export type AlertDialogTitleProps = DialogTitleProps & {
  ref?: Ref<HTMLParagraphElement>
}

export const AlertDialogTitle = (props: AlertDialogTitleProps) => {
  return <Dialog.Title data-spark-component="alert-dialog-title" {...props} />
}

AlertDialogTitle.displayName = 'AlertDialog.Title'
