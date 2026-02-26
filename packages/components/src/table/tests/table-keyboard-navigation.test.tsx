import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Table } from '..'

describe('Table keyboard navigation', () => {
  it('should have grid role for keyboard navigation', () => {
    render(
      <Table aria-label="Grid">
        <Table.Header>
          <Table.Column id="name" label="Name" isRowHeader />
          <Table.Column id="value" label="Value" />
        </Table.Header>
        <Table.Body>
          <Table.Row id="r1">
            <Table.Cell>Alpha</Table.Cell>
            <Table.Cell>1</Table.Cell>
          </Table.Row>
          <Table.Row id="r2">
            <Table.Cell>Beta</Table.Cell>
            <Table.Cell>2</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    )

    const grid = screen.getByRole('grid', { name: 'Grid' })
    expect(grid).toBeInTheDocument()

    // First column is rowheader, second is gridcell; 2 data rows => at least 2 gridcells
    const cells = screen.getAllByRole('gridcell')
    expect(cells.length).toBeGreaterThanOrEqual(2)

    const dataRows = screen.getAllByRole('row').filter(r => r.getAttribute('data-spark-component') === 'table-row')
    expect(dataRows.length).toBe(2)
  })

  it('should move focus between cells with arrow keys', async () => {
    const user = userEvent.setup()
    render(
      <Table aria-label="Navigate">
        <Table.Header>
          <Table.Column id="name" label="Name" isRowHeader />
          <Table.Column id="value" label="Value" />
        </Table.Header>
        <Table.Body>
          <Table.Row id="r1">
            <Table.Cell>Alpha</Table.Cell>
            <Table.Cell>1</Table.Cell>
          </Table.Row>
          <Table.Row id="r2">
            <Table.Cell>Beta</Table.Cell>
            <Table.Cell>2</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    )

    const grid = screen.getByRole('grid', { name: 'Navigate' })
    grid.focus()

    const firstFocusable = document.activeElement
    expect(firstFocusable).toBeTruthy()

    await user.keyboard('{ArrowRight}')
    const afterRight = document.activeElement
    expect(afterRight).not.toBe(firstFocusable)

    await user.keyboard('{ArrowDown}')
    const afterDown = document.activeElement
    expect(afterDown).toBeTruthy()
  })

  it('should not select row when Space is pressed on interactive element (button) in cell', () => {
    const onSelectionChange = vi.fn()
    const onButtonClick = vi.fn()

    render(
      <Table
        aria-label="With button"
        selectionMode="multiple"
        selectedKeys={new Set()}
        onSelectionChange={onSelectionChange}
      >
        <Table.Header>
          <Table.Column id="name" label="Name" isRowHeader />
          <Table.Column id="action" label="Action" />
        </Table.Header>
        <Table.Body>
          <Table.Row id="r1">
            <Table.Cell>Row 1</Table.Cell>
            <Table.Cell>
              <button type="button" onClick={onButtonClick}>
                Action
              </button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    )

    const button = screen.getByRole('button', { name: 'Action' })
    button.focus()
    // Native capture-phase handler converts Space on interactive element to click and prevents row selection
    fireEvent.keyDown(button, { key: ' ', code: 'Space', keyCode: 32, bubbles: true })

    expect(onButtonClick).toHaveBeenCalled()
    expect(onSelectionChange).not.toHaveBeenCalled()
  })

  it('should not select row when Enter is pressed on interactive element in cell', () => {
    const onSelectionChange = vi.fn()
    const onButtonClick = vi.fn()

    render(
      <Table
        aria-label="With button enter"
        selectionMode="multiple"
        selectedKeys={new Set()}
        onSelectionChange={onSelectionChange}
      >
        <Table.Header>
          <Table.Column id="name" label="Name" isRowHeader />
          <Table.Column id="action" label="Action" />
        </Table.Header>
        <Table.Body>
          <Table.Row id="r1">
            <Table.Cell>Row 1</Table.Cell>
            <Table.Cell>
              <button type="button" onClick={onButtonClick}>
                Do it
              </button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    )

    const button = screen.getByRole('button', { name: 'Do it' })
    button.focus()
    fireEvent.keyDown(button, { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true })

    expect(onButtonClick).toHaveBeenCalled()
    expect(onSelectionChange).not.toHaveBeenCalled()
  })

  it('should select row when Space is pressed on non-interactive cell', async () => {
    const user = userEvent.setup()
    const onSelectionChange = vi.fn()

    render(
      <Table
        aria-label="Select with space"
        selectionMode="multiple"
        selectedKeys={new Set()}
        onSelectionChange={onSelectionChange}
      >
        <Table.Header>
          <Table.Column id="name" label="Name" isRowHeader />
          <Table.Column id="value" label="Value" />
        </Table.Header>
        <Table.Body>
          <Table.Row id="r1">
            <Table.Cell>Alpha</Table.Cell>
            <Table.Cell>1</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    )

    // Cell with "Alpha" may be rowheader or gridcell depending on column
    const cell = screen.getByText('Alpha').closest('[role="gridcell"], [role="rowheader"]') as HTMLElement
    expect(cell).toBeInTheDocument()
    cell?.focus()
    await user.keyboard(' ')

    expect(onSelectionChange).toHaveBeenCalled()
    expect(onSelectionChange.mock.calls[0][0].has('r1')).toBe(true)
  })
})
