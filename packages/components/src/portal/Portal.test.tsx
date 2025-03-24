import { render, screen, within } from '@testing-library/react'
import { useState } from 'react'
import { describe, expect, it } from 'vitest'

import { Portal } from './Portal'

describe('Portal', () => {
  it('should render wrapped element inside document.body', async () => {
    // When we display an article with portalled element
    render(
      <section aria-labelledby="article-subject">
        <p id="article-subject">Article title</p>
        <Portal>
          <p>Wrapped JSX element</p>
        </Portal>
      </section>
    )

    const articleBlock = screen.getByRole('region', { name: 'Article title' })

    // Then the wrapped element is no longer in the article...
    expect(within(articleBlock).queryByText('Wrapped JSX element')).not.toBeInTheDocument()

    // ...but is located in the body instead
    expect(screen.queryByText('Wrapped JSX element')).toBeInTheDocument()
  })

  it('should render wrapped element inside a specific container', () => {
    // Given we want to display an element in a different container than its parent
    const WithCustomContainer = () => {
      const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(null)

      return (
        <div>
          <section aria-labelledby="article-1">
            <p id="article-1">Article 1</p>
            <Portal container={portalContainer}>
              <p>Wrapped JSX element</p>
            </Portal>
          </section>

          <section aria-labelledby="article-2">
            <p id="article-2">Article 2</p>
            <div ref={setPortalContainer} />
          </section>
        </div>
      )
    }

    // When we render the page
    render(<WithCustomContainer />)

    const article1 = screen.getByRole('region', { name: 'Article 1' })
    const article2 = screen.getByRole('region', { name: 'Article 2' })

    // Then the wrapped element is no longer in the article...
    expect(within(article1).queryByText('Wrapped JSX element')).not.toBeInTheDocument()

    // ...but is located in the custom container instead
    expect(within(article2).getByText('Wrapped JSX element')).toBeInTheDocument()
  })
})
