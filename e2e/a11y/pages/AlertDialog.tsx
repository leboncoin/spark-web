import { AlertDialog } from '@spark-ui/components/alert-dialog'
import { Button } from '@spark-ui/components/button'
import React from 'react'

export const A11yAlertDialog = () => (
  <section>
    <AlertDialog defaultOpen>
      <AlertDialog.Trigger render={<Button intent="danger" />}>
        Delete
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay />

        <AlertDialog.Content>
          <AlertDialog.Header>
            <AlertDialog.Title>Delete account</AlertDialog.Title>
          </AlertDialog.Header>

          <AlertDialog.Body>
            <AlertDialog.Description>
              Are you sure? You can not undo this action afterwards.
            </AlertDialog.Description>
          </AlertDialog.Body>

          <AlertDialog.Footer className="gap-md flex justify-end">
            <AlertDialog.Cancel render={<Button intent="neutral" design="ghost" />}>
              Cancel
            </AlertDialog.Cancel>

            <AlertDialog.Action render={<Button intent="danger" />}>
              Delete
            </AlertDialog.Action>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  </section>
)
