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
