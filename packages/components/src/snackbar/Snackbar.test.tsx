import { FavoriteFill } from '@spark-ui/icons/FavoriteFill'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactElement } from 'react'
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  addSnackbar,
  type AddSnackbarArgs,
  clearSnackbarQueue,
  Snackbar,
  type SnackbarProps,
} from '.'

const DEFAULT_TIMEOUT = 250

const SnackbarImplementation = ({
  children,
  ...options
}: SnackbarProps & Partial<AddSnackbarArgs>): ReactElement => (
  <div>
    <Snackbar>{children}</Snackbar>

    <button
      onClick={() => addSnackbar({ message: 'You did it!', ...options, timeout: DEFAULT_TIMEOUT })}
    >
      Show me a snackbar
    </button>
  </div>
)

describe('Snackbar', () => {
  /**
   * PointerEvent is not available in JSDom
   * cf: https://github.com/jsdom/jsdom/issues/2527
   */
  beforeAll(() => vi.stubGlobal('PointerEvent', MouseEvent))

  beforeEach(() => {
    clearSnackbarQueue()
    vi.clearAllMocks()
  })

  const animateAndClose = () => {
    fireEvent.animationEnd(screen.getByRole('alert'))
  }

  it('should render a snackbar item when adding one to the queue', async () => {
    const user = userEvent.setup()

    render(<SnackbarImplementation />)

    await user.click(screen.getByText('Show me a snackbar'))

    expect(screen.getByText('You did it!')).toBeInTheDocument()
  })

  it('should remove snackbar item from DOM after closure', async () => {
    const user = userEvent.setup()

    render(<SnackbarImplementation isClosable />)

    await user.click(screen.getByText('Show me a snackbar'))

    // Wait for the snackbar to be visible
    const snackbar = await screen.findByText('You did it!')
    expect(snackbar).toBeInTheDocument()

    // Click the close button to trigger the exiting state
    await user.click(screen.getByLabelText('Close'))

    // Use the animateAndClose helper function
    animateAndClose()

    // Verify the snackbar is removed
    expect(screen.queryByText('You did it!')).not.toBeInTheDocument()
  })

  it('should only render one snackbar container', async () => {
    const user = userEvent.setup()

    render(
      <div>
        <Snackbar />
        <Snackbar />

        <button onClick={() => addSnackbar({ message: 'You did it!' })}>Show me a snackbar</button>
      </div>
    )

    await user.click(screen.getByText('Show me a snackbar'))

    expect(screen.getAllByRole('region')).toHaveLength(1)
  })

  it('should focus on snackbar region using F6 key, and restore it after last snackbar closure', async () => {
    const user = userEvent.setup()

    render(<SnackbarImplementation isClosable />)

    const triggerBtn = screen.getByText('Show me a snackbar')

    await user.click(triggerBtn)
    expect(document.activeElement).toBe(triggerBtn)

    await user.keyboard('{F6}')
    expect(document.activeElement).toBe(screen.getByRole('region'))

    const closeBtn = screen.getByLabelText('Close')

    await user.click(closeBtn)
    expect(document.activeElement).toBe(closeBtn)

    animateAndClose()
    expect(screen.queryByText('You did it!')).not.toBeInTheDocument()
    expect(document.activeElement).toBe(triggerBtn)
  })

  it('should close snackbar on right/left swipe gestures', async () => {
    const user = userEvent.setup()

    render(<SnackbarImplementation />)

    // 1. To the left
    await user.click(screen.getByText('Show me a snackbar'))
    let snackBarItem = await screen.findByText('You did it!')

    /**
     * PointerMove event implementation is buggy on `user-event` library,
     * so we need to replace it with `fireEvent`
     * cf. https://github.com/testing-library/user-event/issues/1047#issuecomment-1229153700
     */
    fireEvent.pointerDown(snackBarItem, { clientX: 0, clientY: 0 })
    fireEvent.pointerMove(snackBarItem, { clientX: -100, clientY: 0 })
    fireEvent.pointerUp(snackBarItem)

    expect(screen.getByText('You did it!').parentNode?.parentNode).toHaveAttribute(
      'data-swipe-direction',
      'left'
    )

    animateAndClose()
    expect(screen.queryByText('You did it!')).not.toBeInTheDocument()

    // 2. To the right
    await user.click(screen.getByText('Show me a snackbar'))
    snackBarItem = await screen.findByText('You did it!')

    fireEvent.pointerDown(snackBarItem, { clientX: 0, clientY: 0 })
    fireEvent.pointerMove(snackBarItem, { clientX: 100, clientY: 0 })
    fireEvent.pointerUp(snackBarItem)

    expect(screen.getByText('You did it!').parentNode?.parentNode).toHaveAttribute(
      'data-swipe-direction',
      'right'
    )

    animateAndClose()
    expect(screen.queryByText('You did it!')).not.toBeInTheDocument()
  })

  describe('Icon', () => {
    it('should render an icon if defined in addSnackbar options', async () => {
      const user = userEvent.setup()

      const props = {
        icon: <FavoriteFill title="Thumb up" />,
        intent: 'success' as AddSnackbarArgs['intent'],
      }

      render(
        <SnackbarImplementation {...props}>
          <Snackbar.Item intent="alert" />
        </SnackbarImplementation>
      )

      await user.click(screen.getByText('Show me a snackbar'))

      expect(screen.getByText('You did it!').parentNode?.parentNode).toHaveClass('bg-alert')
      expect(screen.getByTitle('Thumb up')).toBeInTheDocument()
    })

    it('should render an icon if defined in custom item children', async () => {
      const user = userEvent.setup()

      render(
        <SnackbarImplementation>
          <Snackbar.Item intent="success">
            <Snackbar.ItemIcon intent="alert">
              <FavoriteFill title="Thumb up" />
            </Snackbar.ItemIcon>
          </Snackbar.Item>
        </SnackbarImplementation>
      )

      await user.click(screen.getByText('Show me a snackbar'))

      expect(screen.getByText('You did it!').parentNode?.parentNode).toHaveClass('bg-success')
      expect(screen.getByTitle('Thumb up').parentNode).toHaveClass('text-alert')
    })
  })

  describe('Action', () => {
    it('should render action button defined in addSnackbar options, and close snackbar on interaction', async () => {
      const user = userEvent.setup()

      const props = {
        onAction: vi.fn(),
        actionLabel: 'Undo',
        actionOnNewline: true,
      }

      render(
        <SnackbarImplementation {...props}>
          <Snackbar.Item intent="alert" />
        </SnackbarImplementation>
      )

      await user.click(screen.getByText('Show me a snackbar'))

      // Wait for the snackbar to be visible
      const snackbar = await screen.findByText('You did it!')
      expect(snackbar).toBeInTheDocument()

      /**
       * If no children item (aka `Snackbar.ItemIcon`) is provided, then props from parent (aka `Snackbar.Item`)
       * will be used in priority over function options.
       */
      expect(screen.getByText('Undo')).toHaveClass('bg-alert')

      await user.click(screen.getByText('Undo'))

      expect(props.onAction).toHaveBeenCalledTimes(1)

      // Wait for the snackbar to be in exiting state before triggering animation
      await new Promise(resolve => setTimeout(resolve, 0))
      animateAndClose()
      expect(screen.queryByText('Undo')).not.toBeInTheDocument()
    })

    it('should render action button defined in custom item children, and close snackbar on interaction', async () => {
      const user = userEvent.setup()

      const onActionSpy = vi.fn()

      render(
        <SnackbarImplementation>
          <Snackbar.Item intent="success">
            <Snackbar.ItemAction intent="error" onClick={onActionSpy}>
              Undo
            </Snackbar.ItemAction>
          </Snackbar.Item>
        </SnackbarImplementation>
      )

      await user.click(screen.getByText('Show me a snackbar'))

      /**
       * If children item is provided then its props will be used in priority over function options.
       */
      expect(screen.getByText('You did it!').parentNode?.parentNode).toHaveClass('bg-success')
      expect(screen.getByText('Undo')).toHaveClass('bg-error')

      await user.click(screen.getByText('Undo'))

      expect(onActionSpy).toHaveBeenCalledTimes(1)

      animateAndClose()
      expect(screen.queryByText('Undo')).not.toBeInTheDocument()
    })

    it('should not dismiss automatically when an action is defined', async () => {
      const user = userEvent.setup()

      const props = {
        onAction: vi.fn(),
        onClose: vi.fn(),
      }

      render(<SnackbarImplementation {...props} />)

      await user.click(screen.getByText('Show me a snackbar'))

      // Wait for the snackbar to be visible
      const snackbar = await screen.findByText('You did it!')
      expect(snackbar).toBeInTheDocument()

      // Wait for the timeout
      await new Promise(resolve => setTimeout(resolve, DEFAULT_TIMEOUT))

      expect(screen.getByText('You did it!')).toBeInTheDocument()
      expect(props.onClose).not.toHaveBeenCalled()
    })
  })

  describe('Close', () => {
    it('should render close button defined in addSnackbar options, and close snackbar on interaction', async () => {
      const user = userEvent.setup()

      const props = {
        isClosable: true,
        onClose: vi.fn(),
      }

      render(
        <SnackbarImplementation {...props}>
          <Snackbar.Item intent="alert" />
        </SnackbarImplementation>
      )

      await user.click(screen.getByText('Show me a snackbar'))

      expect(screen.getByLabelText('Close')).toHaveClass('bg-alert')

      await user.click(screen.getByLabelText('Close'))

      animateAndClose()
      expect(screen.queryByLabelText('Close')).not.toBeInTheDocument()
      expect(props.onClose).toHaveBeenCalledTimes(1)
    })

    it('should render close button defined in custom item children, and close snackbar on interaction', async () => {
      const user = userEvent.setup()

      const onCloseSpy = vi.fn()
      const onClickSpy = vi.fn()

      render(
        <SnackbarImplementation onClose={onCloseSpy}>
          <Snackbar.Item intent="success">
            <Snackbar.ItemClose
              intent="error"
              onClick={onClickSpy}
              aria-label="Close the snackbar"
            />
          </Snackbar.Item>
        </SnackbarImplementation>
      )

      await user.click(screen.getByText('Show me a snackbar'))

      expect(screen.getByText('You did it!').parentNode?.parentNode).toHaveClass('bg-success')
      expect(screen.getByLabelText('Close the snackbar')).toHaveClass('bg-error')

      await user.click(screen.getByLabelText('Close the snackbar'))

      expect(onClickSpy).toHaveBeenCalledTimes(1)

      animateAndClose()
      expect(screen.queryByLabelText('Close the snackbar')).not.toBeInTheDocument()
      expect(onCloseSpy).toHaveBeenCalledTimes(1)
    })
  })
})
