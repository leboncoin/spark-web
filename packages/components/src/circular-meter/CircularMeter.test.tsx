import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CircularMeter } from '.'

describe('CircularMeter', () => {
  it('should render', () => {
    render(
      <CircularMeter aria-label="Storage Used" value={24}>
        <CircularMeter.Track />
      </CircularMeter>
    )

    const meterEl = screen.getByRole('meter', { name: 'Storage Used' })

    expect(meterEl).toBeInTheDocument()
    expect(meterEl).toHaveAttribute('aria-valuemin', '0')
    expect(meterEl).toHaveAttribute('aria-valuemax', '100')
    expect(meterEl).toHaveAttribute('aria-valuenow', '24')
  })

  it('should link the meter with its label via aria-labelledby', () => {
    const { getByText } = render(
      <CircularMeter value={50}>
        <CircularMeter.Track />
        <CircularMeter.Label>Storage Used</CircularMeter.Label>
      </CircularMeter>
    )

    const labelEl = getByText('Storage Used')
    const meterEl = screen.getByRole('meter', { name: 'Storage Used' })

    expect(labelEl).toBeInTheDocument()
    expect(labelEl).toHaveAttribute('id')
    expect(meterEl).toHaveAttribute('aria-labelledby', labelEl.id)
  })

  it('should render using a label', () => {
    render(
      <CircularMeter value={50}>
        <CircularMeter.Track />
        <CircularMeter.Label>Storage Used</CircularMeter.Label>
      </CircularMeter>
    )

    expect(screen.getByRole('meter', { name: 'Storage Used' })).toBeInTheDocument()
  })

  it('should render expected meter when value prop is set', () => {
    const value = 50

    render(
      <CircularMeter value={value}>
        <CircularMeter.Track />
        <CircularMeter.Label>Storage Used</CircularMeter.Label>
      </CircularMeter>
    )

    const meterEl = screen.getByRole('meter', { name: 'Storage Used' })

    expect(meterEl).toHaveAttribute('aria-valuenow', value.toString())
    expect(meterEl).toHaveAttribute('aria-valuetext', `${value}%`)
  })

  it('should render expected meter when value and max props are set', () => {
    const value = 1
    const max = 4

    render(
      <CircularMeter value={value} max={max}>
        <CircularMeter.Track />
        <CircularMeter.Label>Storage Used</CircularMeter.Label>
      </CircularMeter>
    )

    const meterEl = screen.getByRole('meter', { name: 'Storage Used' })

    expect(meterEl).toHaveAttribute('aria-valuemax', max.toString())
    expect(meterEl).toHaveAttribute('aria-valuenow', value.toString())
    // BaseMeter exposes the value as a percentage string, not normalized with max
    expect(meterEl).toHaveAttribute('aria-valuetext', `${value}%`)
  })

  it('should render expected meter when value, min and max props are set', () => {
    const value = 20
    const min = 10
    const max = 30

    render(
      <CircularMeter value={value} min={min} max={max}>
        <CircularMeter.Track />
        <CircularMeter.Label>Storage Used</CircularMeter.Label>
      </CircularMeter>
    )

    const meterEl = screen.getByRole('meter', { name: 'Storage Used' })

    expect(meterEl).toHaveAttribute('aria-valuemin', min.toString())
    expect(meterEl).toHaveAttribute('aria-valuemax', max.toString())
    expect(meterEl).toHaveAttribute('aria-valuenow', value.toString())
    // (value - min) / (max - min) => (20 - 10) / (30 - 10) = 0.5 => 50%
    // BaseMeter exposes the value as a percentage string even when min/max are provided
    expect(meterEl).toHaveAttribute('aria-valuetext', `${value}%`)
  })

  it('should use aria-label on label when its visible text is not a good accessible name', () => {
    render(
      <CircularMeter value={70}>
        <CircularMeter.Track>
          <CircularMeter.Value />
          <CircularMeter.Label aria-label="missed calls">of missed calls</CircularMeter.Label>
        </CircularMeter.Track>
      </CircularMeter>
    )

    const meterEl = screen.getByRole('meter', { name: 'missed calls' })

    expect(meterEl).toBeInTheDocument()
    expect(screen.getByText('of missed calls')).toBeInTheDocument()
  })

  it('should render correct size when using size prop', () => {
    const { container } = render(
      <CircularMeter value={10} size="sm" aria-label="Storage Used">
        <CircularMeter.Track />
      </CircularMeter>
    )

    const svg = container.querySelector('svg')

    expect(svg).not.toBeNull()
    expect(svg).toHaveAttribute('width', '24')
    expect(svg).toHaveAttribute('height', '24')
  })

  it('should apply intent classes to the indicator', () => {
    render(
      <CircularMeter value={70} intent="success" aria-label="Storage Used">
        <CircularMeter.Track />
      </CircularMeter>
    )

    const indicator = document.querySelector('[data-spark-component="circular-meter-indicator"]')

    expect(indicator).not.toBeNull()
    expect(indicator).toHaveClass('text-success')
  })

  describe('CircularMeter.Content', () => {
    it('should render with correct data-spark-component attribute', () => {
      const { container } = render(
        <CircularMeter value={50} aria-label="Storage Used">
          <CircularMeter.Track />
          <CircularMeter.Content>
            <CircularMeter.Value />
            <CircularMeter.Label>Storage Used</CircularMeter.Label>
          </CircularMeter.Content>
        </CircularMeter>
      )

      const contentEl = container.querySelector('[data-spark-component="circular-meter-content"]')

      expect(contentEl).toBeInTheDocument()
    })

    it('should render children correctly', () => {
      render(
        <CircularMeter value={50} aria-label="Storage Used">
          <CircularMeter.Track />
          <CircularMeter.Content>
            <CircularMeter.Value />
            <CircularMeter.Label>Storage Used</CircularMeter.Label>
          </CircularMeter.Content>
        </CircularMeter>
      )

      expect(screen.getByText('Storage Used')).toBeInTheDocument()
      expect(screen.getByRole('meter', { name: 'Storage Used' })).toBeInTheDocument()
    })

    it('should apply vertical orientation classes by default', () => {
      const { container } = render(
        <CircularMeter value={50} aria-label="Storage Used" orientation="vertical">
          <CircularMeter.Track />
          <CircularMeter.Content>
            <CircularMeter.Value />
            <CircularMeter.Label>Storage Used</CircularMeter.Label>
          </CircularMeter.Content>
        </CircularMeter>
      )

      const contentEl = container.querySelector('[data-spark-component="circular-meter-content"]')

      expect(contentEl).toHaveClass('default:text-center')
    })

    it('should apply horizontal orientation classes when orientation is horizontal', () => {
      const { container } = render(
        <CircularMeter value={50} aria-label="Storage Used" orientation="horizontal">
          <CircularMeter.Track />
          <CircularMeter.Content>
            <CircularMeter.Value />
            <CircularMeter.Label>Storage Used</CircularMeter.Label>
          </CircularMeter.Content>
        </CircularMeter>
      )

      const contentEl = container.querySelector('[data-spark-component="circular-meter-content"]')

      expect(contentEl).not.toHaveClass('default:text-center')
    })

    it('should work with Value and Label inside Content', () => {
      render(
        <CircularMeter value={75} aria-label="Storage Used">
          <CircularMeter.Track />
          <CircularMeter.Content>
            <CircularMeter.Value />
            <CircularMeter.Label>Storage Used</CircularMeter.Label>
          </CircularMeter.Content>
        </CircularMeter>
      )

      const meterEl = screen.getByRole('meter', { name: 'Storage Used' })

      expect(meterEl).toBeInTheDocument()
      expect(meterEl).toHaveAttribute('aria-valuenow', '75')
      expect(screen.getByText('Storage Used')).toBeInTheDocument()
    })

    it('should link the meter with its label via aria-labelledby when using Content', () => {
      const { getByText } = render(
        <CircularMeter value={50}>
          <CircularMeter.Track />
          <CircularMeter.Content>
            <CircularMeter.Label>Storage Used</CircularMeter.Label>
          </CircularMeter.Content>
        </CircularMeter>
      )

      const labelEl = getByText('Storage Used')
      const meterEl = screen.getByRole('meter', { name: 'Storage Used' })

      expect(labelEl).toBeInTheDocument()
      expect(labelEl).toHaveAttribute('id')
      expect(meterEl).toHaveAttribute('aria-labelledby', labelEl.id)
    })

    it('should accept custom className', () => {
      const { container } = render(
        <CircularMeter value={50} aria-label="Storage Used">
          <CircularMeter.Track />
          <CircularMeter.Content className="custom-class">
            <CircularMeter.Value />
            <CircularMeter.Label>Storage Used</CircularMeter.Label>
          </CircularMeter.Content>
        </CircularMeter>
      )

      const contentEl = container.querySelector('[data-spark-component="circular-meter-content"]')

      expect(contentEl).toHaveClass('custom-class')
    })
  })
})
