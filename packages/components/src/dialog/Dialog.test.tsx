import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vitest } from 'vitest'

import { Button } from '../button'
import { Dialog } from '.'

describe('Dialog', () => {
  it('should render', async () => {
    render(
      <Dialog defaultOpen>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Delete account</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <Dialog.Description>
                Are you sure? You can not undo this action afterwards.
              </Dialog.Description>
            </Dialog.Body>

            <Dialog.Footer>
              <Button>Cancel</Button>
              <Button>Confirm</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    )

    const dialogEl = screen.getByRole('dialog', { name: 'Delete account' })

    expect(dialogEl).toBeInTheDocument()
    expect(dialogEl).toHaveAccessibleDescription(
      'Are you sure? You can not undo this action afterwards.'
    )
    expect(within(dialogEl).getByRole('button', { name: 'Cancel' }))
    expect(within(dialogEl).getByRole('button', { name: 'Confirm' }))
  })

  it('should open dialog', async () => {
    const user = userEvent.setup()

    render(
      <Dialog>
        <Dialog.Trigger asChild>
          <button>Edit profile</button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Edit profile</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <Dialog.Description>
                Make changes to your profile here. Click save when you are done.
              </Dialog.Description>

              <p>Dialog contents</p>
            </Dialog.Body>

            <Dialog.Footer>
              <Button>Cancel</Button>
              <Button>Confirm</Button>
            </Dialog.Footer>

            <Dialog.CloseButton aria-label="Close edit profile" />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    )

    expect(screen.queryByText('Dialog contents')).not.toBeInTheDocument()

    await user.click(screen.getByText('Edit profile'))

    expect(screen.getByText('Dialog contents')).toBeInTheDocument()
  })

  it('should change open in controlled mode', async () => {
    const user = userEvent.setup()
    const onOpenChange = vitest.fn()

    render(
      <Dialog open onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Edit profile</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <Dialog.Description>
                Make changes to your profile here. Click save when you are done.
              </Dialog.Description>

              <p>Dialog contents</p>
            </Dialog.Body>

            <Dialog.Footer>
              <Button>Cancel</Button>
              <Button>Confirm</Button>
            </Dialog.Footer>

            <Dialog.CloseButton aria-label="Close" />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    )

    const dialogEl = screen.getByRole('dialog', { name: 'Edit profile' })

    expect(dialogEl).toBeInTheDocument()

    await user.click(within(dialogEl).getByRole('button', { name: 'Close' }))

    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('should close when esc is pressed', async () => {
    const onEscapeKeyDown = vitest.fn()

    render(
      <Dialog defaultOpen>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content onEscapeKeyDown={onEscapeKeyDown}>
            <Dialog.Header>
              <Dialog.Title>Edit profile</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <Dialog.Description>
                Make changes to your profile here. Click save when you are done.
              </Dialog.Description>

              <p>Dialog contents</p>
            </Dialog.Body>

            <Dialog.Footer>
              <Button>Cancel</Button>
              <Button>Confirm</Button>
            </Dialog.Footer>

            <Dialog.CloseButton aria-label="Close" />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    )

    expect(screen.getByRole('dialog', { name: 'Edit profile' })).toBeInTheDocument()

    fireEvent.keyDown(document.activeElement as Element, { key: 'Escape' })

    expect(screen.queryByRole('dialog', { name: 'Edit profile' })).not.toBeInTheDocument()
    expect(onEscapeKeyDown).toHaveBeenCalled()
  })

  it('should handle the inset prop', async () => {
    render(
      <Dialog defaultOpen>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Edit profile</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body inset>
              <p>Dialog contents</p>
            </Dialog.Body>

            <Dialog.Footer>
              <Button>Close</Button>
            </Dialog.Footer>

            <Dialog.CloseButton aria-label="Close" />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    )

    expect(screen.getByText(/dialog contents/i).parentElement).not.toHaveClass('px-xl py-lg')
  })

  it('should apply padding-right to the Dialog.Title if Dialog.CloseButton is present', async () => {
    render(
      <Dialog defaultOpen>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Edit profile</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <p>Dialog contents</p>
            </Dialog.Body>

            <Dialog.Footer>
              <Button>Close</Button>
            </Dialog.Footer>

            <Dialog.CloseButton aria-label="Close" />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    )

    expect(screen.getByText(/Edit profile/i)).toHaveClass('group-has-data-[part=close]:pr-3xl')
  })
})
