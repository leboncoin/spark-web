import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { LinkBox } from '.'

describe('LinkOverlay', () => {
  it('should render', async () => {
    render(
      <LinkBox asChild>
        <article>
          <h2>
            <LinkBox.Link href="#">Title</LinkBox.Link>
          </h2>
        </article>
      </LinkBox>
    )

    const el = screen.getByRole('heading', { name: 'Title', level: 2 })

    expect(el).toBeInTheDocument()

    expect(within(el).getByRole('link', { name: 'Title' })).toBeInTheDocument()
  })
})

describe('LinkBox.Raised', () => {
  it('should render with proper z-index and position classes', () => {
    render(
      <LinkBox asChild>
        <article>
          <h2>
            <LinkBox.Raised>
              <LinkBox.Link href="#">Raised Link</LinkBox.Link>
            </LinkBox.Raised>
          </h2>
        </article>
      </LinkBox>
    )

    const link = screen.getByRole('link', { name: 'Raised Link' })

    expect(link).toHaveClass('default:z-raised')
    expect(link).toHaveClass('default:relative')
  })

  it('should merge custom className with default classes', () => {
    render(
      <LinkBox asChild>
        <article>
          <LinkBox.Raised className="custom-class">
            <LinkBox.Link href="#">Custom Link</LinkBox.Link>
          </LinkBox.Raised>
        </article>
      </LinkBox>
    )

    const link = screen.getByRole('link', { name: 'Custom Link' })

    expect(link).toHaveClass('default:z-raised')
    expect(link).toHaveClass('default:relative')
    expect(link).toHaveClass('custom-class')
  })
})
