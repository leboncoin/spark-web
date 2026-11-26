import { act, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockResizeObserver } from 'jsdom-testing-mocks'
import { useState } from 'react'
import { beforeAll, describe, expect, it, vi } from 'vitest'

import { Popover } from '.'

const ControlledImplementation = ({ defaultOpen = true } = {}) => {
  const [open] = useState(defaultOpen)

  return (
    <Popover open={open}>
      <Popover.Trigger asChild>
        <button type="button">Click me</button>
      </Popover.Trigger>
      <Popover.Content>Popover content</Popover.Content>
    </Popover>
  )
}

describe('Popover', () => {
  beforeAll(() => {
    mockResizeObserver()
  })

  describe('opening', () => {
    it('should open popover on click', async () => {
      const user = userEvent.setup()

      // Given a basic popover (closed by default)
      render(
        <Popover>
          <Popover.Trigger asChild>
            <button type="button">Click me</button>
          </Popover.Trigger>
          <Popover.Anchor>
            <button type="button">Popover anchor</button>
          </Popover.Anchor>
          <Popover.Content>
            <Popover.Arrow />
            Popover content
          </Popover.Content>
        </Popover>
      )

      // ...by default, only trigger elements are rendered
      expect(document.querySelector('[data-spark-component="popover-anchor"]')).toBeInTheDocument()
      expect(document.querySelector('[data-spark-component="popover-trigger"]')).toBeInTheDocument()

      // ...and content elements are not rendered
      expect(document.querySelector('[data-spark-component="popover-arrow"]')).toBeNull()
      expect(document.querySelector('[data-spark-component="popover-content"]')).toBeNull()
      expect(screen.queryByText('Popover content')).not.toBeInTheDocument()

      // When the user click on its associated trigger element
      await user.click(screen.getByText('Click me'))

      // Then the popover opens (content is visible)
      expect(document.querySelector('[data-spark-component="popover-arrow"]')).toBeInTheDocument()
      expect(document.querySelector('[data-spark-component="popover-content"]')).toBeInTheDocument()
      expect(screen.getByText('Popover content')).toBeInTheDocument()
    })

    it('should force render using `forceMount` for SEO purposes', () => {
      // Given a popover closed by default but using "forceMount" prop
      render(
        <Popover>
          <Popover.Trigger asChild>
            <button type="button">Click me</button>
          </Popover.Trigger>
          <Popover.Content forceMount>Popover content</Popover.Content>
        </Popover>
      )

      // Then the content is rendered in the DOM
      expect(screen.getByText('Popover content')).toBeInTheDocument()
    })

    it('should not open on click on trigger while in controlled mode', async () => {
      const user = userEvent.setup()

      // Given a controlled popover that is in closed state
      render(<ControlledImplementation defaultOpen={false} />)

      // When the user clicks outside of it
      await user.click(screen.getByText('Click me'))

      // Then the content is not rendered
      expect(screen.queryByText('Popover content')).not.toBeInTheDocument()
    })

    it('should forward focus to first focusable child', () => {
      // Given a onOpenAutoFocus event
      const onOpenAutoFocus = vi.fn()

      // When an opened popover is rendered
      render(
        <Popover defaultOpen>
          <Popover.Trigger asChild>
            <button type="button">Click me</button>
          </Popover.Trigger>
          <Popover.Content onOpenAutoFocus={onOpenAutoFocus}>
            Popover content
            <input type="text" placeholder="First focusable element" />
          </Popover.Content>
        </Popover>
      )

      // Then first focusable child has focus and event has been called
      expect(onOpenAutoFocus).toHaveBeenCalledTimes(1)
      expect(screen.getByPlaceholderText('First focusable element')).toHaveFocus()
    })

    it('should not forward focus to first focusable child when using preventDefault', () => {
      // Given a onOpenAutoFocus event preventing event from being executed
      const focusEvent = vi.fn(e => {
        e.preventDefault()
      })

      // When an opened popover is rendered
      render(
        <Popover defaultOpen>
          <Popover.Trigger asChild>
            <button type="button">Click me</button>
          </Popover.Trigger>
          <Popover.Content onOpenAutoFocus={focusEvent}>
            Popover content
            <input type="text" placeholder="First focusable element" />
          </Popover.Content>
        </Popover>
      )

      // Then the first focusable child does not get the focus because the event handler cancels it
      expect(focusEvent).toHaveBeenCalledTimes(1)
      expect(screen.getByPlaceholderText('First focusable element')).not.toHaveFocus()
    })
  })

  describe('closing', () => {
    it('should close on click outside', async () => {
      const user = userEvent.setup()
      const onPointerDownOutside = vi.fn()

      // Given a popover opened by default
      render(
        <Popover defaultOpen>
          <Popover.Trigger asChild>
            <button type="button">Click me</button>
          </Popover.Trigger>
          <Popover.Content onPointerDownOutside={onPointerDownOutside}>
            Popover content
          </Popover.Content>
        </Popover>
      )

      // ...by default, content is rendered
      expect(screen.getByText('Popover content')).toBeInTheDocument()

      // When the user clicks outside of it
      await user.click(document.body)

      // Then the content is no longer rendered
      expect(screen.queryByText('Popover content')).not.toBeInTheDocument()
      expect(onPointerDownOutside).toHaveBeenCalledTimes(1)
    })

    it('should close on Escape (keyboard)', async () => {
      const user = userEvent.setup()
      const onEscapeKeyDown = vi.fn()

      // Given a popover opened by default
      render(
        <Popover defaultOpen>
          <Popover.Trigger asChild>
            <button type="button">Click me</button>
          </Popover.Trigger>
          <Popover.Content onEscapeKeyDown={onEscapeKeyDown}>Popover content</Popover.Content>
        </Popover>
      )

      // ...by default, content is rendered
      expect(screen.getByText('Popover content')).toBeInTheDocument()

      // When the user press Escape
      await user.keyboard('{Escape}')

      // Then the content is no longer rendered
      expect(screen.queryByText('Popover content')).not.toBeInTheDocument()
      expect(onEscapeKeyDown).toHaveBeenCalledTimes(1)
    })

    it('should close when clicking on Popover.CloseButton', async () => {
      const user = userEvent.setup()

      // Given a popover opened by default
      render(
        <Popover defaultOpen>
          <Popover.Trigger asChild>
            <button type="button">Click me</button>
          </Popover.Trigger>
          <Popover.Content>
            Popover content
            <Popover.CloseButton aria-label="Close the popover" />
          </Popover.Content>
        </Popover>
      )

      // ...by default, content is rendered
      expect(screen.getByText('Popover content')).toBeInTheDocument()

      // When the user clicks on the close button
      await user.click(screen.getByRole('button', { name: 'Close the popover' }))

      // Then the content is no longer rendered
      expect(screen.queryByText('Popover content')).not.toBeInTheDocument()
    })

    it('should not close on click inside the popover contents', async () => {
      const user = userEvent.setup()

      // Given a popover opened by default
      render(
        <Popover defaultOpen>
          <Popover.Trigger asChild>
            <button type="button">Click me</button>
          </Popover.Trigger>
          <Popover.Content>Popover content</Popover.Content>
        </Popover>
      )

      // ...by default, content is rendered
      expect(screen.getByText('Popover content')).toBeInTheDocument()

      // When the user clicks outside of it
      await user.click(screen.getByText('Popover content'))

      // Then the content is no longer rendered
      expect(screen.getByText('Popover content')).toBeInTheDocument()
    })

    it('should not close on click outside while in controlled mode', async () => {
      const user = userEvent.setup()

      // Given a controlled popover that is in opened state
      render(<ControlledImplementation />)

      // ...by default, content is rendered
      expect(screen.getByText('Popover content')).toBeInTheDocument()

      // When the user clicks outside of it
      await user.click(document.body)

      // Then the content is still rendered
      expect(screen.getByText('Popover content')).toBeInTheDocument()
    })

    it('should not close on Escape while in controlled mode', async () => {
      const user = userEvent.setup()

      // Given a controlled popover that is in opened state
      render(<ControlledImplementation />)

      // ...by default, content is rendered
      expect(screen.getByText('Popover content')).toBeInTheDocument()

      // When the user press Escape
      await user.keyboard('{Escape}')

      // Then the content is still rendered
      expect(screen.getByText('Popover content')).toBeInTheDocument()
    })

    it('should restore focus to Trigger element after closing', async () => {
      const user = userEvent.setup()
      const onCloseAutoFocus = vi.fn()

      // Given a popover opened by default
      render(
        <Popover>
          <Popover.Trigger asChild>
            <button type="button">Click me</button>
          </Popover.Trigger>
          <Popover.Content onCloseAutoFocus={onCloseAutoFocus}>
            Popover content
            <input type="text" placeholder="First focusable element" />
          </Popover.Content>
        </Popover>
      )

      // When the user open the popover
      await user.click(screen.getByText('Click me'))
      // Then the first focusable child has been focused
      expect(screen.getByPlaceholderText('First focusable element')).toHaveFocus()

      // When the user press Escape to close the popover
      await user.keyboard('{Escape}')
      // Then focus has been set back to the trigger element
      expect(screen.getByText('Click me')).toHaveFocus()
      expect(onCloseAutoFocus).toHaveBeenCalledTimes(1)
    })

    it('should not restore focus to Trigger element after closing when preventing event', async () => {
      const user = userEvent.setup()
      const onCloseAutoFocus = vi.fn(e => e.preventDefault())

      // Given a popover opened by default
      render(
        <Popover>
          <Popover.Trigger asChild>
            <button type="button">Click me</button>
          </Popover.Trigger>
          <Popover.Content onCloseAutoFocus={onCloseAutoFocus}>
            Popover content
            <input type="text" placeholder="First focusable element" />
          </Popover.Content>
        </Popover>
      )

      // When the user open the popover
      await user.click(screen.getByText('Click me'))
      // Then the first focusable child has been focused
      expect(screen.getByPlaceholderText('First focusable element')).toHaveFocus()

      // When the user press Escape to close the popover
      await user.keyboard('{Escape}')
      // Then focus has been set back to the trigger element
      expect(screen.getByText('Click me')).not.toHaveFocus()
      expect(onCloseAutoFocus).toHaveBeenCalledTimes(1)
    })
  })

  describe('disablePointerDismissal', () => {
    const DismissalImplementation = ({
      onInteractOutside,
      onOpenChange,
    }: {
      onInteractOutside?: () => void
      onOpenChange?: (open: boolean) => void
    }) => (
      <>
        <Popover defaultOpen disablePointerDismissal onOpenChange={onOpenChange}>
          <Popover.Trigger asChild>
            <button type="button">Click me</button>
          </Popover.Trigger>
          <Popover.Content onInteractOutside={onInteractOutside}>
            Popover content
            <Popover.CloseButton aria-label="Close" />
          </Popover.Content>
        </Popover>
        <button type="button">Outside</button>
      </>
    )

    it('should not close on click outside', async () => {
      const user = userEvent.setup()
      const onInteractOutside = vi.fn()
      const onOpenChange = vi.fn()

      // Given an opened popover that disables pointer dismissal
      render(
        <DismissalImplementation
          onInteractOutside={onInteractOutside}
          onOpenChange={onOpenChange}
        />
      )

      // When the user clicks outside of it
      await user.click(screen.getByRole('button', { name: 'Outside' }))

      // Then the popover stays open
      expect(screen.getByText('Popover content')).toBeInTheDocument()
      expect(onOpenChange).not.toHaveBeenCalled()

      // ...and the consumer handler is still called (pointer down outside, then focus outside)
      expect(onInteractOutside).toHaveBeenCalled()
    })

    it('should not close when focus moves outside', () => {
      // Given an opened popover (non-modal) that disables pointer dismissal
      render(<DismissalImplementation />)

      // ...focus is inside the popover
      expect(screen.getByRole('button', { name: 'Close' })).toHaveFocus()

      // When focus moves outside of the popover (Tab loops inside the popover, so we move it programmatically)
      act(() => screen.getByRole('button', { name: 'Outside' }).focus())

      // Then the popover stays open
      expect(screen.getByRole('button', { name: 'Outside' })).toHaveFocus()
      expect(screen.getByText('Popover content')).toBeInTheDocument()
    })

    it('should still close on Escape (keyboard)', async () => {
      const user = userEvent.setup()

      render(<DismissalImplementation />)

      await user.keyboard('{Escape}')

      expect(screen.queryByText('Popover content')).not.toBeInTheDocument()
    })

    it('should still close when clicking on Popover.CloseButton', async () => {
      const user = userEvent.setup()

      render(<DismissalImplementation />)

      await user.click(screen.getByRole('button', { name: 'Close' }))

      expect(screen.queryByText('Popover content')).not.toBeInTheDocument()
    })
  })

  it('should render the Popover into the body of the document when using Popover.Portal', () => {
    // Given a popover rendered into a Portal
    render(
      <div data-testid="popover-container">
        <Popover open>
          <Popover.Trigger asChild>
            <button type="button">Click me</button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content>Popover content</Popover.Content>
          </Popover.Portal>
        </Popover>
      </div>
    )

    // When we search for the popover inside of its original container
    const originalContainer = screen.getByTestId('popover-container')

    // Then it is rendered outside of it (inside document.body)
    expect(within(originalContainer).queryByText('Popover content')).not.toBeInTheDocument()
    expect(screen.getByText('Popover content')).toBeInTheDocument()
  })

  it('should handle the inset prop', async () => {
    render(
      <Popover open>
        <Popover.Trigger asChild>
          <button type="button">Click me</button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content inset>Popover content</Popover.Content>
        </Popover.Portal>
      </Popover>
    )

    expect(screen.getByText(/Popover content/i)).not.toHaveClass('p-lg')
  })
  describe('overlay', () => {
    const getOverlay = () => document.querySelector('[data-spark-component="popover-overlay"]')

    it('should render the overlay only while the popover is open', async () => {
      const user = userEvent.setup()

      // Given a popover with an overlay (closed by default)
      render(
        <Popover modal>
          <Popover.Trigger asChild>
            <button type="button">Click me</button>
          </Popover.Trigger>
          <Popover.Overlay />
          <Popover.Portal>
            <Popover.Content>
              Popover content
              <Popover.CloseButton aria-label="Close" />
            </Popover.Content>
          </Popover.Portal>
        </Popover>
      )

      // ...the overlay is not rendered
      expect(getOverlay()).toBeNull()

      // When the user opens the popover
      await user.click(screen.getByText('Click me'))

      // Then the overlay is rendered in the body, hidden from assistive technologies
      expect(getOverlay()).toBeInTheDocument()
      expect(getOverlay()).toHaveAttribute('data-state', 'open')
      expect(getOverlay()).toHaveAttribute('aria-hidden', 'true')

      // When the user closes the popover
      await user.click(screen.getByRole('button', { name: 'Close' }))

      // Then the overlay is removed
      expect(screen.queryByText('Popover content')).not.toBeInTheDocument()
      expect(getOverlay()).toBeNull()
    })

    it('should close the popover when clicking on the overlay', async () => {
      const user = userEvent.setup()
      const onOpenChange = vi.fn()

      // Given an opened popover with an overlay
      render(
        <Popover defaultOpen onOpenChange={onOpenChange}>
          <Popover.Trigger asChild>
            <button type="button">Click me</button>
          </Popover.Trigger>
          <Popover.Overlay />
          <Popover.Content>Popover content</Popover.Content>
        </Popover>
      )

      // When the user clicks on the overlay
      await user.click(getOverlay() as HTMLElement)

      // Then the popover closes
      expect(onOpenChange).toHaveBeenCalledWith(false)
      expect(screen.queryByText('Popover content')).not.toBeInTheDocument()
      expect(getOverlay()).toBeNull()
    })

    describe('spotlight', () => {
      it('should highlight the anchor element', async () => {
        const user = userEvent.setup()

        // Given a popover with an overlay and an anchor
        render(
          <Popover>
            <Popover.Trigger asChild>
              <button type="button">Click me</button>
            </Popover.Trigger>
            <Popover.Anchor asChild>
              <span>Anchor</span>
            </Popover.Anchor>
            <Popover.Overlay />
            <Popover.Content>Popover content</Popover.Content>
          </Popover>
        )

        // ...nothing is highlighted while closed
        expect(screen.getByText('Anchor')).not.toHaveAttribute('data-spotlighted')

        // When the popover opens
        await user.click(screen.getByText('Click me'))

        // Then the anchor (not the trigger) is highlighted
        expect(getOverlay()).toHaveAttribute('data-spotlight')
        expect(screen.getByText('Anchor')).toHaveAttribute('data-spotlighted')
        expect(screen.getByText('Click me')).not.toHaveAttribute('data-spotlighted')

        // When the popover closes
        await user.keyboard('{Escape}')

        // Then the anchor is no longer highlighted
        expect(screen.getByText('Anchor')).not.toHaveAttribute('data-spotlighted')
      })

      it('should highlight the trigger element when there is no anchor', () => {
        render(
          <Popover defaultOpen>
            <Popover.Trigger asChild>
              <button type="button">Click me</button>
            </Popover.Trigger>
            <Popover.Overlay />
            <Popover.Content>Popover content</Popover.Content>
          </Popover>
        )

        expect(screen.getByText('Click me')).toHaveAttribute('data-spotlighted')
      })

      it('should dim the whole page when there is no trigger or anchor to highlight', () => {
        // Given a controlled popover without trigger nor anchor
        render(
          <Popover open>
            <Popover.Overlay />
            <Popover.Content>Popover content</Popover.Content>
          </Popover>
        )

        // Then the overlay is rendered without spotlight
        expect(getOverlay()).toBeInTheDocument()
        expect(getOverlay()).not.toHaveAttribute('data-spotlight')
        expect(document.querySelector('[data-spotlighted]')).toBeNull()
      })

      it('should forward refs to the anchor and trigger elements', () => {
        const anchorRef = vi.fn()
        const triggerRef = vi.fn()

        render(
          <Popover>
            <Popover.Trigger ref={triggerRef}>Click me</Popover.Trigger>
            <Popover.Anchor ref={anchorRef}>Anchor</Popover.Anchor>
          </Popover>
        )

        expect(triggerRef).toHaveBeenCalledWith(screen.getByText('Click me'))
        expect(anchorRef).toHaveBeenCalledWith(screen.getByText('Anchor'))
      })
    })
  })
})
