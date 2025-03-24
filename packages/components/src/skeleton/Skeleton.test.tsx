import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Skeleton } from '.'

describe('Skeleton', () => {
  it('should render skeleton with children components', () => {
    const { container } = render(
      <Skeleton label="Loading...">
        <Skeleton.Rectangle width="100%" height={128} />
        <Skeleton.Circle size={64} />
        <Skeleton.Line />
      </Skeleton>
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument()

    expect(container.querySelectorAll('[data-shape="rectangle"]')).toHaveLength(1)
    expect(container.querySelectorAll('[data-shape="circle"]')).toHaveLength(1)
    expect(container.querySelectorAll('[data-shape="line"]')).toHaveLength(1)
  })

  it('should render with as much lines as specified', () => {
    const { container } = render(
      <Skeleton>
        <Skeleton.Line lines={5} />
      </Skeleton>
    )

    expect(container.querySelectorAll('[data-shape="line"]')).toHaveLength(5)
  })

  it('should not be reachable on keyboard navigation', async () => {
    const user = userEvent.setup()

    render(
      <div>
        <button type="button">Previous button</button>
        <Skeleton>
          <Skeleton.Rectangle height={128} />
        </Skeleton>
        <button type="button">Next button</button>
      </div>
    )

    await user.tab()
    expect(screen.getByText('Previous button')).toHaveFocus()

    await user.tab()

    expect(document.querySelector('[data-spark-component="skeleton"]')).not.toHaveFocus()
    expect(screen.getByText('Next button')).toHaveFocus()
  })
})
