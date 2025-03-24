import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Accordion } from '.'

describe('Accordion', () => {
  it('should open the accordion content when clicking on the trigger', async () => {
    const user = userEvent.setup()

    // Given an accordion in closed state
    render(
      <Accordion>
        <Accordion.Item value="a">
          <Accordion.ItemTrigger>First trigger</Accordion.ItemTrigger>
          <Accordion.ItemContent>First panel</Accordion.ItemContent>
        </Accordion.Item>

        <Accordion.Item value="b">
          <Accordion.ItemTrigger>Second trigger</Accordion.ItemTrigger>
          <Accordion.ItemContent>Second panel</Accordion.ItemContent>
        </Accordion.Item>
      </Accordion>
    )

    // Then both panels are closed
    expect(screen.getByText('First panel')).not.toBeVisible()
    expect(screen.getByText('Second panel')).not.toBeVisible()

    await user.click(screen.getByRole('button', { name: 'First trigger' }))

    // Then first panel has been opened
    await waitFor(() => {
      expect(screen.getByText('First panel')).toBeVisible()
      expect(screen.getByText('Second panel')).not.toBeVisible()
    })

    await user.click(screen.getByRole('button', { name: 'Second trigger' }))

    // Then first panel has been closed and second panel has been opened
    await waitFor(() => {
      expect(screen.getByText('First panel')).not.toBeVisible()
      expect(screen.getByText('Second panel')).toBeVisible()
    })
  })

  it('should open the accordion content when clicking on the trigger (multiple)', async () => {
    const user = userEvent.setup()

    // Given an accordion in closed state and multiple mode enabled
    render(
      <Accordion multiple>
        <Accordion.Item value="a">
          <Accordion.ItemTrigger>First trigger</Accordion.ItemTrigger>
          <Accordion.ItemContent>First panel</Accordion.ItemContent>
        </Accordion.Item>

        <Accordion.Item value="b">
          <Accordion.ItemTrigger>Second trigger</Accordion.ItemTrigger>
          <Accordion.ItemContent>Second panel</Accordion.ItemContent>
        </Accordion.Item>
      </Accordion>
    )

    // Then both panels are closed
    expect(screen.getByText('First panel')).not.toBeVisible()
    expect(screen.getByText('Second panel')).not.toBeVisible()

    await user.click(screen.getByRole('button', { name: 'First trigger' }))

    // Then first panel has been opened
    expect(screen.getByText('First panel')).toBeVisible()
    expect(screen.getByText('Second panel')).not.toBeVisible()

    await user.click(screen.getByRole('button', { name: 'Second trigger' }))

    // Then second panel is opened and the first one remains opened
    await waitFor(() => {
      expect(screen.getByText('First panel')).toBeVisible()
      expect(screen.getByText('Second panel')).toBeVisible()
    })
  })

  it('should not open content on click when disabled', async () => {
    const user = userEvent.setup()

    // Given a disabled accordion
    render(
      <Accordion disabled>
        <Accordion.Item value="a">
          <Accordion.ItemTrigger>First trigger</Accordion.ItemTrigger>
          <Accordion.ItemContent>First panel</Accordion.ItemContent>
        </Accordion.Item>

        <Accordion.Item value="b">
          <Accordion.ItemTrigger>Second trigger</Accordion.ItemTrigger>
          <Accordion.ItemContent>Second panel</Accordion.ItemContent>
        </Accordion.Item>
      </Accordion>
    )

    // Then both panels are closed
    expect(screen.getByText('First panel')).not.toBeVisible()
    expect(screen.getByText('Second panel')).not.toBeVisible()

    await user.click(screen.getByRole('button', { name: 'First trigger' }))

    // Then the panel remain closed
    expect(screen.getByText('First panel')).not.toBeVisible()
    expect(screen.getByText('Second panel')).not.toBeVisible()
  })

  it('should not open content on click when specific item is disabled', async () => {
    const user = userEvent.setup()

    // Given an accordion whose second item is disabled
    render(
      <Accordion>
        <Accordion.Item value="a">
          <Accordion.ItemTrigger>First trigger</Accordion.ItemTrigger>
          <Accordion.ItemContent>First panel</Accordion.ItemContent>
        </Accordion.Item>

        <Accordion.Item value="b" disabled>
          <Accordion.ItemTrigger>Second trigger</Accordion.ItemTrigger>
          <Accordion.ItemContent>Second panel</Accordion.ItemContent>
        </Accordion.Item>
      </Accordion>
    )

    // Then both panels are closed
    expect(screen.getByText('First panel')).not.toBeVisible()
    expect(screen.getByText('Second panel')).not.toBeVisible()

    await user.click(screen.getByRole('button', { name: 'First trigger' }))

    // Then first panel has been opened
    expect(screen.getByText('First panel')).toBeVisible()
    expect(screen.getByText('Second panel')).not.toBeVisible()

    // When the used clicks on the disabled item trigger
    await user.click(screen.getByRole('button', { name: 'Second trigger' }))

    // Then first panel remain opened because second panel was disabled
    expect(screen.getByText('First panel')).toBeVisible()
    expect(screen.getByText('Second panel')).not.toBeVisible()
  })
})
