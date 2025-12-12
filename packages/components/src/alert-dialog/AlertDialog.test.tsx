import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vitest } from 'vitest'

import { AlertDialog } from '.'

describe('AlertDialog', () => {
  it('should render', async () => {
    render(
      <AlertDialog defaultOpen>
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

            <AlertDialog.Footer>
              <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
              <AlertDialog.Action>Delete</AlertDialog.Action>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog>
    )

    const dialogEl = screen.getByRole('alertdialog', { name: 'Delete account' })

    expect(dialogEl).toBeInTheDocument()
    expect(dialogEl).toHaveAccessibleDescription(
      'Are you sure? You can not undo this action afterwards.'
    )
    expect(within(dialogEl).getByRole('button', { name: 'Cancel' }))
    expect(within(dialogEl).getByRole('button', { name: 'Delete' }))
  })

  it('should change open in uncontrolled mode', async () => {
    const user = userEvent.setup()
    const onOpenChange = vitest.fn()
    const onClick = vitest.fn()

    render(
      <AlertDialog defaultOpen onOpenChange={onOpenChange}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay />
          <AlertDialog.Content>
            <AlertDialog.Title>Delete account</AlertDialog.Title>

            <AlertDialog.Cancel onClick={onClick}>Cancel</AlertDialog.Cancel>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog>
    )

    const dialogEl = screen.getByRole('alertdialog', { name: 'Delete account' })

    expect(dialogEl).toBeInTheDocument()

    await user.click(within(dialogEl).getByRole('button', { name: 'Cancel' }))

    expect(dialogEl).not.toBeInTheDocument()
    expect(onOpenChange).toHaveBeenCalledWith(false)
    expect(onClick).toHaveBeenCalled()
  })

  it('should change open in controlled mode', async () => {
    const user = userEvent.setup()
    const onOpenChange = vitest.fn()
    const onClick = vitest.fn()

    render(
      <AlertDialog open onOpenChange={onOpenChange}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay />
          <AlertDialog.Content>
            <AlertDialog.Title>Delete account</AlertDialog.Title>

            <AlertDialog.Cancel onClick={onClick}>Cancel</AlertDialog.Cancel>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog>
    )

    const dialogEl = screen.getByRole('alertdialog', { name: 'Delete account' })

    expect(dialogEl).toBeInTheDocument()

    await user.click(within(dialogEl).getByRole('button', { name: 'Cancel' }))

    expect(onOpenChange).toHaveBeenCalledWith(false)
    expect(onClick).toHaveBeenCalled()
  })

  it('should open when trigger is clicked', async () => {
    const user = userEvent.setup()

    render(
      <AlertDialog>
        <AlertDialog.Trigger>Delete</AlertDialog.Trigger>

        <AlertDialog.Portal>
          <AlertDialog.Overlay />
          <AlertDialog.Content>
            <AlertDialog.Title>Delete account</AlertDialog.Title>

            <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog>
    )

    expect(screen.queryByRole('alertdialog', { name: 'Delete account' })).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Delete' }))

    const dialogEl = screen.getByRole('alertdialog', { name: 'Delete account' })

    expect(dialogEl).toBeInTheDocument()
  })

  it('should close when action button is clicked', async () => {
    const user = userEvent.setup()
    const onClick = vitest.fn()

    render(
      <AlertDialog defaultOpen>
        <AlertDialog.Portal>
          <AlertDialog.Overlay />

          <AlertDialog.Content>
            <AlertDialog.Title>Delete account</AlertDialog.Title>

            <AlertDialog.Footer>
              <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
              <AlertDialog.Action onClick={onClick}>Delete</AlertDialog.Action>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog>
    )

    expect(screen.getByRole('alertdialog', { name: 'Delete account' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Delete' }))

    expect(screen.queryByRole('alertdialog', { name: 'Delete account' })).not.toBeInTheDocument()
    expect(onClick).toHaveBeenCalled()
  })

  it('should close when esc is pressed', async () => {
    const onOpenChange = vitest.fn()

    render(
      <AlertDialog defaultOpen onOpenChange={onOpenChange}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay />

          <AlertDialog.Content>
            <AlertDialog.Title>Delete account</AlertDialog.Title>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog>
    )

    expect(screen.getByRole('alertdialog', { name: 'Delete account' })).toBeInTheDocument()

    fireEvent.keyDown(document.activeElement as Element, { key: 'Escape' })

    expect(screen.queryByRole('alertdialog', { name: 'Delete account' })).not.toBeInTheDocument()
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('should not close when is clicked outside', async () => {
    const user = userEvent.setup()
    const onOpenChange = vitest.fn()

    render(
      <AlertDialog defaultOpen onOpenChange={onOpenChange}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay />

          <AlertDialog.Content>
            <AlertDialog.Title>Delete account</AlertDialog.Title>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog>
    )

    expect(screen.getByRole('alertdialog', { name: 'Delete account' })).toBeInTheDocument()

    // Click outside the dialog
    await user.click(document.body)

    // Dialog should still be open (alert dialogs don't close on outside click)
    expect(screen.getByRole('alertdialog', { name: 'Delete account' })).toBeInTheDocument()
    expect(onOpenChange).not.toHaveBeenCalled()
  })

  it('should focus on less destructive action when is opened', async () => {
    render(
      <AlertDialog defaultOpen>
        <AlertDialog.Portal>
          <AlertDialog.Overlay />

          <AlertDialog.Content>
            <AlertDialog.Title>Delete account</AlertDialog.Title>

            <AlertDialog.Footer>
              <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
              <AlertDialog.Action>Delete</AlertDialog.Action>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog>
    )

    const cancelButton = within(screen.getByRole('alertdialog', { name: 'Delete account' })).getByRole(
      'button',
      {
        name: 'Cancel',
      }
    )

    // Wait for focus to be set
    await waitFor(() => {
      expect(cancelButton).toHaveFocus()
    })
  })

  it('should focus the trigger when is closed', async () => {
    const user = userEvent.setup()

    render(
      <AlertDialog defaultOpen>
        <AlertDialog.Trigger>Delete</AlertDialog.Trigger>

        <AlertDialog.Portal>
          <AlertDialog.Overlay />
          <AlertDialog.Content>
            <AlertDialog.Title>Delete account</AlertDialog.Title>

            <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog>
    )

    await user.click(
      within(screen.getByRole('alertdialog', { name: 'Delete account' })).getByRole('button', {
        name: 'Cancel',
      })
    )

    expect(screen.getByRole('button', { name: 'Delete' })).toHaveFocus()
  })
})
