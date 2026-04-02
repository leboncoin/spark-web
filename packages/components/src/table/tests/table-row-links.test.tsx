import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { Table } from '..'

type SelectionKeys = Set<string> | 'all'

function SelectableLinkTable({
  onRowAction,
  onSelectionChange,
}: {
  onRowAction: (id: string) => void
  onSelectionChange?: (keys: SelectionKeys) => void
}) {
  const [selectedKeys, setSelectedKeys] = useState<SelectionKeys>(new Set())

  // Hash-only hrefs keep jsdom on the same document (external URLs log navigation warnings).
  const rows = [
    { id: 'row-1', name: 'Row one', type: 'Link row', href: '#row-1' },
    { id: 'row-2', name: 'Row two', type: 'Link row', href: '#row-2' },
  ]

  const isSelected = (id: string) =>
    selectedKeys === 'all' || (selectedKeys instanceof Set && selectedKeys.has(id))

  return (
    <Table
      selectionMode="multiple"
      selectedKeys={selectedKeys}
      onSelectionChange={keys => {
        setSelectedKeys(keys as SelectionKeys)
        onSelectionChange?.(keys as SelectionKeys)
      }}
    >
      <Table.Grid aria-label="Selectable link rows">
        <Table.Header>
          <Table.Column id="name" label="Name" isRowHeader />
          <Table.Column id="type" label="Type" />
        </Table.Header>
        <Table.Body>
          {rows.map(row => (
            <Table.Row
              key={row.id}
              id={row.id}
              // href used for styling/semantics, onAction represents "link triggered"
              href={row.href}
              onAction={() => {
                if (!isSelected(row.id)) {
                  onRowAction(row.id)
                }
              }}
            >
              <Table.Cell>{row.name}</Table.Cell>
              <Table.Cell>{row.type}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Grid>
    </Table>
  )
}

function StaticLinkTable({ onRowAction }: { onRowAction: (id: string) => void }) {
  const rows = [
    {
      id: 'row-1',
      name: 'Alpha',
      description: 'Static content row',
      href: '#alpha',
    },
    {
      id: 'row-2',
      name: 'Beta',
      description: 'Static content row',
      href: '#beta',
    },
  ]

  return (
    <Table>
      <Table.Grid aria-label="Static link rows">
        <Table.Header>
          <Table.Column id="name" label="Name" isRowHeader />
          <Table.Column id="description" label="Description" />
        </Table.Header>
        <Table.Body>
          {rows.map(row => (
            <Table.Row
              key={row.id}
              id={row.id}
              href={row.href}
              onAction={() => onRowAction(row.id)}
            >
              <Table.Cell>{row.name}</Table.Cell>
              <Table.Cell>{row.description}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Grid>
    </Table>
  )
}

describe('Table rows as links (selectable)', () => {
  it('Space on a row toggles selection without triggering the link', async () => {
    const user = userEvent.setup()
    const onRowAction = vi.fn()
    const onSelectionChange = vi.fn()

    render(<SelectableLinkTable onRowAction={onRowAction} onSelectionChange={onSelectionChange} />)

    const cell = screen
      .getByText('Row one')
      .closest('[role="rowheader"], [role="gridcell"]') as HTMLElement

    cell.focus()
    await user.keyboard(' ')

    expect(onRowAction).not.toHaveBeenCalled()
    expect(onSelectionChange).toHaveBeenCalledTimes(1)
    const keys = onSelectionChange.mock.calls[0]![0] as SelectionKeys
    expect(keys === 'all' || (keys instanceof Set && keys.has('row-1'))).toBe(true)
  })

  it('Enter respects selection: no link while selected; link after row is cleared', async () => {
    const user = userEvent.setup()
    const onRowAction = vi.fn()
    const onSelectionChange = vi.fn()

    render(<SelectableLinkTable onRowAction={onRowAction} onSelectionChange={onSelectionChange} />)

    const cell = screen
      .getByText('Row one')
      .closest('[role="rowheader"], [role="gridcell"]') as HTMLElement

    // When we select the row using Space (keyboar)
    cell.focus()
    await user.keyboard(' ')

    // Then the link is not triggered and the row is selected
    expect(onRowAction).not.toHaveBeenCalled()
    expect(onSelectionChange).toHaveBeenCalledTimes(1)
    const keys = onSelectionChange.mock.calls[0]![0] as SelectionKeys
    expect(keys === 'all' || (keys instanceof Set && keys.has('row-1'))).toBe(true)

    // When we press Enter
    await user.keyboard('{Enter}')
    // the link is not triggered because at least one row is selected
    expect(onRowAction).not.toHaveBeenCalled()

    // When we unselect the row using Space (keyboard)
    await user.keyboard(' ')
    // Then the row is unselected
    expect(onSelectionChange).toHaveBeenCalledTimes(2)

    // When we press Enter and no rows are selected
    await user.keyboard('{Enter}')
    // Then the link is triggered
    expect(onRowAction).toHaveBeenCalledTimes(1)
  })

  it('Enter triggers the link when row is not selected', async () => {
    const user = userEvent.setup()
    const onRowAction = vi.fn()
    render(<SelectableLinkTable onRowAction={onRowAction} />)

    const cell = screen
      .getByText('Row one')
      .closest('[role="rowheader"], [role="gridcell"]') as HTMLElement

    // Initially not selected: Enter should trigger link once
    cell.focus()
    await user.keyboard('{Enter}')

    expect(onRowAction).toHaveBeenCalledTimes(1)
    expect(onRowAction).toHaveBeenCalledWith('row-1')
  })
})

describe('Table rows as links (static content)', () => {
  it('renders non-selectable link rows and triggers onAction on Enter', async () => {
    const user = userEvent.setup()
    const onRowAction = vi.fn()

    render(<StaticLinkTable onRowAction={onRowAction} />)

    const cell = screen
      .getByText('Alpha')
      .closest('[role="rowheader"], [role="gridcell"]') as HTMLElement

    const grid = screen.getByRole('grid', { name: 'Static link rows' })
    expect(grid).toBeInTheDocument()

    cell.focus()
    await user.keyboard('{Enter}')

    expect(onRowAction).toHaveBeenCalledTimes(1)
    expect(onRowAction).toHaveBeenCalledWith('row-1')
  })
})
