import { act, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Table } from '..'
import { Dropdown } from '../../dropdown'
import { Switch } from '../../switch'

describe('Table keyboard navigation', () => {
  it('should have grid role for keyboard navigation', () => {
    render(
      <Table>
        <Table.Grid aria-label="Grid">
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
        </Table.Grid>
      </Table>
    )

    const grid = screen.getByRole('grid', { name: 'Grid' })
    expect(grid).toBeInTheDocument()

    // First column is rowheader, second is gridcell; 2 data rows => at least 2 gridcells
    const cells = screen.getAllByRole('gridcell')
    expect(cells.length).toBeGreaterThanOrEqual(2)

    const dataRows = screen
      .getAllByRole('row')
      .filter(r => r.getAttribute('data-spark-component') === 'table-row')
    expect(dataRows.length).toBe(2)
  })

  it('should move focus from the selection column to the next cell with ArrowRight', async () => {
    const user = userEvent.setup()
    render(
      <Table selectionMode="multiple" selectedKeys={new Set()} onSelectionChange={() => {}}>
        <Table.Grid aria-label="With selection column">
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
        </Table.Grid>
      </Table>
    )

    const dataRow = screen
      .getAllByRole('row')
      .find(r => r.getAttribute('data-spark-component') === 'table-row') as HTMLElement
    const bodyCells = dataRow.querySelectorAll<HTMLElement>('[data-spark-component="table-cell"]')
    expect(bodyCells.length).toBeGreaterThanOrEqual(2)

    const selectionCell = bodyCells[0]!
    const nameCell = bodyCells[1]!
    selectionCell.focus()
    expect(document.activeElement).toBe(selectionCell)

    await user.keyboard('{ArrowRight}')

    expect(document.activeElement).toBe(nameCell)
  })

  it('should keep grid keyboard mode after focusing the row selection checkbox so ArrowRight still moves to the next cell', async () => {
    const user = userEvent.setup()
    render(
      <Table selectionMode="multiple" selectedKeys={new Set()} onSelectionChange={() => {}}>
        <Table.Grid aria-label="Selection checkbox grid mode">
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
        </Table.Grid>
      </Table>
    )

    const dataRow = screen
      .getAllByRole('row')
      .find(r => r.getAttribute('data-spark-component') === 'table-row') as HTMLElement
    const bodyCells = dataRow.querySelectorAll<HTMLElement>('[data-spark-component="table-cell"]')
    const nameCell = bodyCells[1]!
    const rowCheckbox = within(dataRow).getByRole('checkbox')

    const pointerInit = {
      bubbles: true,
      cancelable: true,
      button: 0,
      pointerId: 1,
      pointerType: 'mouse' as const,
      width: 1,
      height: 1,
      pressure: 0.5,
    }

    await act(async () => {
      rowCheckbox.dispatchEvent(new window.PointerEvent('pointerdown', pointerInit))
    })
    await act(async () => {
      rowCheckbox.dispatchEvent(new window.PointerEvent('pointerup', pointerInit))
    })
    rowCheckbox.focus()

    const grid = screen.getByRole('grid', { name: 'Selection checkbox grid mode' })
    expect(grid).toHaveAttribute('data-table-keyboard-mode', 'grid')

    await user.keyboard('{ArrowRight}')

    expect(document.activeElement).toBe(nameCell)
  })

  it('should still move to the next cell with ArrowRight when the focused cell contains a link', async () => {
    const user = userEvent.setup()
    render(
      <Table selectionMode="multiple" selectedKeys={new Set()} onSelectionChange={() => {}}>
        <Table.Grid aria-label="Link inside cell">
          <Table.Header>
            <Table.Column id="name" label="Name" isRowHeader />
            <Table.Column id="type" label="Type" />
          </Table.Header>
          <Table.Body>
            <Table.Row id="r1" href="#r1">
              <Table.Cell>
                <a href="#doc">Documentation</a>
              </Table.Cell>
              <Table.Cell>External link</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Grid>
      </Table>
    )

    const dataRow = screen
      .getAllByRole('row')
      .find(r => r.getAttribute('data-spark-component') === 'table-row') as HTMLElement
    const bodyCells = dataRow.querySelectorAll<HTMLElement>('[data-spark-component="table-cell"]')
    const firstCell = bodyCells[1]!
    const secondCell = bodyCells[2]!

    firstCell.focus()
    expect(document.activeElement).toBe(firstCell)

    await user.keyboard('{ArrowRight}')

    expect(document.activeElement).toBe(secondCell)
  })

  it('should keep interaction mode arrow keys within in-cell controls (no grid navigation)', async () => {
    const user = userEvent.setup()
    render(
      <Table selectionMode="multiple" selectedKeys={new Set()} onSelectionChange={() => {}}>
        <Table.Grid aria-label="Interaction arrows">
          <Table.Header>
            <Table.Column id="name" label="Name" isRowHeader />
            <Table.Column id="actions" label="Actions" />
          </Table.Header>
          <Table.Body>
            <Table.Row id="r1">
              <Table.Cell>Alpha</Table.Cell>
              <Table.Cell>
                <div>
                  <Switch>Agree</Switch>
                  <Dropdown>
                    <Dropdown.Trigger aria-label="Book">
                      <Dropdown.Value placeholder="Pick a book" />
                    </Dropdown.Trigger>
                    <Dropdown.Popover>
                      <Dropdown.Items>
                        <Dropdown.Item value="book-1">To Kill a Mockingbird</Dropdown.Item>
                      </Dropdown.Items>
                    </Dropdown.Popover>
                  </Dropdown>
                </div>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Grid>
      </Table>
    )

    const grid = screen.getByRole('grid', { name: 'Interaction arrows' })
    const dataRow = screen
      .getAllByRole('row')
      .find(r => r.getAttribute('data-spark-component') === 'table-row') as HTMLElement
    const bodyCells = dataRow.querySelectorAll<HTMLElement>('[data-spark-component="table-cell"]')
    const actionsCell = bodyCells[2]!

    actionsCell.focus()
    await user.keyboard('{Enter}')

    const switchControl = screen.getByRole('switch', { name: 'Agree' })
    expect(document.activeElement).toBe(switchControl)
    expect(grid).toHaveAttribute('data-table-keyboard-mode', 'interaction')

    await user.keyboard('{Tab}')
    const trigger = screen.getByRole('combobox', { name: 'Book' })
    expect(document.activeElement).toBe(trigger)
    expect(grid).toHaveAttribute('data-table-keyboard-mode', 'interaction')

    await user.keyboard('{ArrowLeft}')
    expect(document.activeElement).toBe(trigger)

    await user.keyboard('{ArrowRight}')
    expect(document.activeElement).toBe(trigger)
  })

  it('should move focus between cells with arrow keys (react-aria default)', async () => {
    const user = userEvent.setup()
    render(
      <Table>
        <Table.Grid aria-label="Navigate">
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
        </Table.Grid>
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

  it('should keep focus on the cell in grid mode, and Enter should enter interaction mode', async () => {
    const user = userEvent.setup()
    render(
      <Table>
        <Table.Grid aria-label="Interactive cells">
          <Table.Header>
            <Table.Column id="name" label="Name" isRowHeader />
            <Table.Column id="actions" label="Actions" />
          </Table.Header>
          <Table.Body>
            <Table.Row id="r1">
              <Table.Cell>Alpha</Table.Cell>
              <Table.Cell>
                <button type="button">Action</button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Grid>
      </Table>
    )

    const firstCell = screen
      .getByText('Alpha')
      .closest('[role="gridcell"], [role="rowheader"]') as HTMLElement
    expect(firstCell).toBeInTheDocument()
    firstCell.focus()

    // Move to second column within the row.
    await user.keyboard('{ArrowRight}')

    const activeEl = document.activeElement as HTMLElement | null
    expect(activeEl).toBeTruthy()

    const activeCell = activeEl?.closest(
      '[role="gridcell"], [role="rowheader"]'
    ) as HTMLElement | null
    expect(activeCell).toBeTruthy()
    expect(activeCell?.textContent).toContain('Action')

    // In grid mode, focus should remain on the cell, not the internal button.
    await waitFor(() => {
      expect(document.activeElement).toBe(activeCell)
    })

    // Enter interaction mode: focus should go to the first focusable inside the cell.
    await user.keyboard('{Enter}')
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Action' }))
  })

  it('should keep focus on an in-cell control when it is clicked in grid mode', async () => {
    const user = userEvent.setup()
    render(
      <Table>
        <Table.Grid aria-label="Click in cell">
          <Table.Header>
            <Table.Column id="name" label="Name" isRowHeader />
            <Table.Column id="actions" label="Actions" />
          </Table.Header>
          <Table.Body>
            <Table.Row id="r1">
              <Table.Cell>Alpha</Table.Cell>
              <Table.Cell>
                <button type="button">Action</button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Grid>
      </Table>
    )

    const grid = screen.getByRole('grid', { name: 'Click in cell' })
    const firstCell = screen
      .getByText('Alpha')
      .closest('[role="gridcell"], [role="rowheader"]') as HTMLElement
    firstCell.focus()
    await user.keyboard('{ArrowRight}')

    const actionsCell = screen.getByRole('button', { name: 'Action' }).closest('td') as HTMLElement
    const button = screen.getByRole('button', { name: 'Action' })
    await user.click(button)

    await waitFor(() => {
      expect(document.activeElement).toBe(button)
    })
    expect(document.activeElement).not.toBe(actionsCell)
    expect(grid).toHaveAttribute('data-table-keyboard-mode', 'interaction')
  })

  it('should keep focus on the clicked control when switching cells via pointer from interaction mode', async () => {
    const user = userEvent.setup()
    render(
      <Table>
        <Table.Grid aria-label="Cross-cell pointer">
          <Table.Header>
            <Table.Column id="name" label="Name" isRowHeader />
            <Table.Column id="actions" label="Actions" />
          </Table.Header>
          <Table.Body>
            <Table.Row id="r1">
              <Table.Cell>Alpha</Table.Cell>
              <Table.Cell>
                <button type="button">A1</button>
              </Table.Cell>
            </Table.Row>
            <Table.Row id="r2">
              <Table.Cell>Beta</Table.Cell>
              <Table.Cell>
                <button type="button">B2</button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Grid>
      </Table>
    )

    const grid = screen.getByRole('grid', { name: 'Cross-cell pointer' })
    const a1 = screen.getByRole('button', { name: 'A1' })
    const b2 = screen.getByRole('button', { name: 'B2' })

    const alphaCell = screen
      .getByText('Alpha')
      .closest('[role="gridcell"], [role="rowheader"]') as HTMLElement
    alphaCell.focus()
    await user.keyboard('{ArrowRight}')
    await user.keyboard('{Enter}')
    expect(document.activeElement).toBe(a1)

    await user.click(b2)
    await waitFor(() => {
      expect(document.activeElement).toBe(b2)
    })
    expect(grid).toHaveAttribute('data-table-keyboard-mode', 'interaction')
  })

  it('should focus the row when ArrowRight is pressed on the last cell', async () => {
    const user = userEvent.setup()
    render(
      <Table>
        <Table.Grid aria-label="Row focus at end">
          <Table.Header>
            <Table.Column id="name" label="Name" isRowHeader />
            <Table.Column id="actions" label="Actions" />
          </Table.Header>
          <Table.Body>
            <Table.Row id="r1">
              <Table.Cell>Alpha</Table.Cell>
              <Table.Cell>
                <button type="button">Action</button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Grid>
      </Table>
    )

    const firstCell = screen
      .getByText('Alpha')
      .closest('[role="gridcell"], [role="rowheader"]') as HTMLElement
    firstCell.focus()

    await user.keyboard('{ArrowRight}')

    const activeEl = document.activeElement as HTMLElement | null
    const activeCell = activeEl?.closest(
      '[role="gridcell"], [role="rowheader"]'
    ) as HTMLElement | null
    expect(activeCell?.getAttribute('role')).toBe('gridcell')

    await user.keyboard('{ArrowRight}')

    // Focus should move to the row itself.
    const row = screen.getByRole('row', { name: /Alpha/i })
    expect(document.activeElement).toBe(row)
  })

  it('should allow Tab to move to the next focusable within the cell in interaction mode', async () => {
    const user = userEvent.setup()
    render(
      <Table>
        <Table.Grid aria-label="Tab within cell">
          <Table.Header>
            <Table.Column id="name" label="Name" isRowHeader />
            <Table.Column id="actions" label="Actions" />
          </Table.Header>
          <Table.Body>
            <Table.Row id="r1">
              <Table.Cell>Alpha</Table.Cell>
              <Table.Cell>
                <div>
                  <button type="button">First</button>
                  <button type="button">Second</button>
                </div>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Grid>
      </Table>
    )

    const firstCell = screen
      .getByText('Alpha')
      .closest('[role="gridcell"], [role="rowheader"]') as HTMLElement
    firstCell.focus()

    await user.keyboard('{ArrowRight}')
    await user.keyboard('{Enter}')
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'First' }))

    await user.keyboard('{Tab}')
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Second' }))
  })

  it('should select row when Space is pressed on focused cell', async () => {
    const user = userEvent.setup()
    const onSelectionChange = vi.fn()

    render(
      <Table
        selectionMode="multiple"
        selectedKeys={new Set()}
        onSelectionChange={onSelectionChange}
      >
        <Table.Grid aria-label="Select with space">
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
        </Table.Grid>
      </Table>
    )

    const cell = screen
      .getByText('Alpha')
      .closest('[role="gridcell"], [role="rowheader"]') as HTMLElement
    expect(cell).toBeInTheDocument()
    cell?.focus()
    await user.keyboard(' ')

    expect(onSelectionChange).toHaveBeenCalled()
    expect(onSelectionChange.mock.calls[0]![0].has('r1')).toBe(true)
  })

  it('should not toggle row selection with Space or Enter when focused inside a cell in interaction mode', async () => {
    const user = userEvent.setup()
    const onSelectionChange = vi.fn()

    render(
      <Table
        selectionMode="multiple"
        selectedKeys={new Set()}
        onSelectionChange={onSelectionChange}
      >
        <Table.Grid aria-label="Edit cell">
          <Table.Header>
            <Table.Column id="name" label="Name" isRowHeader />
            <Table.Column id="actions" label="Actions" />
          </Table.Header>
          <Table.Body>
            <Table.Row id="r1">
              <Table.Cell>Alpha</Table.Cell>
              <Table.Cell>
                <button type="button">In cell</button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Grid>
      </Table>
    )

    const firstCell = screen
      .getByText('Alpha')
      .closest('[role="gridcell"], [role="rowheader"]') as HTMLElement
    firstCell.focus()
    await user.keyboard('{ArrowRight}')
    await user.keyboard('{Enter}')
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'In cell' }))

    await user.keyboard(' ')
    expect(onSelectionChange).not.toHaveBeenCalled()

    await user.keyboard('{Enter}')
    expect(onSelectionChange).not.toHaveBeenCalled()
  })

  it('should not toggle row selection when pointer-clicking an interactive control inside a cell', async () => {
    const onSelectionChange = vi.fn()

    render(
      <Table
        selectionMode="multiple"
        selectedKeys={new Set()}
        onSelectionChange={onSelectionChange}
      >
        <Table.Grid aria-label="Pointer on cell control">
          <Table.Header>
            <Table.Column id="name" label="Name" isRowHeader />
            <Table.Column id="actions" label="Actions" />
          </Table.Header>
          <Table.Body>
            <Table.Row id="r1">
              <Table.Cell>Alpha</Table.Cell>
              <Table.Cell>
                <button type="button">Cell action</button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Grid>
      </Table>
    )

    const action = screen.getByRole('button', { name: 'Cell action' })
    // jsdom PointerEvents default to width/height 0; @react-aria/interactions treats that as a virtual pointer and skips normal press handling.
    const pointerInit = {
      bubbles: true,
      cancelable: true,
      button: 0,
      pointerId: 1,
      pointerType: 'mouse' as const,
      width: 1,
      height: 1,
      pressure: 0.5,
    }

    await act(async () => {
      action.dispatchEvent(new window.PointerEvent('pointerdown', pointerInit))
    })
    await act(async () => {
      action.dispatchEvent(new window.PointerEvent('pointerup', pointerInit))
    })
    action.dispatchEvent(
      new window.MouseEvent('click', { bubbles: true, cancelable: true, button: 0, detail: 1 })
    )

    expect(onSelectionChange).not.toHaveBeenCalled()
  })

  it('should still toggle row selection when pointer-clicking a non-interactive body cell', async () => {
    const onSelectionChange = vi.fn()

    render(
      <Table
        selectionMode="multiple"
        selectedKeys={new Set()}
        onSelectionChange={onSelectionChange}
      >
        <Table.Grid aria-label="Pointer on plain cell">
          <Table.Header>
            <Table.Column id="name" label="Name" isRowHeader />
            <Table.Column id="actions" label="Actions" />
          </Table.Header>
          <Table.Body>
            <Table.Row id="r1">
              <Table.Cell>Alpha</Table.Cell>
              <Table.Cell>
                <button type="button">Cell action</button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Grid>
      </Table>
    )

    const nameCell = screen.getByText('Alpha').closest('[role="rowheader"], [role="gridcell"]')!
    const pointerInit = {
      bubbles: true,
      cancelable: true,
      button: 0,
      pointerId: 2,
      pointerType: 'mouse' as const,
      width: 1,
      height: 1,
      pressure: 0.5,
    }

    await act(async () => {
      nameCell.dispatchEvent(new window.PointerEvent('pointerdown', pointerInit))
    })
    await act(async () => {
      nameCell.dispatchEvent(new window.PointerEvent('pointerup', pointerInit))
    })
    nameCell.dispatchEvent(
      new window.MouseEvent('click', { bubbles: true, cancelable: true, button: 0, detail: 1 })
    )

    expect(onSelectionChange).toHaveBeenCalledTimes(1)
    expect(onSelectionChange.mock.calls[0]![0].has('r1')).toBe(true)
  })

  it('should return to grid mode when focus leaves the table from interaction mode (e.g. click outside)', async () => {
    const user = userEvent.setup()
    render(
      <div>
        <button type="button">Outside</button>
        <Table>
          <Table.Grid aria-label="Blur out">
            <Table.Header>
              <Table.Column id="name" label="Name" isRowHeader />
              <Table.Column id="actions" label="Actions" />
            </Table.Header>
            <Table.Body>
              <Table.Row id="r1">
                <Table.Cell>Alpha</Table.Cell>
                <Table.Cell>
                  <button type="button">In cell</button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Grid>
        </Table>
      </div>
    )

    const grid = screen.getByRole('grid', { name: 'Blur out' })
    const outside = screen.getByRole('button', { name: 'Outside' })

    const firstCell = screen
      .getByText('Alpha')
      .closest('[role="gridcell"], [role="rowheader"]') as HTMLElement
    firstCell.focus()
    await user.keyboard('{ArrowRight}')
    await user.keyboard('{Enter}')
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'In cell' }))
    expect(grid).toHaveAttribute('data-table-keyboard-mode', 'interaction')

    await user.click(outside)
    expect(document.activeElement).toBe(outside)
    await waitFor(() => {
      expect(grid).toHaveAttribute('data-table-keyboard-mode', 'grid')
    })

    grid.focus()
    await user.keyboard('{ArrowLeft}')
    const nameCell = screen
      .getByText('Alpha')
      .closest('[role="gridcell"], [role="rowheader"]') as HTMLElement
    await waitFor(() => {
      expect(document.activeElement).toBe(nameCell)
    })
  })

  it('should return to grid mode when focus moves to another body cell from interaction mode', async () => {
    const user = userEvent.setup()
    render(
      <Table>
        <Table.Grid aria-label="Another cell">
          <Table.Header>
            <Table.Column id="name" label="Name" isRowHeader />
            <Table.Column id="actions" label="Actions" />
          </Table.Header>
          <Table.Body>
            <Table.Row id="r1">
              <Table.Cell>Alpha</Table.Cell>
              <Table.Cell>
                <button type="button">In cell</button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Grid>
      </Table>
    )

    const grid = screen.getByRole('grid', { name: 'Another cell' })
    const firstCell = screen
      .getByText('Alpha')
      .closest('[role="gridcell"], [role="rowheader"]') as HTMLElement

    firstCell.focus()
    await user.keyboard('{ArrowRight}')
    await user.keyboard('{Enter}')
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'In cell' }))
    expect(grid).toHaveAttribute('data-table-keyboard-mode', 'interaction')

    await user.click(screen.getByText('Alpha'))
    await waitFor(() => {
      expect(grid).toHaveAttribute('data-table-keyboard-mode', 'grid')
    })
    await waitFor(() => {
      expect(document.activeElement).toBe(firstCell)
    })

    await user.keyboard('{ArrowRight}')
    const actionsCell = screen
      .getByRole('button', { name: 'In cell' })
      .closest('[role="gridcell"]') as HTMLElement
    await waitFor(() => {
      expect(document.activeElement).toBe(actionsCell)
    })
  })

  it('should let ArrowDown move highlight inside an open dropdown in interaction mode (not focus next row)', async () => {
    const user = userEvent.setup()
    render(
      <Table>
        <Table.Grid aria-label="Dropdown in cell">
          <Table.Header>
            <Table.Column id="name" label="Name" isRowHeader />
            <Table.Column id="pick" label="Pick" />
          </Table.Header>
          <Table.Body>
            <Table.Row id="r1">
              <Table.Cell>Alpha</Table.Cell>
              <Table.Cell>
                <Dropdown>
                  <Dropdown.Trigger aria-label="Book">
                    <Dropdown.Value placeholder="Pick a book" />
                  </Dropdown.Trigger>
                  <Dropdown.Popover>
                    <Dropdown.Items>
                      <Dropdown.Item value="a">Option A</Dropdown.Item>
                      <Dropdown.Item value="b">Option B</Dropdown.Item>
                    </Dropdown.Items>
                  </Dropdown.Popover>
                </Dropdown>
              </Table.Cell>
            </Table.Row>
            <Table.Row id="r2">
              <Table.Cell>Beta</Table.Cell>
              <Table.Cell>Other</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Grid>
      </Table>
    )

    const firstCell = screen
      .getByText('Alpha')
      .closest('[role="gridcell"], [role="rowheader"]') as HTMLElement
    firstCell.focus()
    await user.keyboard('{ArrowRight}')
    await user.keyboard('{Enter}')
    const trigger = screen.getByRole('combobox', { name: 'Book' })
    expect(document.activeElement).toBe(trigger)

    await user.keyboard('{Enter}')
    expect(trigger).toHaveAttribute('aria-expanded', 'true')

    await user.keyboard('{ArrowDown}')
    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'Option A' })).toHaveClass('u-outline')
    })
    expect(document.activeElement).toBe(trigger)
  })

  it('should close an open dropdown on Escape first, then exit interaction mode on a second Escape', async () => {
    const user = userEvent.setup()
    render(
      <Table>
        <Table.Grid aria-label="Dropdown escape layering">
          <Table.Header>
            <Table.Column id="name" label="Name" isRowHeader />
            <Table.Column id="pick" label="Pick" />
          </Table.Header>
          <Table.Body>
            <Table.Row id="r1">
              <Table.Cell>Alpha</Table.Cell>
              <Table.Cell>
                <Dropdown>
                  <Dropdown.Trigger aria-label="Book">
                    <Dropdown.Value placeholder="Pick a book" />
                  </Dropdown.Trigger>
                  <Dropdown.Popover>
                    <Dropdown.Items>
                      <Dropdown.Item value="a">Option A</Dropdown.Item>
                    </Dropdown.Items>
                  </Dropdown.Popover>
                </Dropdown>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Grid>
      </Table>
    )

    const grid = screen.getByRole('grid', { name: 'Dropdown escape layering' })
    const firstCell = screen
      .getByText('Alpha')
      .closest('[role="gridcell"], [role="rowheader"]') as HTMLElement
    firstCell.focus()
    await user.keyboard('{ArrowRight}')
    await user.keyboard('{Enter}')
    const trigger = screen.getByRole('combobox', { name: 'Book' })
    await user.keyboard('{Enter}')
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(grid).toHaveAttribute('data-table-keyboard-mode', 'interaction')

    await user.keyboard('{Escape}')
    await waitFor(() => {
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    })
    expect(grid).toHaveAttribute('data-table-keyboard-mode', 'interaction')

    await user.keyboard('{Escape}')
    await waitFor(() => {
      expect(grid).toHaveAttribute('data-table-keyboard-mode', 'grid')
    })
    expect(document.activeElement).toBe(trigger.closest('[role="gridcell"]') as HTMLElement)
  })
})
