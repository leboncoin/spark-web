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
  onValueChange?: (value: string) => void
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
    it('renders all items as radio buttons', () => {
      renderSegmentedControl()

      expect(screen.getByRole('radio', { name: 'Day' })).toBeInTheDocument()
      expect(screen.getByRole('radio', { name: 'Week' })).toBeInTheDocument()
      expect(screen.getByRole('radio', { name: 'Month' })).toBeInTheDocument()
    })

    it('renders the root as a radiogroup', () => {
      renderSegmentedControl()

      expect(screen.getByRole('radiogroup')).toBeInTheDocument()
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

      expect(screen.getByRole('radio', { name: 'Week' })).toHaveAttribute('aria-checked', 'true')
      expect(screen.getByRole('radio', { name: 'Day' })).toHaveAttribute('aria-checked', 'false')
    })

    it('changes selection when clicking another item', async () => {
      const user = userEvent.setup()

      renderSegmentedControl({ defaultValue: 'day' })

      await user.click(screen.getByRole('radio', { name: 'Week' }))

      expect(screen.getByRole('radio', { name: 'Week' })).toHaveAttribute('aria-checked', 'true')
      expect(screen.getByRole('radio', { name: 'Day' })).toHaveAttribute('aria-checked', 'false')
    })
  })

  describe('controlled', () => {
    it('reflects the controlled value', () => {
      renderSegmentedControl({ value: 'month' })

      expect(screen.getByRole('radio', { name: 'Month' })).toHaveAttribute('aria-checked', 'true')
    })

    it('calls onValueChange when an item is clicked', async () => {
      const user = userEvent.setup()
      const onValueChange = vi.fn()

      renderSegmentedControl({ value: 'day', onValueChange })

      await user.click(screen.getByRole('radio', { name: 'Week' }))

      expect(onValueChange).toHaveBeenCalledTimes(1)
      expect(onValueChange).toHaveBeenCalledWith('week')
    })
  })

  describe('disabled', () => {
    it('does not trigger onValueChange when clicking a disabled item', async () => {
      const user = userEvent.setup()
      const onValueChange = vi.fn()

      renderSegmentedControl({ defaultValue: 'week', onValueChange, disabled: true })

      await user.click(screen.getByRole('radio', { name: 'Day' }))

      expect(onValueChange).not.toHaveBeenCalled()
    })

    it('marks the disabled item with data-disabled attribute', () => {
      renderSegmentedControl({ disabled: true })

      expect(screen.getByRole('radio', { name: 'Day' })).toHaveAttribute('data-disabled')
    })
  })

  describe('keyboard navigation', () => {
    it('navigates between items with arrow keys', async () => {
      const user = userEvent.setup()

      renderSegmentedControl({ defaultValue: 'day' })

      screen.getByRole('radio', { name: 'Day' }).focus()
      await user.keyboard('{ArrowRight}')

      expect(screen.getByRole('radio', { name: 'Week' })).toHaveFocus()
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

    it('items have aria-checked attribute', () => {
      renderSegmentedControl({ defaultValue: 'day' })

      items.forEach(({ label }) => {
        expect(screen.getByRole('radio', { name: label })).toHaveAttribute('aria-checked')
      })
    })
  })
})
