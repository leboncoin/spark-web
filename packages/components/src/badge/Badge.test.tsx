import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Badge } from './Badge'

describe('Badge', () => {
  it('should render', () => {
    render(<Badge />)

    expect(document.querySelector('[data-spark-component="badge"]')).toBeInTheDocument()
  })

  it('should be empty by default', () => {
    render(<Badge />)

    expect(document.querySelector('[data-spark-component="badge"]')).toBeEmptyDOMElement()
  })

  it('should has DOM content when passing a children', () => {
    render(<Badge>Hello World!</Badge>)

    const helloWorldContent = (content: string, element: Element | null) => {
      return element?.tagName.toLowerCase() === 'div' && content.startsWith('Hello World!')
    }
    const childrenWithText = screen.getByText(helloWorldContent)

    expect(childrenWithText).toBeInTheDocument()
  })

  it('should print properly the content when there is no count', () => {
    const renderedComponent = render(<Badge />)

    expect(renderedComponent.container.firstChild).toBeEmptyDOMElement()
  })

  it('should print properly the content when count is 1', () => {
    render(<Badge count={1} />)

    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('should print properly the content when count is 99', () => {
    render(<Badge count={99} />)

    expect(screen.getByText('99')).toBeInTheDocument()
  })

  it('should print properly the content when count is 100', () => {
    render(<Badge count={100} />)

    expect(screen.getByText('99+')).toBeInTheDocument()
  })

  it('should print properly the aria-label when there is no count', () => {
    render(<Badge aria-label="New notification" />)

    expect(screen.getByLabelText('New notification')).toBeInTheDocument()
  })

  it('should print properly the aria-label when count is 100', () => {
    render(
      <Badge
        count={100}
        aria-label={({ overflowCount }) => `More than ${overflowCount} notifications`}
      />
    )

    expect(screen.getByLabelText('More than 99 notifications')).toBeInTheDocument()
  })
})
