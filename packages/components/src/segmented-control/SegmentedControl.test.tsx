import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { SegmentedControl } from '.'

const items = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
]

const renderSegmentedControl = ({
  defaultValue,
  value,
  onValueChange,
  disabled,
}: {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string | null) => void
  disabled?: boolean
} = {}) => {
  return render(
    <SegmentedControl defaultValue={defaultValue} value={value} onValueChange={onValueChange}>
      <SegmentedControl.Indicator />
      {items.map(({ value: v, label }) => (
        <SegmentedControl.Item key={v} value={v} disabled={disabled && v === 'day'}>
          {label}
        </SegmentedControl.Item>
      ))}
    </SegmentedControl>
  )
}

describe('SegmentedControl', () => {
  describe('rendering', () => {
    it('renders all items', () => {
      renderSegmentedControl()

      expect(screen.getByRole('button', { name: 'Day' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Week' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Month' })).toBeInTheDocument()
    })

    it('renders data-spark-component attributes', () => {
      const { container } = renderSegmentedControl()

      expect(
        container.querySelector('[data-spark-component="segmented-control"]')
      ).toBeInTheDocument()
      expect(
        container.querySelector('[data-spark-component="segmented-control-item"]')
      ).toBeInTheDocument()
    })

    it('renders the indicator when a value is selected', () => {
      const { container } = renderSegmentedControl({ defaultValue: 'week' })

      expect(
        container.querySelector('[data-spark-component="segmented-control-indicator"]')
      ).toBeInTheDocument()
    })

    it('renders the indicator on the first item when no value is specified', () => {
      const { container } = renderSegmentedControl()

      expect(
        container.querySelector('[data-spark-component="segmented-control-indicator"]')
      ).toBeInTheDocument()
    })
  })

  describe('uncontrolled', () => {
    it('selects the defaultValue item on mount', () => {
      renderSegmentedControl({ defaultValue: 'week' })

      expect(screen.getByRole('button', { name: 'Week' })).toHaveAttribute('aria-pressed', 'true')
      expect(screen.getByRole('button', { name: 'Day' })).toHaveAttribute('aria-pressed', 'false')
    })

    it('changes selection when clicking another item', async () => {
      const user = userEvent.setup()

      renderSegmentedControl({ defaultValue: 'day' })

      await user.click(screen.getByRole('button', { name: 'Week' }))

      expect(screen.getByRole('button', { name: 'Week' })).toHaveAttribute('aria-pressed', 'true')
      expect(screen.getByRole('button', { name: 'Day' })).toHaveAttribute('aria-pressed', 'false')
    })

    it('deselects when clicking the already-selected item', async () => {
      const user = userEvent.setup()

      renderSegmentedControl({ defaultValue: 'day' })

      await user.click(screen.getByRole('button', { name: 'Day' }))

      expect(screen.getByRole('button', { name: 'Day' })).toHaveAttribute('aria-pressed', 'false')
    })
  })

  describe('controlled', () => {
    it('reflects the controlled value', () => {
      renderSegmentedControl({ value: 'month' })

      expect(screen.getByRole('button', { name: 'Month' })).toHaveAttribute('aria-pressed', 'true')
    })

    it('calls onValueChange when an item is clicked', async () => {
      const user = userEvent.setup()
      const onValueChange = vi.fn()

      renderSegmentedControl({ value: 'day', onValueChange })

      await user.click(screen.getByRole('button', { name: 'Week' }))

      expect(onValueChange).toHaveBeenCalledTimes(1)
      expect(onValueChange).toHaveBeenCalledWith('week')
    })

    it('calls onValueChange with null when deselecting', async () => {
      const user = userEvent.setup()
      const onValueChange = vi.fn()

      renderSegmentedControl({ value: 'day', onValueChange })

      await user.click(screen.getByRole('button', { name: 'Day' }))

      expect(onValueChange).toHaveBeenCalledWith(null)
    })
  })

  describe('disabled', () => {
    it('does not trigger onValueChange when clicking a disabled item', async () => {
      const user = userEvent.setup()
      const onValueChange = vi.fn()

      renderSegmentedControl({ defaultValue: 'week', onValueChange, disabled: true })

      await user.click(screen.getByRole('button', { name: 'Day' }))

      expect(onValueChange).not.toHaveBeenCalled()
    })

    it('marks the disabled item with a disabled attribute', () => {
      renderSegmentedControl({ disabled: true })

      expect(screen.getByRole('button', { name: 'Day' })).toBeDisabled()
    })
  })

  describe('keyboard navigation', () => {
    it('navigates between items with arrow keys', async () => {
      const user = userEvent.setup()

      renderSegmentedControl({ defaultValue: 'day' })

      await user.click(screen.getByRole('button', { name: 'Day' }))
      await user.keyboard('{ArrowRight}')

      expect(screen.getByRole('button', { name: 'Week' })).toHaveFocus()
    })
  })

  describe('a11y', () => {
    it('indicator is aria-hidden', () => {
      const { container } = renderSegmentedControl({ defaultValue: 'day' })

      const indicator = container.querySelector(
        '[data-spark-component="segmented-control-indicator"]'
      )

      expect(indicator).toHaveAttribute('aria-hidden')
    })

    it('items have aria-pressed attribute', () => {
      renderSegmentedControl({ defaultValue: 'day' })

      items.forEach(({ label }) => {
        expect(screen.getByRole('button', { name: label })).toHaveAttribute('aria-pressed')
      })
    })
  })
})
