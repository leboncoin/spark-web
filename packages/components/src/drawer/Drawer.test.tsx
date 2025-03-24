import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Drawer } from './'

describe('Drawer', () => {
  it('should render', async () => {
    const user = userEvent.setup()

    render(
      <Drawer>
        <Drawer.Trigger asChild>
          <button>Edit profile</button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Edit profile</Drawer.Title>
            </Drawer.Header>

            <Drawer.Body>
              <p>Drawer contents</p>
            </Drawer.Body>

            <Drawer.CloseButton aria-label="Close edit profile" />
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer>
    )

    expect(screen.queryByText('Drawer contents')).not.toBeInTheDocument()

    await user.click(screen.getByText('Edit profile'))

    expect(screen.getByText('Drawer contents')).toBeInTheDocument()
  })

  it('should handle the inset prop', () => {
    render(
      <Drawer defaultOpen>
        <Drawer.Trigger asChild>
          <button>Edit profile</button>
        </Drawer.Trigger>

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
