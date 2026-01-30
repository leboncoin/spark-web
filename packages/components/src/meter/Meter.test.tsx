import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Meter } from '.'

describe('Meter', () => {
  it('should render', () => {
    render(
      <Meter aria-label="Storage Used" value={24}>
        <Meter.Track />
      </Meter>
    )

    const meterEl = screen.getByRole('meter', { name: 'Storage Used' })

    expect(meterEl).toBeInTheDocument()
    expect(meterEl).toHaveAttribute('aria-valuemin', '0')
    expect(meterEl).toHaveAttribute('aria-valuemax', '100')
    expect(meterEl).toHaveAttribute('aria-valuenow', '24')
  })

  it('should render using a label', () => {
    render(
      <Meter value={50}>
        <Meter.Label>Storage Used</Meter.Label>
        <Meter.Track />
      </Meter>
    )

    expect(screen.getByRole('meter', { name: 'Storage Used' })).toBeInTheDocument()
  })

  it('should render expected meter when value prop is set', () => {
    const value = 50

    render(
      <Meter value={value}>
        <Meter.Label>Storage Used</Meter.Label>
        <Meter.Track />
      </Meter>
    )

    const meterEl = screen.getByRole('meter', { name: 'Storage Used' })

    expect(meterEl).toHaveAttribute('aria-valuenow', value.toString())
    expect(meterEl).toHaveAttribute('aria-valuetext', `${value}%`)
  })

  it('should render expected meter when value and max props are set', () => {
    const value = 1
    const max = 4

    render(
      <Meter value={value} max={max}>
        <Meter.Label>Storage Used</Meter.Label>
        <Meter.Track />
      </Meter>
    )

    const meterEl = screen.getByRole('meter', { name: 'Storage Used' })

    expect(meterEl).toHaveAttribute('aria-valuemax', max.toString())
    expect(meterEl).toHaveAttribute('aria-valuenow', value.toString())
    // BaseMeter exposes the value as a percentage string, not normalized with max
    expect(meterEl).toHaveAttribute('aria-valuetext', `${value}%`)
  })

  it('should render value label', () => {
    render(
      <Meter
        value={1}
        max={4}
        getAriaValueText={(_formattedValue, value) =>
          `${value} out of 4 actions made to earn the reward`
        }
      >
        <Meter.Label>Storage Used</Meter.Label>
        <Meter.Track />
      </Meter>
    )

    expect(screen.getByRole('meter', { name: 'Storage Used' })).toHaveAttribute(
      'aria-valuetext',
      '1 out of 4 actions made to earn the reward'
    )
  })
})
