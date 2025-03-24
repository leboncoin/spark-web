import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { ProgressTracker } from './'

const defaultProps = {
  'aria-label': 'Progress tracker',
  stepIndex: 1,
  children: (
    <>
      <ProgressTracker.Step>
        <ProgressTracker.StepLabel>Build</ProgressTracker.StepLabel>
      </ProgressTracker.Step>
      <ProgressTracker.Step>
        <ProgressTracker.StepLabel>Deploy</ProgressTracker.StepLabel>
      </ProgressTracker.Step>
      <ProgressTracker.Step>
        <ProgressTracker.StepLabel>Iterate</ProgressTracker.StepLabel>
      </ProgressTracker.Step>
    </>
  ),
}

describe('ProgressTracker', () => {
  beforeEach(() => vi.clearAllMocks())

  it('should render with steps', () => {
    render(<ProgressTracker {...defaultProps} />)

    expect(screen.getByLabelText('Progress tracker')).toBeInTheDocument()

    expect(screen.getByText('Build').closest('li')).toHaveAttribute('data-state', 'complete')

    expect(screen.getByText('Deploy').closest('li')).toHaveAttribute('data-state', 'active')
    expect(screen.getByText('Deploy').closest('li')).toHaveAttribute('aria-current', 'step')

    expect(screen.getByText('Iterate').closest('li')).toHaveAttribute('data-state', 'incomplete')
  })

  it('should render with custom indicator content', () => {
    render(
      <ProgressTracker stepIndex={1}>
        <ProgressTracker.Step>
          <ProgressTracker.StepIndicator complete={<span>A is done!</span>} incomplete="A" />
          <ProgressTracker.StepLabel>Build</ProgressTracker.StepLabel>
        </ProgressTracker.Step>
        <ProgressTracker.Step>
          <ProgressTracker.StepIndicator complete={<span>B is done!</span>} incomplete="B" />
          <ProgressTracker.StepLabel>Deploy</ProgressTracker.StepLabel>
        </ProgressTracker.Step>
        <ProgressTracker.Step>
          <ProgressTracker.StepIndicator complete={<span>C is done!</span>} incomplete="C" />
          <ProgressTracker.StepLabel>Iterate</ProgressTracker.StepLabel>
        </ProgressTracker.Step>
      </ProgressTracker>
    )

    expect(screen.getByText('A is done!')).toBeInTheDocument()
    expect(screen.getByText('B')).toBeInTheDocument()
    expect(screen.getByText('C')).toBeInTheDocument()
  })

  it('should handle callback on step click, except if step is disabled', async () => {
    const user = userEvent.setup()

    const props = {
      onStepClick: vi.fn(),
    }

    render(
      <ProgressTracker {...props}>
        <ProgressTracker.Step aria-label="Build" />
        <ProgressTracker.Step aria-label="Deploy" />
        <ProgressTracker.Step aria-label="Iterate" disabled />
      </ProgressTracker>
    )

    await user.click(screen.getByLabelText('Build'))
    await user.click(screen.getByLabelText('Iterate'))

    expect(props.onStepClick).toHaveBeenCalledTimes(1)
  })

  it('should not handle callback on readonly mode', async () => {
    const user = userEvent.setup()

    const props = {
      ...defaultProps,
      onStepClick: vi.fn(),
      readOnly: true,
    }

    render(<ProgressTracker {...props} />)

    await user.click(screen.getByText('Build'))

    expect(props.onStepClick).not.toHaveBeenCalled()
  })
})
