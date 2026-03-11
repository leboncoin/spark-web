import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useMemo } from 'react'
import { describe, expect, it } from 'vitest'

import { Pagination } from '../../pagination'
import { Table, useTablePagination } from '..'

const items = [
  { id: 'a', name: 'Alpha' },
  { id: 'b', name: 'Beta' },
  { id: 'c', name: 'Charlie' },
  { id: 'd', name: 'Delta' },
]

function TableWithPaginationAndBulkBar() {
  const pageSize = 2
  const allItems = useMemo(() => items, [])

  const { page, pageItems, totalItems, allKeys, selectedKeys, onSelectionChange, onPageChange, clearSelection } =
    useTablePagination(allItems, { pageSize })

  return (
    <Table
      selectionMode="multiple"
      selectedKeys={selectedKeys}
      onSelectionChange={onSelectionChange}
      onClearSelection={clearSelection}
      totalCount={totalItems}
      hasMultiplePages={totalItems > pageSize}
      onSelectAll={() => onSelectionChange(allKeys)}
    >
      <Table.BulkBar>
        <Table.BulkBarSelectedCount>{`${selectedKeys.size} selected`}</Table.BulkBarSelectedCount>
        <div className="gap-sm flex">
          <Table.BulkBarClearButton>Clear all</Table.BulkBarClearButton>
          <Table.BulkBarSelectAllButton>Select all {totalItems} items</Table.BulkBarSelectAllButton>
        </div>
      </Table.BulkBar>

      <Table.Grid aria-label="Paginated table">
        <Table.Header>
          <Table.Column id="name" label="Name" isRowHeader />
        </Table.Header>
        <Table.Body>
          {pageItems.map(item => (
            <Table.Row key={item.id} id={item.id}>
              <Table.Cell>{item.name}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Grid>

      <Pagination
        type="button"
        aria-label="Table pagination"
        count={totalItems}
        pageSize={pageSize}
        page={page}
        onPageChange={onPageChange}
      >
        <Pagination.PrevTrigger aria-label="Previous page" />
        <Pagination.Pages>
          {({ pages }) =>
            pages.map((p, index) =>
              p.type === 'page' ? (
                <Pagination.Item key={p.value} value={p.value} aria-label={`Page ${p.value}`}>
                  {p.value}
                </Pagination.Item>
              ) : (
                <Pagination.Ellipsis key={`ellipsis-${index}`} index={index} />
              )
            )
          }
        </Pagination.Pages>
        <Pagination.NextTrigger aria-label="Next page" />
      </Pagination>
    </Table>
  )
}

describe('Table + Pagination + BulkBar', () => {
  it('keeps selection across pages', async () => {
    const user = userEvent.setup()
    render(<TableWithPaginationAndBulkBar />)

    await user.click(screen.getByRole('row', { name: /alpha/i }))
    expect(screen.getByText('1 selected')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Page 2' }))
    await user.click(screen.getByRole('row', { name: /charlie/i }))

    expect(screen.getByText('2 selected')).toBeInTheDocument()
  })

  it('BulkBar "Clear all" clears selection across all pages', async () => {
    const user = userEvent.setup()
    render(<TableWithPaginationAndBulkBar />)

    await user.click(screen.getByRole('row', { name: /alpha/i }))
    await user.click(screen.getByRole('button', { name: 'Page 2' }))
    await user.click(screen.getByRole('row', { name: /charlie/i }))
    expect(screen.getByText('2 selected')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Clear all' }))
    expect(screen.getByText('0 selected')).toBeInTheDocument()
  })

  it('BulkBar "Select all" selects all items across pages', async () => {
    const user = userEvent.setup()
    render(<TableWithPaginationAndBulkBar />)

    await user.click(screen.getByRole('row', { name: /alpha/i }))
    expect(screen.getByText('1 selected')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /select all 4 items/i }))
    expect(screen.getByText('4 selected')).toBeInTheDocument()
  })
})

