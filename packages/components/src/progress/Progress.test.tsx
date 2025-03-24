import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Progress } from '.'

describe('Progress', () => {
  it('should render', () => {
    render(
      <Progress aria-label="Loading">
        <Progress.Bar />
      </Progress>
    )

    const progressEl = screen.getByRole('progressbar', { name: 'Loading' })

    expect(progressEl).toBeInTheDocument()
    expect(progressEl).toHaveAttribute('aria-valuemin', '0')
    expect(progressEl).toHaveAttribute('aria-valuemax', '100')
  })

  it('should render using a label', () => {
    render(
      <Progress>
        <Progress.Label>Loading</Progress.Label>
        <Progress.Bar />
      </Progress>
    )

    expect(screen.getByRole('progressbar', { name: 'Loading' })).toBeInTheDocument()
  })

  it('should render expected progress when value prop is set', () => {
    const value = 50

    render(
      <Progress value={value}>
        <Progress.Label>Loading</Progress.Label>
        <Progress.Bar />
      </Progress>
    )

    const progressEl = screen.getByRole('progressbar', { name: 'Loading' })

    expect(progressEl).toHaveAttribute('aria-valuenow', value.toString())
    expect(progressEl).toHaveAttribute('aria-valuetext', `${value}%`)
  })

  it('should render expected progress when value and max props are set', () => {
    const value = 1
    const max = 4

    render(
      <Progress value={value} max={max}>
        <Progress.Label>Rewards</Progress.Label>
        <Progress.Bar />
      </Progress>
    )

    const progressEl = screen.getByRole('progressbar', { name: 'Rewards' })

    expect(progressEl).toHaveAttribute('aria-valuemax', max.toString())
    expect(progressEl).toHaveAttribute('aria-valuenow', value.toString())
    expect(progressEl).toHaveAttribute('aria-valuetext', '25%')
  })

  it('should render value label', () => {
    render(
      <Progress
        value={1}
        max={4}
        getValueLabel={(value, max) => `${value} out of ${max} actions made to earn the reward`}
      >
        <Progress.Label>Rewards</Progress.Label>
        <Progress.Bar />
      </Progress>
    )

    expect(screen.getByRole('progressbar', { name: 'Rewards' })).toHaveAttribute(
      'aria-valuetext',
      '1 out of 4 actions made to earn the reward'
    )
  })

  it('should render indeterminate state', () => {
    render(
      <Progress aria-label="Loading" isIndeterminate>
        <Progress.Bar />
      </Progress>
    )

    const progressEl = screen.getByRole('progressbar', { name: 'Loading' })

    expect(progressEl).not.toHaveAttribute('aria-valuenow')
  })
})
