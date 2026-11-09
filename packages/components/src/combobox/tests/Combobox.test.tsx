import { InfoFill } from '@spark-ui/icons/InfoFill'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Combobox } from '..'
import { getInput, getItem, getListbox } from './test-utils'

describe('Combobox', () => {
  it('should render input and list of items', () => {
    render(
      <Combobox>
        <Combobox.Trigger>
          <Combobox.LeadingIcon>
            <InfoFill />
          </Combobox.LeadingIcon>
          <Combobox.Input aria-label="Book" />
        </Combobox.Trigger>
        <Combobox.Popover>
          <Combobox.Items>
            <Combobox.Item value="book-1">War and Peace</Combobox.Item>
            <Combobox.Item value="book-2">1984</Combobox.Item>
            <Combobox.Item value="book-3">Pride and Prejudice</Combobox.Item>
          </Combobox.Items>
        </Combobox.Popover>
      </Combobox>
    )

    expect(getInput('Book')).toBeInTheDocument()

    expect(getListbox('Book')).toBeInTheDocument()

    expect(getItem('War and Peace')).toBeInTheDocument()
    expect(getItem('1984')).toBeInTheDocument()
    expect(getItem('Pride and Prejudice')).toBeInTheDocument()
  })

  it('ignores option selection after an open combobox becomes disabled', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    const onValueChange = vi.fn()
    const renderCombobox = (open: boolean, disabled: boolean) => (
      <Combobox
        disabled={disabled}
        open={open}
        onOpenChange={onOpenChange}
        value="book-1"
        onValueChange={onValueChange}
      >
        <Combobox.Trigger>
          <Combobox.Input aria-label="Book" />
        </Combobox.Trigger>
        <Combobox.Popover>
          <Combobox.Items>
            <Combobox.Item value="book-1">War and Peace</Combobox.Item>
            <Combobox.Item value="book-2">1984</Combobox.Item>
          </Combobox.Items>
        </Combobox.Popover>
      </Combobox>
    )

    const { rerender } = render(renderCombobox(false, false))
    const input = getInput('Book')
    await user.click(input)
    expect(onOpenChange).toHaveBeenCalledWith(true)
    rerender(renderCombobox(true, false))
    expect(input).toHaveAttribute('aria-expanded', 'true')

    rerender(renderCombobox(true, true))
    expect(input).toBeDisabled()
    await user.click(getItem('1984'))

    expect(onValueChange).not.toHaveBeenCalled()
    expect(input).toHaveValue('War and Peace')
  })

  describe('Popover behaviour', () => {
    it('should open/close the popover when interacting with its input', async () => {
      const user = userEvent.setup()

      // Given a closed combobox (default state)
      render(
        <Combobox>
          <Combobox.Trigger>
            <Combobox.Input aria-label="Book" />
          </Combobox.Trigger>
          <Combobox.Popover>
            <Combobox.Items>
              <Combobox.Item value="book-1">War and Peace</Combobox.Item>
              <Combobox.Item value="book-2">1984</Combobox.Item>
              <Combobox.Item value="book-3">Pride and Prejudice</Combobox.Item>
            </Combobox.Items>
          </Combobox.Popover>
        </Combobox>
      )

      const input = getInput('Book')

      expect(input).toHaveAttribute('aria-expanded', 'false')

      // When the user interact with the input
      await user.click(input)

      // Then the combobox has expanded
      expect(input).toHaveAttribute('aria-expanded', 'true')

      // When the user interact outside the combobox
      await user.click(document.body)

      // Then the combobox is closed
      expect(input).toHaveAttribute('aria-expanded', 'false')
    })

    it('should open/close the items list when interacting with its input (no popover)', async () => {
      const user = userEvent.setup()

      // Given a closed combobox without a popover(default state)
      render(
        <Combobox>
          <Combobox.Trigger>
            <Combobox.Input aria-label="Book" />
          </Combobox.Trigger>

          <Combobox.Items>
            <Combobox.Item value="book-1">War and Peace</Combobox.Item>
            <Combobox.Item value="book-2">1984</Combobox.Item>
            <Combobox.Item value="book-3">Pride and Prejudice</Combobox.Item>
          </Combobox.Items>
        </Combobox>
      )

      const input = getInput('Book')

      expect(input).toHaveAttribute('aria-expanded', 'false')

      // When the user interact with the input
      await user.click(input)

      // Then the combobox has expanded
      expect(input).toHaveAttribute('aria-expanded', 'true')

      // When the user interact outside the combobox
      await user.click(document.body)

      // Then the combobox is closed
      expect(input).toHaveAttribute('aria-expanded', 'false')
    })

    // it('should remain forced opened', async () => {
    //   const user = userEvent.setup()

    //   // Given a combobox that should remain opened
    //   render(
    //     <Combobox open>
    //       <Combobox.Trigger>
    //         <Combobox.Input aria-label="Book" />
    //       </Combobox.Trigger>
    //       <Combobox.Popover>
    //         <Combobox.Items>
    //           <Combobox.Item value="book-1">War and Peace</Combobox.Item>
    //           <Combobox.Item value="book-2">1984</Combobox.Item>
    //           <Combobox.Item value="book-3">Pride and Prejudice</Combobox.Item>
    //         </Combobox.Items>
    //       </Combobox.Popover>
    //     </Combobox>
    //   )

    //   expect(getInput('Book')).toHaveAttribute('aria-expanded', 'true')

    //   // When the user interacts with the input
    //   await user.click(getInput('Book'))

    //   // Then the combobox remains opened
    //   expect(getInput('Book')).toHaveAttribute('aria-expanded', 'true')
    // })

    it('should be opened by default and remain opened upon interaction', async () => {
      const user = userEvent.setup()

      // Given a combobox that should remain opened
      render(
        <Combobox defaultOpen>
          <Combobox.Trigger>
            <Combobox.Input aria-label="Book" />
          </Combobox.Trigger>
          <Combobox.Popover>
            <Combobox.Items>
              <Combobox.Item value="book-1">War and Peace</Combobox.Item>
              <Combobox.Item value="book-2">1984</Combobox.Item>
              <Combobox.Item value="book-3">Pride and Prejudice</Combobox.Item>
            </Combobox.Items>
          </Combobox.Popover>
        </Combobox>
      )

      expect(getInput('Book')).toHaveAttribute('aria-expanded', 'true')

      // When the user interacts with the input
      await user.click(getInput('Book'))

      // Then the combobox remain opened
      expect(getInput('Book')).toHaveAttribute('aria-expanded', 'true')
    })

    it('should display Combobox.Empty when no items matches the input value', async () => {
      const user = userEvent.setup()

      // Given a combobox with no selected value yet
      render(
        <Combobox>
          <Combobox.Trigger>
            <Combobox.Input aria-label="Book" placeholder="Pick a book" />
          </Combobox.Trigger>
          <Combobox.Popover>
            <Combobox.Items>
              <Combobox.Empty>No results found</Combobox.Empty>
              <Combobox.Item value="book-1">War and Peace</Combobox.Item>
              <Combobox.Item value="book-2">1984</Combobox.Item>
              <Combobox.Item value="book-3">Pride and Prejudice</Combobox.Item>
            </Combobox.Items>
          </Combobox.Popover>
        </Combobox>
      )

      expect(screen.queryByText('No results found')).not.toBeInTheDocument()

      // When the user type "pri" to filter first item matching, then select it
      await user.click(getInput('Book'))
      await user.keyboard('{z}{z}{z}')

      // Then placeholder is replaced by the selected value
      expect(screen.getByText('No results found')).toBeInTheDocument()
    })
  })

  describe('Combobox.Disclosure', () => {
    it('should open/close the popover when interacting with its disclosure button', async () => {
      const user = userEvent.setup()

      // Given a closed combobox (default state)
      render(
        <Combobox>
          <Combobox.Trigger>
            <Combobox.Input aria-label="Book" />
            <Combobox.Disclosure openedLabel="Close popup" closedLabel="Open popup" />
          </Combobox.Trigger>
          <Combobox.Popover>
            <Combobox.Items>
              <Combobox.Item value="book-1">War and Peace</Combobox.Item>
              <Combobox.Item value="book-2">1984</Combobox.Item>
              <Combobox.Item value="book-3">Pride and Prejudice</Combobox.Item>
            </Combobox.Items>
          </Combobox.Popover>
        </Combobox>
      )

      const input = getInput('Book')

      expect(input).toHaveAttribute('aria-expanded', 'false')

      // When the user interact with the disclosure
      await user.click(screen.getByLabelText('Open popup'))

      // Then the combobox has expanded
      expect(input).toHaveAttribute('aria-expanded', 'true')

      // When the user interact with the disclosure while input is expanded
      await user.click(screen.getByLabelText('Close popup'))

      // Then the combobox is closed again
      expect(input).toHaveAttribute('aria-expanded', 'false')
    })
  })
})
