import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vitest } from 'vitest'

import { Drawer } from './'

describe('Drawer', () => {
  it('should render', async () => {
    render(
      <Drawer defaultOpen>
        <Drawer.Portal>
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Edit profile</Drawer.Title>
            </Drawer.Header>

            <Drawer.Body>
              <Drawer.Description>Make changes to your profile here.</Drawer.Description>
              <p>Drawer contents</p>
            </Drawer.Body>

            <Drawer.CloseButton aria-label="Close edit profile" />
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer>
    )

    const dialogEl = screen.getByRole('dialog', { name: 'Edit profile' })

    expect(dialogEl).toBeInTheDocument()
    expect(dialogEl).toHaveAccessibleDescription('Make changes to your profile here.')
    expect(within(dialogEl).getByText('Drawer contents')).toBeInTheDocument()
    expect(within(dialogEl).getByRole('button', { name: 'Close edit profile' })).toBeInTheDocument()
  })

  it('should change open in uncontrolled mode', async () => {
    const user = userEvent.setup()
    const onOpenChange = vitest.fn()
    const onClick = vitest.fn()

    render(
      <Drawer defaultOpen onOpenChange={onOpenChange}>
        <Drawer.Portal>
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Edit profile</Drawer.Title>
            </Drawer.Header>

            <Drawer.Body>
              <button onClick={onClick}>Save</button>
            </Drawer.Body>

            <Drawer.CloseButton aria-label="Close" />
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer>
    )

    const dialogEl = screen.getByRole('dialog', { name: 'Edit profile' })

    expect(dialogEl).toBeInTheDocument()

    await user.click(within(dialogEl).getByRole('button', { name: 'Close' }))

    expect(dialogEl).not.toBeInTheDocument()
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('should change open in controlled mode', async () => {
    const user = userEvent.setup()
    const onOpenChange = vitest.fn()
    const onClick = vitest.fn()

    render(
      <Drawer open onOpenChange={onOpenChange}>
        <Drawer.Portal>
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Edit profile</Drawer.Title>
            </Drawer.Header>

            <Drawer.Body>
              <button onClick={onClick}>Save</button>
            </Drawer.Body>

            <Drawer.CloseButton aria-label="Close" />
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer>
    )

    const dialogEl = screen.getByRole('dialog', { name: 'Edit profile' })

    expect(dialogEl).toBeInTheDocument()

    await user.click(within(dialogEl).getByRole('button', { name: 'Close' }))

    expect(onOpenChange).toHaveBeenCalledWith(false)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('should open when trigger is clicked', async () => {
    const user = userEvent.setup()

    render(
      <Drawer>
        <Drawer.Trigger>Edit profile</Drawer.Trigger>

        <Drawer.Portal>
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Edit profile</Drawer.Title>
            </Drawer.Header>

            <Drawer.Body>
              <p>Drawer contents</p>
            </Drawer.Body>

            <Drawer.CloseButton aria-label="Close" />
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer>
    )

    expect(screen.queryByRole('dialog', { name: 'Edit profile' })).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Edit profile' }))

    const dialogEl = screen.getByRole('dialog', { name: 'Edit profile' })

    expect(dialogEl).toBeInTheDocument()
  })

  it('should close when close button is clicked', async () => {
    const user = userEvent.setup()
    const onClick = vitest.fn()

    render(
      <Drawer defaultOpen>
        <Drawer.Portal>
          <Drawer.Overlay />

          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Edit profile</Drawer.Title>
            </Drawer.Header>

            <Drawer.Body>
              <button onClick={onClick}>Save</button>
            </Drawer.Body>

            <Drawer.CloseButton aria-label="Close" />
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer>
    )

    expect(screen.getByRole('dialog', { name: 'Edit profile' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Close' }))

    expect(screen.queryByRole('dialog', { name: 'Edit profile' })).not.toBeInTheDocument()
  })

  it('should close when esc is pressed', async () => {
    const onOpenChange = vitest.fn()

    render(
      <Drawer defaultOpen onOpenChange={onOpenChange}>
        <Drawer.Portal>
          <Drawer.Overlay />

          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Edit profile</Drawer.Title>
            </Drawer.Header>

            <Drawer.Body>
              <p>Drawer contents</p>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer>
    )

    expect(screen.getByRole('dialog', { name: 'Edit profile' })).toBeInTheDocument()

    fireEvent.keyDown(document.activeElement as Element, { key: 'Escape' })

    expect(screen.queryByRole('dialog', { name: 'Edit profile' })).not.toBeInTheDocument()
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('should close when is clicked outside', async () => {
    const user = userEvent.setup()
    const onOpenChange = vitest.fn()

    render(
      <Drawer defaultOpen onOpenChange={onOpenChange}>
        <Drawer.Portal>
          <Drawer.Overlay />

          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Edit profile</Drawer.Title>
            </Drawer.Header>

            <Drawer.Body>
              <p>Drawer contents</p>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer>
    )

    expect(screen.getByRole('dialog', { name: 'Edit profile' })).toBeInTheDocument()

    // Click outside the drawer (on the overlay)
    const overlay = document.querySelector('[data-spark-component="drawer-overlay"]')
    if (overlay) {
      await user.click(overlay)
    }

    expect(screen.queryByRole('dialog', { name: 'Edit profile' })).not.toBeInTheDocument()
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('should focus the trigger when is closed', async () => {
    const user = userEvent.setup()

    render(
      <Drawer defaultOpen>
        <Drawer.Trigger>Edit profile</Drawer.Trigger>

        <Drawer.Portal>
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Edit profile</Drawer.Title>
            </Drawer.Header>

            <Drawer.Body>
              <p>Drawer contents</p>
            </Drawer.Body>

            <Drawer.CloseButton aria-label="Close" />
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer>
    )

    await user.click(
      within(screen.getByRole('dialog', { name: 'Edit profile' })).getByRole('button', {
        name: 'Close',
      })
    )

    expect(screen.getByRole('button', { name: 'Edit profile' })).toHaveFocus()
  })

  it('should handle the inset prop', () => {
    render(
      <Drawer defaultOpen>
        <Drawer.Trigger render={<button />}>Edit profile</Drawer.Trigger>

        <Drawer.Portal>
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Edit profile</Drawer.Title>
            </Drawer.Header>

            <Drawer.Body inset>
              <p>Drawer contents</p>
            </Drawer.Body>
            <Drawer.CloseButton aria-label="Close edit profile" />
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer>
    )

    expect(screen.getByText(/Drawer contents/i).parentElement).not.toHaveClass('px-xl py-lg')
  })
})
