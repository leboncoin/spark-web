import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Table } from '..'

describe('Table row selection', () => {
  const rows = [
    { id: 'a', name: 'Alpha', type: 'Type A' },
    { id: 'b', name: 'Beta', type: 'Type B' },
    { id: 'c', name: 'Gamma', type: 'Type C' },
  ]

  it('should call onSelectionChange when row is selected (single)', async () => {
    const user = userEvent.setup()
    const onSelectionChange = vi.fn()

    render(
      <Table
        aria-label="Selectable"
        selectionMode="single"
        selectedKeys={new Set()}
        onSelectionChange={onSelectionChange}
      >
        <Table.Header>
          <Table.Column id="name" label="Name" isRowHeader />
          <Table.Column id="type" label="Type" />
        </Table.Header>
        <Table.Body items={rows}>
          {item => (
            <Table.Row id={item.id}>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.type}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    )

    const rowBeta = screen.getByRole('row', { name: /beta/i })
    await user.click(rowBeta)

    expect(onSelectionChange).toHaveBeenCalled()
    const keys = onSelectionChange.mock.calls[0][0]
    expect(keys).toBeInstanceOf(Set)
    expect(keys.has('b')).toBe(true)
  })

  it('should call onSelectionChange when multiple rows are selected', async () => {
    const user = userEvent.setup()
    const onSelectionChange = vi.fn()

    render(
      <Table
        aria-label="Multi select"
        selectionMode="multiple"
        selectedKeys={new Set()}
        onSelectionChange={onSelectionChange}
      >
        <Table.Header>
          <Table.Column id="name" label="Name" isRowHeader />
          <Table.Column id="type" label="Type" />
        </Table.Header>
        <Table.Body items={rows}>
          {item => (
            <Table.Row id={item.id}>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.type}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    )

    await user.click(screen.getByRole('row', { name: /alpha/i }))
    expect(onSelectionChange).toHaveBeenCalledWith(expect.any(Set))
    expect(onSelectionChange.mock.calls[0][0].has('a')).toBe(true)

    await user.click(screen.getByRole('row', { name: /beta/i }))
    expect(onSelectionChange).toHaveBeenCalledTimes(2)
    const keysAfterSecond = onSelectionChange.mock.calls[1][0]
    expect(keysAfterSecond.has('b')).toBe(true)
  })

  it('should show selection checkbox column when selectionMode is multiple', () => {
    render(
      <Table
        aria-label="With checkboxes"
        selectionMode="multiple"
        selectedKeys={new Set()}
        onSelectionChange={() => {}}
      >
        <Table.Header>
          <Table.Column id="name" label="Name" isRowHeader />
          <Table.Column id="type" label="Type" />
        </Table.Header>
        <Table.Body items={rows}>
          {item => (
            <Table.Row id={item.id}>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.type}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    )

    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes.length).toBeGreaterThanOrEqual(rows.length)
  })

  it('should reflect selectedKeys on rows (data-selected)', () => {
    render(
      <Table
        aria-label="Selected state"
        selectionMode="multiple"
        selectedKeys={new Set(['a', 'c'])}
        onSelectionChange={() => {}}
      >
        <Table.Header>
          <Table.Column id="name" label="Name" isRowHeader />
          <Table.Column id="type" label="Type" />
        </Table.Header>
        <Table.Body items={rows}>
          {item => (
            <Table.Row id={item.id}>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.type}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    )

    const rowA = screen.getByRole('row', { name: /alpha/i })
    const rowB = screen.getByRole('row', { name: /beta/i })
    const rowC = screen.getByRole('row', { name: /gamma/i })

    expect(rowA).toHaveAttribute('data-selected', 'true')
    expect(rowC).toHaveAttribute('data-selected', 'true')
    // Unselected row may have data-selected="false" or no attribute
    expect(rowB.getAttribute('data-selected')).not.toBe('true')
  })

  it('should toggle row selection when clicking checkbox', async () => {
    const user = userEvent.setup()
    const onSelectionChange = vi.fn()

    render(
      <Table
        aria-label="Checkbox toggle"
        selectionMode="multiple"
        selectedKeys={new Set()}
        onSelectionChange={onSelectionChange}
      >
        <Table.Header>
          <Table.Column id="name" label="Name" isRowHeader />
          <Table.Column id="type" label="Type" />
        </Table.Header>
        <Table.Body items={rows}>
          {item => (
            <Table.Row id={item.id}>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.type}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    )

    const checkboxes = screen.getAllByRole('checkbox')
    const firstRowCheckbox = checkboxes.find(
      cb => cb.getAttribute('aria-label')?.includes('Select') || true
    ) ?? checkboxes[1]

    await user.click(firstRowCheckbox)
    expect(onSelectionChange).toHaveBeenCalled()
  })
})
