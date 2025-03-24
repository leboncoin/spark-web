import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { Collapsible } from '.'

describe('Collapsible', () => {
  it('should open the collapsible content when clicking on the trigger', async () => {
    const user = userEvent.setup()

    render(
      <Collapsible>
        <Collapsible.Trigger>Expand</Collapsible.Trigger>

        <Collapsible.Content>
          <p>Collapsible content</p>
        </Collapsible.Content>
      </Collapsible>
    )

    const trigger = screen.getByRole('button', { name: 'Expand' })

    expect(trigger).toBeInTheDocument()
    expect(screen.getByText('Collapsible content')).not.toBeVisible()

    await user.click(trigger)

    expect(screen.getByText('Collapsible content')).toBeVisible()
  })

  it('should not open content when disabled', async () => {
    const user = userEvent.setup()

    render(
      <Collapsible disabled>
        <Collapsible.Trigger asChild>
          <button>Expand</button>
        </Collapsible.Trigger>

        <Collapsible.Content>
          <p>Collapsible content</p>
        </Collapsible.Content>
      </Collapsible>
    )

    const trigger = screen.getByRole('button', { name: 'Expand' })

    expect(screen.getByText('Collapsible content')).not.toBeVisible()

    await user.click(trigger)

    expect(screen.getByText('Collapsible content')).not.toBeVisible()
  })

  describe('controlled', () => {
    it('should open the collapsible content when clicking on the trigger', async () => {
      const user = userEvent.setup()

      const onChange = vi.fn()

      const ControlledImplementation = () => {
        const [open, setOpen] = useState(false)

        return (
          <Collapsible
            open={open}
            onOpenChange={openState => {
              setOpen(openState)
              onChange(openState)
            }}
          >
            <Collapsible.Trigger asChild>
              <button>Expand</button>
            </Collapsible.Trigger>

            <Collapsible.Content>
              <p>Collapsible content</p>
            </Collapsible.Content>
          </Collapsible>
        )
      }

      render(<ControlledImplementation />)

      const trigger = screen.getByRole('button', { name: 'Expand' })

      expect(screen.getByText('Collapsible content')).not.toBeVisible()
      expect(onChange).not.toHaveBeenCalled()

      await user.click(trigger)

      expect(screen.getByText('Collapsible content')).toBeVisible()
      expect(onChange).toHaveBeenCalledWith(true)
      expect(onChange).toHaveBeenCalledTimes(1)
    })

    it('should remain open when open is forced to `true`', async () => {
      const user = userEvent.setup()

      render(
        <Collapsible open>
          <Collapsible.Trigger asChild>
            <button>Expand</button>
          </Collapsible.Trigger>

          <Collapsible.Content>
            <p>Collapsible content</p>
          </Collapsible.Content>
        </Collapsible>
      )

      const trigger = screen.getByRole('button', { name: 'Expand' })

      expect(screen.getByText('Collapsible content')).toBeVisible()

      await user.click(trigger)

      expect(screen.getByText('Collapsible content')).toBeVisible()
    })

    it('should remain closed when open is forced to `false`', async () => {
      const user = userEvent.setup()

      render(
        <Collapsible open={false}>
          <Collapsible.Trigger asChild>
            <button>Expand</button>
          </Collapsible.Trigger>

          <Collapsible.Content>
            <p>Collapsible content</p>
          </Collapsible.Content>
        </Collapsible>
      )

      const trigger = screen.getByRole('button', { name: 'Expand' })

      expect(screen.getByText('Collapsible content')).not.toBeVisible()

      await user.click(trigger)

      expect(screen.getByText('Collapsible content')).not.toBeVisible()
    })
  })
})
