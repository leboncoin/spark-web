import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Pagination } from '.'

// UAT: https://docs.google.com/spreadsheets/d/17jv2dBf961p1BIRQ6mKHOmwnoqdYypcFt6od2xeMAGo/edit?gid=762410094#gid=762410094

describe('Pagination', () => {
  it('Should render pagination', async () => {
    const user = userEvent.setup()

    // Given a pagination with 10 pages of 10 item items each, and a length of 7
    render(
      <Pagination
        visiblePageItems={7}
        type="button"
        aria-label="Pagination"
        count={100}
        pageSize={10}
      >
        <Pagination.PrevTrigger aria-label="Previous page" />
        <Pagination.Pages>
          {({ pages, totalPages }) =>
            pages.map((page, index) =>
              page.type === 'page' ? (
                <Pagination.Item
                  key={index}
                  value={page.value}
                  aria-label={
                    page.value === totalPages
                      ? `Last page, page ${page.value}`
                      : `Page ${page.value}`
                  }
                >
                  {page.value}
                </Pagination.Item>
              ) : (
                <Pagination.Ellipsis key={index} index={index} />
              )
            )
          }
        </Pagination.Pages>
        <Pagination.NextTrigger aria-label="Next page" />
      </Pagination>
    )

    // The pages 6 to 9 are not visible (ellipsis) and "previous page" button is disabled
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Page 1' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Page 2' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Page 3' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Page 4' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Page 5' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Page 6' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Page 7' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Page 8' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Page 9' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Last page, page 10' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Next page' })).not.toBeDisabled()

    // When I click on page 5 (of 10)
    await user.click(screen.getByRole('button', { name: 'Page 5' }))

    // Then pages 2 to 3 and 7 to 9 are not visible (ellipsis), direct sibling of page 5 are visible (page 4 and page 6)
    expect(screen.getByRole('button', { name: 'Previous page' })).not.toBeDisabled()
    expect(screen.getByRole('button', { name: 'Page 1' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Page 2' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Page 3' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Page 4' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Page 5' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Page 6' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Page 7' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Page 8' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Page 9' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Last page, page 10' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Next page' })).not.toBeDisabled()

    // When I click on the last page (10 out of 10)
    await user.click(screen.getByRole('button', { name: 'Last page, page 10' }))

    // Then pages 2 to 5 are not visible (ellipsis) and "next page" button is disabled
    expect(screen.getByRole('button', { name: 'Previous page' })).not.toBeDisabled()
    expect(screen.getByRole('button', { name: 'Page 1' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Page 2' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Page 3' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Page 4' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Page 5' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Page 6' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Page 7' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Page 8' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Page 9' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Last page, page 10' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled()
  })

  it('Should render pagination items as links', async () => {
    const user = userEvent.setup()

    // Given a pagination with 10 pages of 10 item items each, and a length of 7
    render(
      <Pagination
        type="link"
        aria-label="Pagination"
        count={100}
        pageSize={10}
        visiblePageItems={7}
      >
        <Pagination.PrevTrigger aria-label="Previous page" href="#prev" />
        <Pagination.Pages>
          {({ pages, totalPages }) =>
            pages.map((page, index) =>
              page.type === 'page' ? (
                <Pagination.Item
                  key={index}
                  value={page.value}
                  href={`#p-${page.value}`}
                  aria-label={
                    page.value === totalPages
                      ? `Last page, page ${page.value}`
                      : `Page ${page.value}`
                  }
                >
                  {page.value}
                </Pagination.Item>
              ) : (
                <Pagination.Ellipsis key={index} index={index} />
              )
            )
          }
        </Pagination.Pages>
        <Pagination.NextTrigger aria-label="Next page" href="#next" />
      </Pagination>
    )

    // The pages 6 to 9 are not visible (ellipsis) and "previous page" button is disabled
    expect(screen.getByRole('link', { name: 'Previous page' })).toHaveAttribute('data-disabled')
    expect(screen.getByRole('link', { name: 'Page 1' })).toHaveAttribute('href', '#p-1')
    expect(screen.getByRole('link', { name: 'Page 2' })).toHaveAttribute('href', '#p-2')
    expect(screen.getByRole('link', { name: 'Page 3' })).toHaveAttribute('href', '#p-3')
    expect(screen.getByRole('link', { name: 'Page 4' })).toHaveAttribute('href', '#p-4')
    expect(screen.getByRole('link', { name: 'Page 5' })).toHaveAttribute('href', '#p-5')
    expect(screen.queryByRole('link', { name: 'Page 6' })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Page 7' })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Page 8' })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Page 9' })).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Last page, page 10' })).toHaveAttribute(
      'href',
      '#p-10'
    )
    expect(screen.getByRole('link', { name: 'Next page' })).not.toHaveAttribute('data-disabled')

    // When I click on the last page (10 out of 10)
    await user.click(screen.getByRole('link', { name: 'Last page, page 10' }))

    // Then pages 2 to 5 are not visible (ellipsis) and "next page" link is disabled
    expect(screen.getByRole('link', { name: 'Previous page' })).not.toHaveAttribute('data-disabled')
    expect(screen.getByRole('link', { name: 'Page 1' })).toHaveAttribute('href', '#p-1')
    expect(screen.queryByRole('link', { name: 'Page 2' })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Page 3' })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Page 4' })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Page 5' })).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Page 6' })).toHaveAttribute('href', '#p-6')
    expect(screen.getByRole('link', { name: 'Page 7' })).toHaveAttribute('href', '#p-7')
    expect(screen.getByRole('link', { name: 'Page 8' })).toHaveAttribute('href', '#p-8')
    expect(screen.getByRole('link', { name: 'Page 9' })).toHaveAttribute('href', '#p-9')
    expect(screen.getByRole('link', { name: 'Last page, page 10' })).toHaveAttribute(
      'href',
      '#p-10'
    )
    expect(screen.getByRole('link', { name: 'Next page' })).toHaveAttribute('data-disabled')
  })

  it('should properly handle disabled links', async () => {
    const user = userEvent.setup()

    // Given a pagination with 10 pages of 10 item items each, and a length of 7
    render(
      <Pagination
        type="link"
        aria-label="Pagination"
        count={100}
        pageSize={10}
        visiblePageItems={7}
      >
        <Pagination.FirstPageTrigger aria-label="First page" href="#first" />
        <Pagination.PrevTrigger aria-label="Previous page" href="#prev" />
        <Pagination.Pages>
          {({ pages, totalPages }) =>
            pages.map((page, index) =>
              page.type === 'page' ? (
                <Pagination.Item
                  key={index}
                  value={page.value}
                  href={`#p-${page.value}`}
                  aria-label={
                    page.value === totalPages
                      ? `Last page, page ${page.value}`
                      : `Page ${page.value}`
                  }
                >
                  {page.value}
                </Pagination.Item>
              ) : (
                <Pagination.Ellipsis key={index} index={index} />
              )
            )
          }
        </Pagination.Pages>
        <Pagination.NextTrigger aria-label="Next page" href="#next" />
        <Pagination.LastPageTrigger aria-label="Last page" href="#last" />
      </Pagination>
    )

    const prevPageLink = screen.getByRole('link', { name: 'Previous page' })
    const firstPageLink = screen.getByRole('link', { name: 'First page' })

    const nextPageLink = screen.getByRole('link', { name: 'Next page' })
    const lastPageLink = screen.getByRole('link', { name: 'Last page' })

    ;[prevPageLink, firstPageLink].forEach(link => {
      expect(link).toHaveAttribute('data-disabled')
      expect(link).toHaveAttribute('role', 'link')
      expect(link).toHaveAttribute('aria-disabled', 'true')
      expect(link).toHaveAttribute('disabled')
      expect(link).not.toHaveAttribute('href')
    })
    ;[nextPageLink, lastPageLink].forEach(link => {
      expect(link).not.toHaveAttribute('data-disabled')
      expect(link).not.toHaveAttribute('role', 'link')
      expect(link).not.toHaveAttribute('aria-disabled', 'true')
      expect(link).not.toHaveAttribute('disabled')
      expect(link).toHaveAttribute('href')
    })

    await user.click(lastPageLink)
    ;[prevPageLink, firstPageLink].forEach(link => {
      expect(link).not.toHaveAttribute('data-disabled')
      expect(link).not.toHaveAttribute('role', 'link')
      expect(link).not.toHaveAttribute('aria-disabled', 'true')
      expect(link).not.toHaveAttribute('disabled')
      expect(link).toHaveAttribute('href')
    })
    ;[nextPageLink, lastPageLink].forEach(link => {
      expect(link).toHaveAttribute('data-disabled')
      expect(link).toHaveAttribute('role', 'link')
      expect(link).toHaveAttribute('aria-disabled', 'true')
      expect(link).toHaveAttribute('disabled')
      expect(link).not.toHaveAttribute('href')
    })
  })

  it('Should render pagination (single page)', async () => {
    // Given a pagination with a single page
    render(
      <Pagination
        type="button"
        aria-label="Pagination"
        count={10}
        pageSize={10}
        visiblePageItems={7}
      >
        <Pagination.PrevTrigger aria-label="Previous page" />
        <Pagination.Pages>
          {({ pages, totalPages }) =>
            pages.map((page, index) =>
              page.type === 'page' ? (
                <Pagination.Item
                  key={index}
                  value={page.value}
                  aria-label={
                    page.value === totalPages
                      ? `Last page, page ${page.value}`
                      : `Page ${page.value}`
                  }
                >
                  {page.value}
                </Pagination.Item>
              ) : (
                <Pagination.Ellipsis key={index} index={index} />
              )
            )
          }
        </Pagination.Pages>
        <Pagination.NextTrigger aria-label="Next page" />
      </Pagination>
    )

    // The only page is visible, and next/previous buttons are disabled
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Last page, page 1' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled()
  })

  it('Should render pagination (no ellipsis)', async () => {
    const user = userEvent.setup()

    // Given a pagination with 10 pages of 10 item items each, and a length of 5 items
    render(
      <Pagination
        type="button"
        aria-label="Pagination"
        count={100}
        pageSize={10}
        visiblePageItems={5}
        noEllipsis
      >
        <Pagination.FirstPageTrigger aria-label="First page" />
        <Pagination.PrevTrigger aria-label="Previous page" />
        <Pagination.Pages>
          {({ pages, totalPages }) =>
            pages.map((page, index) =>
              page.type === 'page' ? (
                <Pagination.Item
                  key={index}
                  value={page.value}
                  aria-label={
                    page.value === totalPages
                      ? `Last page, page ${page.value}`
                      : `Page ${page.value}`
                  }
                >
                  {page.value}
                </Pagination.Item>
              ) : (
                <Pagination.Ellipsis key={index} index={index} />
              )
            )
          }
        </Pagination.Pages>
        <Pagination.NextTrigger aria-label="Next page" />
        <Pagination.LastPageTrigger aria-label="Last page" />
      </Pagination>
    )

    // The pages above 5 are not visible and "previous page" button is disabled
    expect(screen.getByRole('button', { name: 'First page' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Page 1' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Page 2' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Page 3' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Page 4' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Page 5' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Page 6' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Page 7' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Page 8' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Page 9' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Last page, page 10' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Next page' })).not.toBeDisabled()
    expect(screen.getByRole('button', { name: 'Last page' })).not.toBeDisabled()

    // When I click on page 5 (of 10)
    await user.click(screen.getByRole('button', { name: 'Page 5' }))

    // Then pages 3 to 7 are visible and both "next" and "prev" buttons are enabled
    expect(screen.getByRole('button', { name: 'First page' })).not.toBeDisabled()
    expect(screen.getByRole('button', { name: 'Previous page' })).not.toBeDisabled()
    expect(screen.queryByRole('button', { name: 'Page 1' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Page 2' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Page 3' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Page 4' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Page 5' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Page 6' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Page 7' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Page 8' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Page 9' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Last page, page 10' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Next page' })).not.toBeDisabled()
    expect(screen.getByRole('button', { name: 'Last page' })).not.toBeDisabled()

    // When I click on the last page trigger
    await user.click(screen.getByRole('button', { name: 'Last page' }))

    // Then pages 2 to 5 are not visible (ellipsis) and "next page" button is disabled
    expect(screen.getByRole('button', { name: 'First page' })).not.toBeDisabled()
    expect(screen.getByRole('button', { name: 'Previous page' })).not.toBeDisabled()
    expect(screen.queryByRole('button', { name: 'Page 1' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Page 2' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Page 3' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Page 4' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Page 5' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Page 6' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Page 7' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Page 8' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Page 9' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Last page, page 10' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Last page' })).toBeDisabled()
  })
})
