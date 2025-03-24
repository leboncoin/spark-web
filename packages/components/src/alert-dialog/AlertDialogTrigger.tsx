import { Ref } from 'react'

import { Dialog, DialogTriggerProps } from '../dialog'

export type AlertDialogTriggerProps = DialogTriggerProps & {
  ref?: Ref<HTMLButtonElement>
}

export const AlertDialogTrigger = (props: AlertDialogTriggerProps) => {
  return <Dialog.Trigger data-spark-component="alert-dialog-title" {...props} />
}

AlertDialogTrigger.displayName = 'AlertDialog.Trigger'
