import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { ToggleGroup } from '.'

describe('ToggleGroup', () => {
  beforeEach(() => vi.clearAllMocks())

  it('should render', () => {
    render(
      <ToggleGroup aria-label="Test group">
        <ToggleGroup.Toggle value="option1" aria-label="Option 1">
          Option 1
        </ToggleGroup.Toggle>
        <ToggleGroup.Toggle value="option2" aria-label="Option 2">
          Option 2
        </ToggleGroup.Toggle>
      </ToggleGroup>
    )

    expect(screen.getByRole('group', { name: 'Test group' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Option 1' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Option 2' })).toBeInTheDocument()
    expect(document.querySelector('[data-spark-component="toggle-group"]')).toBeInTheDocument()
  })

  it('should handle single selection', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()

    render(
      <ToggleGroup onValueChange={onValueChange} aria-label="Test group">
        <ToggleGroup.Toggle value="option1" aria-label="Option 1">
          Option 1
        </ToggleGroup.Toggle>
        <ToggleGroup.Toggle value="option2" aria-label="Option 2">
          Option 2
        </ToggleGroup.Toggle>
      </ToggleGroup>
    )

    const option1 = screen.getByRole('button', { name: 'Option 1' })
    const option2 = screen.getByRole('button', { name: 'Option 2' })

    await user.click(option1)
    expect(onValueChange).toHaveBeenCalled()
    expect(option1).toHaveAttribute('aria-pressed', 'true')

    await user.click(option2)
    expect(onValueChange).toHaveBeenCalled()
    expect(option2).toHaveAttribute('aria-pressed', 'true')
  })

  it('should handle multiple selection', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()

    render(
      <ToggleGroup multiple onValueChange={onValueChange} aria-label="Test group">
        <ToggleGroup.Toggle value="option1" aria-label="Option 1">
          Option 1
        </ToggleGroup.Toggle>
        <ToggleGroup.Toggle value="option2" aria-label="Option 2">
          Option 2
        </ToggleGroup.Toggle>
      </ToggleGroup>
    )

    const option1 = screen.getByRole('button', { name: 'Option 1' })
    const option2 = screen.getByRole('button', { name: 'Option 2' })

    await user.click(option1)
    expect(onValueChange).toHaveBeenCalled()

    await user.click(option2)
    expect(onValueChange).toHaveBeenCalled()

    await user.click(option1)
    expect(onValueChange).toHaveBeenCalled()
  })

  it('should handle defaultValue', () => {
    render(
      <ToggleGroup defaultValue={['option2']} aria-label="Test group">
        <ToggleGroup.Toggle value="option1" aria-label="Option 1">
          Option 1
        </ToggleGroup.Toggle>
        <ToggleGroup.Toggle value="option2" aria-label="Option 2">
          Option 2
        </ToggleGroup.Toggle>
      </ToggleGroup>
    )

    const option2 = screen.getByRole('button', { name: 'Option 2' })
    expect(option2).toHaveAttribute('aria-pressed', 'true')
  })

  it('should handle controlled value', () => {
    const { rerender } = render(
      <ToggleGroup value={['option1']} aria-label="Test group">
        <ToggleGroup.Toggle value="option1" aria-label="Option 1">
          Option 1
        </ToggleGroup.Toggle>
        <ToggleGroup.Toggle value="option2" aria-label="Option 2">
          Option 2
        </ToggleGroup.Toggle>
      </ToggleGroup>
    )

    const option1 = screen.getByRole('button', { name: 'Option 1' })
    expect(option1).toHaveAttribute('aria-pressed', 'true')

    rerender(
      <ToggleGroup value={['option2']} aria-label="Test group">
        <ToggleGroup.Toggle value="option1" aria-label="Option 1">
          Option 1
        </ToggleGroup.Toggle>
        <ToggleGroup.Toggle value="option2" aria-label="Option 2">
          Option 2
        </ToggleGroup.Toggle>
      </ToggleGroup>
    )

    const option2 = screen.getByRole('button', { name: 'Option 2' })
    expect(option2).toHaveAttribute('aria-pressed', 'true')
  })

  it('should handle disabled toggle', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()

    render(
      <ToggleGroup onValueChange={onValueChange} aria-label="Test group">
        <ToggleGroup.Toggle value="option1" aria-label="Option 1" disabled>
          Option 1
        </ToggleGroup.Toggle>
        <ToggleGroup.Toggle value="option2" aria-label="Option 2">
          Option 2
        </ToggleGroup.Toggle>
      </ToggleGroup>
    )

    const option1 = screen.getByRole('button', { name: 'Option 1' })
    await user.click(option1)

    expect(onValueChange).not.toHaveBeenCalled()
    expect(option1).toBeDisabled()
  })

  it('should render with asChild', () => {
    render(
      <ToggleGroup aria-label="Test group">
        <ToggleGroup.Toggle value="option1" aria-label="Option 1" asChild>
          <a href="#" data-testid="custom-link">
            Custom Element
          </a>
        </ToggleGroup.Toggle>
      </ToggleGroup>
    )

    const link = screen.getByTestId('custom-link')
    expect(link).toHaveAttribute('href', '#')
    expect(link).toHaveAttribute('aria-pressed', 'false')
    expect(link).toHaveAttribute('data-spark-component', 'toggle-group-toggle')
  })

  describe('Keyboard navigation', () => {
    it('should maintain focus after click', async () => {
      const user = userEvent.setup()

      render(
        <ToggleGroup aria-label="Test group">
          <ToggleGroup.Toggle value="option1" aria-label="Option 1">
            Option 1
          </ToggleGroup.Toggle>
          <ToggleGroup.Toggle value="option2" aria-label="Option 2">
            Option 2
          </ToggleGroup.Toggle>
        </ToggleGroup>
      )

      const option1 = screen.getByRole('button', { name: 'Option 1' })

      // Click should focus the element
      await user.click(option1)
      expect(document.activeElement).toBe(option1)
    })

    it('should navigate with arrow keys', async () => {
      const user = userEvent.setup()

      render(
        <ToggleGroup aria-label="Test group">
          <ToggleGroup.Toggle value="option1" aria-label="Option 1">
            Option 1
          </ToggleGroup.Toggle>
          <ToggleGroup.Toggle value="option2" aria-label="Option 2">
            Option 2
          </ToggleGroup.Toggle>
          <ToggleGroup.Toggle value="option3" aria-label="Option 3">
            Option 3
          </ToggleGroup.Toggle>
        </ToggleGroup>
      )

      const option1 = screen.getByRole('button', { name: 'Option 1' })
      const option2 = screen.getByRole('button', { name: 'Option 2' })
      const option3 = screen.getByRole('button', { name: 'Option 3' })

      // Focus first option
      option1.focus()
      expect(document.activeElement).toBe(option1)

      // Arrow right should move to option2
      await user.keyboard('{ArrowRight}')
      expect(document.activeElement).toBe(option2)

      // Arrow right should move to option3
      await user.keyboard('{ArrowRight}')
      expect(document.activeElement).toBe(option3)

      // Arrow left should move back to option2
      await user.keyboard('{ArrowLeft}')
      expect(document.activeElement).toBe(option2)
    })

    it('should navigate with Home and End keys', async () => {
      const user = userEvent.setup()

      render(
        <ToggleGroup aria-label="Test group">
          <ToggleGroup.Toggle value="option1" aria-label="Option 1">
            Option 1
          </ToggleGroup.Toggle>
          <ToggleGroup.Toggle value="option2" aria-label="Option 2">
            Option 2
          </ToggleGroup.Toggle>
          <ToggleGroup.Toggle value="option3" aria-label="Option 3">
            Option 3
          </ToggleGroup.Toggle>
        </ToggleGroup>
      )

      const option1 = screen.getByRole('button', { name: 'Option 1' })
      const option2 = screen.getByRole('button', { name: 'Option 2' })
      const option3 = screen.getByRole('button', { name: 'Option 3' })

      // Focus middle option
      option2.focus()
      expect(document.activeElement).toBe(option2)

      // End key should move to last option
      await user.keyboard('{End}')
      expect(document.activeElement).toBe(option3)

      // Home key should move to first option
      await user.keyboard('{Home}')
      expect(document.activeElement).toBe(option1)
    })

    it('should skip disabled toggles during navigation', async () => {
      const user = userEvent.setup()

      render(
        <ToggleGroup aria-label="Test group">
          <ToggleGroup.Toggle value="option1" aria-label="Option 1">
            Option 1
          </ToggleGroup.Toggle>
          <ToggleGroup.Toggle value="option2" aria-label="Option 2" disabled>
            Option 2
          </ToggleGroup.Toggle>
          <ToggleGroup.Toggle value="option3" aria-label="Option 3">
            Option 3
          </ToggleGroup.Toggle>
        </ToggleGroup>
      )

      const option1 = screen.getByRole('button', { name: 'Option 1' })
      const option3 = screen.getByRole('button', { name: 'Option 3' })

      // Focus first option
      option1.focus()
      expect(document.activeElement).toBe(option1)

      // Arrow right should skip disabled option2 and move to option3
      await user.keyboard('{ArrowRight}')
      expect(document.activeElement).toBe(option3)
    })
  })
})
