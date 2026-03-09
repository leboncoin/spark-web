import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Table, useTableSort } from '..'

describe('Table column sorting', () => {
  const sortableRows = [
    { id: '1', name: 'Charlie', value: 30 },
    { id: '2', name: 'Alpha', value: 10 },
    { id: '3', name: 'Bravo', value: 20 },
  ]

  it('should call onSortChange when clicking a sortable column header', async () => {
    const user = userEvent.setup()
    const onSortChange = vi.fn()

    render(
      <Table>
        <Table.Grid
          aria-label="Sortable"
          sortDescriptor={{ column: 'name', direction: 'ascending' }}
          onSortChange={onSortChange}
        >
          <Table.Header>
            <Table.Column id="name" label="Name" isRowHeader allowsSorting />
            <Table.Column id="value" label="Value" allowsSorting />
          </Table.Header>
          <Table.Body items={sortableRows}>
            {item => (
              <Table.Row id={item.id}>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.value}</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Grid>
      </Table>
    )

    const nameHeader = screen.getByRole('columnheader', { name: /name/i })
    await user.click(nameHeader)

    expect(onSortChange).toHaveBeenCalledTimes(1)
    expect(onSortChange).toHaveBeenCalledWith(
      expect.objectContaining({
        column: 'name',
        direction: 'descending',
      })
    )
  })

  it('should toggle sort direction when clicking same column again', async () => {
    const user = userEvent.setup()

    function SortableTable() {
      const { sortDescriptor, onSortChange, sortedItems } = useTableSort(sortableRows, {
        initialSort: { column: 'name', direction: 'ascending' },
      })

      return (
        <Table>
          <Table.Grid
            aria-label="Sortable"
            sortDescriptor={sortDescriptor}
            onSortChange={onSortChange}
          >
            <Table.Header>
              <Table.Column id="name" label="Name" isRowHeader allowsSorting />
              <Table.Column id="value" label="Value" allowsSorting />
            </Table.Header>
            <Table.Body items={sortedItems}>
              {item => (
                <Table.Row id={item.id}>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.value}</Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Grid>
        </Table>
      )
    }

    render(<SortableTable />)

    const nameHeader = screen.getByRole('columnheader', { name: /name/i })

    await user.click(nameHeader)
    const nameCellsAfterDesc = screen.getAllByRole('rowheader')
    expect(nameCellsAfterDesc.map(c => c.textContent?.trim())).toEqual([
      'Charlie',
      'Bravo',
      'Alpha',
    ])

    await user.click(nameHeader)
    const nameCellsAfterAsc = screen.getAllByRole('rowheader')
    expect(nameCellsAfterAsc.map(c => c.textContent?.trim())).toEqual(['Alpha', 'Bravo', 'Charlie'])
  })

  it('should display sorted rows in correct order when sortDescriptor changes', () => {
    function SortableTable({
      initialSort,
    }: {
      initialSort: { column: 'name' | 'value'; direction: 'ascending' | 'descending' }
    }) {
      const { sortDescriptor, onSortChange, sortedItems } = useTableSort(sortableRows, {
        initialSort,
      })

      return (
        <Table>
          <Table.Grid
            aria-label="Sortable"
            sortDescriptor={sortDescriptor}
            onSortChange={onSortChange}
          >
            <Table.Header>
              <Table.Column id="name" label="Name" isRowHeader allowsSorting />
              <Table.Column id="value" label="Value" allowsSorting />
            </Table.Header>
            <Table.Body items={sortedItems}>
              {item => (
                <Table.Row id={item.id}>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.value}</Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Grid>
        </Table>
      )
    }

    const { unmount } = render(
      <SortableTable initialSort={{ column: 'name', direction: 'ascending' }} />
    )
    const nameCells = screen.getAllByRole('rowheader')
    expect(nameCells.map(c => c.textContent?.trim())).toEqual(['Alpha', 'Bravo', 'Charlie'])

    unmount()

    render(<SortableTable initialSort={{ column: 'name', direction: 'descending' }} />)
    const nameCellsAfter = screen.getAllByRole('rowheader')
    expect(nameCellsAfter.map(c => c.textContent?.trim())).toEqual(['Charlie', 'Bravo', 'Alpha'])
  })

  it('should sort date column chronologically with custom comparator', async () => {
    const user = userEvent.setup()

    const dateRows = [
      { id: '1', name: 'Report Q3', date: '08/01/2025' },
      { id: '2', name: 'Report Q1', date: '11/05/2024' },
      { id: '3', name: 'Report Q2', date: '15/09/2024' },
    ]

    function parseDateDDMMYYYY(value: unknown): number {
      const str = String(value)
      const parts = str.split('/').map(Number)
      const [day = 0, month = 0, year = 0] = parts

      return new Date(year, month - 1, day).getTime()
    }

    function DateSortableTable() {
      const { sortDescriptor, onSortChange, sortedItems } = useTableSort(dateRows, {
        initialSort: { column: 'date', direction: 'ascending' },
        compare: (a, b, column, direction) => {
          if (column === 'date') {
            const aTime = parseDateDDMMYYYY(a.date)
            const bTime = parseDateDDMMYYYY(b.date)
            let comparisonResult = 0
            if (aTime < bTime) comparisonResult = -1
            else if (aTime > bTime) comparisonResult = 1

            return direction === 'descending' ? -comparisonResult : comparisonResult
          }

          const comparisonResult = String(a[column]).localeCompare(String(b[column]))

          return direction === 'descending' ? -comparisonResult : comparisonResult
        },
      })

      return (
        <Table>
          <Table.Grid
            aria-label="Date table"
            sortDescriptor={sortDescriptor}
            onSortChange={onSortChange}
          >
            <Table.Header>
              <Table.Column id="name" label="Name" isRowHeader allowsSorting />
              <Table.Column id="date" label="Date" allowsSorting />
            </Table.Header>
            <Table.Body items={sortedItems}>
              {item => (
                <Table.Row id={item.id}>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.date}</Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Grid>
        </Table>
      )
    }

    render(<DateSortableTable />)

    const dataRows = screen.getAllByRole('row').slice(1)
    const getDateCellInRow = (row: HTMLElement) => within(row).getByRole('gridcell')
    const datesOrder = dataRows.map(getDateCellInRow).map(c => c.textContent?.trim())
    expect(datesOrder).toEqual(['11/05/2024', '15/09/2024', '08/01/2025'])

    await user.click(screen.getByRole('columnheader', { name: /date/i }))
    const dataRowsAfter = screen.getAllByRole('row').slice(1)
    const datesOrderDesc = dataRowsAfter.map(getDateCellInRow).map(c => c.textContent?.trim())
    expect(datesOrderDesc).toEqual(['08/01/2025', '15/09/2024', '11/05/2024'])
  })

  it('should reset sort when clicking external button (setSortDescriptor)', async () => {
    const user = userEvent.setup()

    function SortableTableWithReset() {
      const { sortDescriptor, onSortChange, setSortDescriptor, sortedItems } = useTableSort(
        sortableRows,
        { initialSort: { column: 'name', direction: 'ascending' } }
      )

      return (
        <div>
          <button
            type="button"
            onClick={() => setSortDescriptor({ column: 'name', direction: 'ascending' })}
          >
            Reset sort
          </button>
          <Table>
            <Table.Grid
              aria-label="Sortable"
              sortDescriptor={sortDescriptor}
              onSortChange={onSortChange}
            >
              <Table.Header>
                <Table.Column id="name" label="Name" isRowHeader allowsSorting />
                <Table.Column id="value" label="Value" allowsSorting />
              </Table.Header>
              <Table.Body items={sortedItems}>
                {item => (
                  <Table.Row id={item.id}>
                    <Table.Cell>{item.name}</Table.Cell>
                    <Table.Cell>{item.value}</Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table.Grid>
          </Table>
        </div>
      )
    }

    render(<SortableTableWithReset />)

    expect(screen.getAllByRole('rowheader').map(c => c.textContent?.trim())).toEqual([
      'Alpha',
      'Bravo',
      'Charlie',
    ])

    await user.click(screen.getByRole('columnheader', { name: /name/i }))
    expect(screen.getAllByRole('rowheader').map(c => c.textContent?.trim())).toEqual([
      'Charlie',
      'Bravo',
      'Alpha',
    ])

    await user.click(screen.getByRole('button', { name: /reset sort/i }))
    expect(screen.getAllByRole('rowheader').map(c => c.textContent?.trim())).toEqual([
      'Alpha',
      'Bravo',
      'Charlie',
    ])
  })

  it('should not show sort control on column without allowsSorting', () => {
    render(
      <Table>
        <Table.Grid aria-label="Mixed">
          <Table.Header>
            <Table.Column id="name" label="Name" isRowHeader allowsSorting />
            <Table.Column id="value" label="Value" />
          </Table.Header>
          <Table.Body items={sortableRows}>
            {item => (
              <Table.Row id={item.id}>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.value}</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Grid>
      </Table>
    )

    expect(screen.getByRole('columnheader', { name: /name/i })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: /value/i })).toBeInTheDocument()
  })
})
