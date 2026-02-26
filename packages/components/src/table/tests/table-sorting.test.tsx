import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import type { SortDescriptor } from 'react-aria-components'

import { Table } from '..'

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
      <Table
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
    const onSortChange = vi.fn()
    let descriptor: SortDescriptor = { column: 'name', direction: 'ascending' }

    const { rerender } = render(
      <Table
        aria-label="Sortable"
        sortDescriptor={descriptor}
        onSortChange={d => {
          descriptor = d
          onSortChange(d)
        }}
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
      </Table>
    )

    const nameHeader = screen.getByRole('columnheader', { name: /name/i })

    await user.click(nameHeader)
    expect(onSortChange).toHaveBeenCalledWith(
      expect.objectContaining({ column: 'name', direction: 'descending' })
    )

    rerender(
      <Table
        aria-label="Sortable"
        sortDescriptor={{ column: 'name', direction: 'descending' }}
        onSortChange={d => {
          descriptor = d
          onSortChange(d)
        }}
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
      </Table>
    )

    await user.click(nameHeader)
    expect(onSortChange).toHaveBeenCalledWith(
      expect.objectContaining({ column: 'name', direction: 'ascending' })
    )
  })

  it('should display sorted rows in correct order when sortDescriptor changes', () => {
    const sortedByNameAsc = [...sortableRows].sort((a, b) =>
      a.name.localeCompare(b.name)
    )
    const sortedByNameDesc = [...sortableRows].sort(
      (a, b) => -a.name.localeCompare(b.name)
    )

    const { rerender } = render(
      <Table
        aria-label="Sortable"
        sortDescriptor={{ column: 'name', direction: 'ascending' }}
        onSortChange={() => {}}
      >
        <Table.Header>
          <Table.Column id="name" label="Name" isRowHeader allowsSorting />
          <Table.Column id="value" label="Value" allowsSorting />
        </Table.Header>
        <Table.Body
          items={sortedByNameAsc.map((r, i) => ({ ...r, order: i }))}
        >
          {item => (
            <Table.Row id={item.id}>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.value}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    )

    const nameCells = screen.getAllByRole('rowheader')
    const names = nameCells.map(c => c.textContent?.trim())
    expect(names).toEqual(['Alpha', 'Bravo', 'Charlie'])

    rerender(
      <Table
        aria-label="Sortable"
        sortDescriptor={{ column: 'name', direction: 'descending' }}
        onSortChange={() => {}}
      >
        <Table.Header>
          <Table.Column id="name" label="Name" isRowHeader allowsSorting />
          <Table.Column id="value" label="Value" allowsSorting />
        </Table.Header>
        <Table.Body
          items={sortedByNameDesc.map((r, i) => ({ ...r, order: i }))}
        >
          {item => (
            <Table.Row id={item.id}>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.value}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    )

    const nameCellsAfter = screen.getAllByRole('rowheader')
    const namesAfter = nameCellsAfter.map(c => c.textContent?.trim())
    expect(namesAfter).toEqual(['Charlie', 'Bravo', 'Alpha'])
  })

  it('should not show sort control on column without allowsSorting', () => {
    render(
      <Table aria-label="Mixed">
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
      </Table>
    )

    expect(screen.getByRole('columnheader', { name: /name/i })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: /value/i })).toBeInTheDocument()
  })
})
