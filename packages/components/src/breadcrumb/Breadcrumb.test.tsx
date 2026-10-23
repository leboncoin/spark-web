import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Breadcrumb } from '.'

describe('Breadcrumb', () => {
  it('should render all parts', () => {
    // Given a breadcrumb with links, separator and current page item.
    render(
      <Breadcrumb aria-label="Breadcrumb">
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
        </Breadcrumb.Item>

        <Breadcrumb.Separator />

        <Breadcrumb.Item>
          <Breadcrumb.Link href="/docs/components">Components</Breadcrumb.Link>
        </Breadcrumb.Item>

        <Breadcrumb.Separator />

        <Breadcrumb.Item>
          <Breadcrumb.CurrentPage>Breadcrumb</Breadcrumb.CurrentPage>
        </Breadcrumb.Item>
      </Breadcrumb>
    )

    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument()

    // Then Breadcrumb links should be rendered
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'Components' })).toHaveAttribute(
      'href',
      '/docs/components'
    )

    // Then breadcrumb current page should be rendered
    const currentPageLink = screen.getByRole('link', { name: 'Breadcrumb' })
    expect(currentPageLink).toHaveAttribute('aria-current', 'page')

    // Then separators should be rendered (hidden)
    expect(screen.getAllByRole('presentation', { hidden: true })).toHaveLength(2)
  })

  it('should render custom separators', () => {
    // Given a breadcrumb with links, separator and current page item.
    render(
      <Breadcrumb aria-label="Breadcrumb">
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
        </Breadcrumb.Item>

        <Breadcrumb.Separator>__</Breadcrumb.Separator>

        <Breadcrumb.Item>
          <Breadcrumb.Link href="/docs/components">Components</Breadcrumb.Link>
        </Breadcrumb.Item>

        <Breadcrumb.Separator>__</Breadcrumb.Separator>

        <Breadcrumb.Item>
          <Breadcrumb.CurrentPage>Breadcrumb</Breadcrumb.CurrentPage>
        </Breadcrumb.Item>
      </Breadcrumb>
    )

    // Then separators should be rendered with their custom content
    expect(screen.getAllByText('__')).toHaveLength(2)
  })

  it('should apply link styles without leaking styling props when using asChild', () => {
    render(
      <Breadcrumb aria-label="Breadcrumb">
        <Breadcrumb.Item>
          <Breadcrumb.Link asChild>
            <a href="/">Home</a>
          </Breadcrumb.Link>
        </Breadcrumb.Item>
      </Breadcrumb>
    )

    const link = screen.getByRole('link', { name: 'Home' })

    expect(link).toHaveAttribute('href', '/')
    expect(link).toHaveAttribute('data-spark-component', 'breadcrumb-link')
    expect(link).toHaveClass('font-medium', 'underline')
    expect(link).not.toHaveAttribute('bold')
    expect(link).not.toHaveAttribute('intent')
    expect(link).not.toHaveAttribute('underline')
  })
})
