import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Button } from './Button'

const defaultProps = {
  children: 'Hello World!',
}

const clickEvent = vi.fn()
const keyboardEvent = vi.fn()

describe('Button', () => {
  beforeEach(() => vi.clearAllMocks())

  it('should render', () => {
    render(<Button {...defaultProps} />)

    expect(screen.getByRole('button', { name: defaultProps.children })).toBeInTheDocument()
    expect(document.querySelector('[data-spark-component="button"]')).toBeInTheDocument()
    expect(document.querySelector('[data-spark-component="spinner"]')).not.toBeInTheDocument()
  })

  it('should render as link', () => {
    const props = {
      asChild: true,
      children: <a href="/">Link</a>,
    }

    render(<Button {...props} />)

    expect(screen.getByRole('link', { name: 'Link' })).toHaveAttribute('href', '/')
  })

  it('should trigger click event', async () => {
    const user = userEvent.setup()

    const props = {
      ...defaultProps,
      onClick: clickEvent,
    }

    render(<Button {...props} />)

    await user.click(screen.getByRole('button', { name: props.children }))

    expect(clickEvent).toHaveBeenCalledTimes(1)
  })

  it('should not trigger events when disabled', async () => {
    const user = userEvent.setup()
    const props = {
      ...defaultProps,
      onClick: clickEvent,
      onKeyDown: keyboardEvent,
      disabled: true,
    }

    render(<Button {...props} />)
    const element = screen.getByRole('button', { name: props.children })

    element.focus()
    await user.keyboard('{Enter}')

    await user.click(element)

    expect(clickEvent).not.toHaveBeenCalled()
    expect(keyboardEvent).not.toHaveBeenCalled()

    expect(element).toHaveAttribute('disabled')
  })

  describe('Loading state', () => {
    it('should display spinner and replace accessible name with hidden loading label', () => {
      const props = {
        ...defaultProps,
        isLoading: true,
        loadingLabel: 'Loading...',
      }

      render(<Button {...props} />)

      expect(document.querySelector('[data-spark-component="spinner"]')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: props.loadingLabel })).toBeInTheDocument()
      expect(screen.queryByText(props.loadingLabel)).not.toBeInTheDocument()
    })

    it('should display spinner and replace accessible name with visible loading text', () => {
      const props = {
        ...defaultProps,
        isLoading: true,
        loadingText: 'Loading...',
      }

      render(<Button {...props} />)

      expect(document.querySelector('[data-spark-component="spinner"]')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: props.loadingText })).toBeInTheDocument()
      expect(screen.getByText(props.loadingText)).toBeInTheDocument()
    })

    it('should not trigger events when loading', async () => {
      const user = userEvent.setup()

      const props = {
        onClick: clickEvent,
        onKeyDown: keyboardEvent,
        isLoading: true,
        loadingText: 'Loading...',
        children: 'Hello World!',
      }

      render(<Button {...props} />)
      const element = screen.getByRole('button', { name: props.loadingText })

      element.focus()
      await user.keyboard('{Enter}')

      await user.click(element)

      expect(clickEvent).not.toHaveBeenCalled()
      expect(keyboardEvent).not.toHaveBeenCalled()

      expect(element).toHaveAttribute('aria-busy', 'true')
    })
  })
})
