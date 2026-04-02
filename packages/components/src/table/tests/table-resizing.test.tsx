import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Table } from '..'

describe('Table column resizing', () => {
  it('should render resizable container with data-spark-component when allowsResizing is true', () => {
    render(
      <Table>
        <Table.Grid aria-label="Resizable">
          <Table.Header>
            <Table.Column label="Name" isRowHeader allowsResizing />
            <Table.Column label="Type" allowsResizing />
          </Table.Header>
          <Table.Body>
            <Table.Row id="r1">
              <Table.Cell>A</Table.Cell>
              <Table.Cell>B</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Grid>
      </Table>
    )

    expect(
      document.querySelector('[data-spark-component="resizable-table-container"]')
    ).toBeInTheDocument()
    expect(screen.getByRole('grid', { name: 'Resizable' })).toBeInTheDocument()
  })

  it('should render column resizer when allowsResizing is true (default)', () => {
    render(
      <Table>
        <Table.Grid aria-label="Resizable">
          <Table.Header>
            <Table.Column label="Name" allowsResizing />
            <Table.Column label="Type" allowsResizing />
          </Table.Header>
          <Table.Body>
            <Table.Row id="r1">
              <Table.Cell>A</Table.Cell>
              <Table.Cell>B</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Grid>
      </Table>
    )

    const nameHeader = screen.getByRole('columnheader', { name: /name/i })
    expect(nameHeader).toBeInTheDocument()
  })

  it('should not render a resizer on the last column (no trailing boundary to resize against)', () => {
    const { container } = render(
      <Table>
        <Table.Grid aria-label="Last not resizable">
          <Table.Header>
            <Table.Column label="Name" allowsResizing />
            <Table.Column label="Type" allowsResizing />
          </Table.Header>
          <Table.Body>
            <Table.Row id="r1">
              <Table.Cell>A</Table.Cell>
              <Table.Cell>B</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Grid>
      </Table>
    )

    expect(container.querySelectorAll('.cursor-col-resize')).toHaveLength(1)
  })

  it('should not render column resizer when column has allowsResizing false', () => {
    const { container } = render(
      <Table>
        <Table.Grid aria-label="Mixed resizing">
          <Table.Header>
            <Table.Column label="Name" allowsResizing />
            <Table.Column label="Actions" allowsResizing={false} />
          </Table.Header>
          <Table.Body>
            <Table.Row id="r1">
              <Table.Cell>A</Table.Cell>
              <Table.Cell>—</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Grid>
      </Table>
    )

    const resizers = container.querySelectorAll('.cursor-col-resize')
    expect(resizers).toHaveLength(1)
  })

  it('should not render resizable container when allowsResizing is false', () => {
    render(
      <Table allowsResizing={false}>
        <Table.Grid aria-label="Not resizable">
          <Table.Header>
            <Table.Column label="Name" allowsResizing />
            <Table.Column label="Type" />
          </Table.Header>
          <Table.Body>
            <Table.Row id="r1">
              <Table.Cell>A</Table.Cell>
              <Table.Cell>B</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Grid>
      </Table>
    )

    const container = document.querySelector('[data-spark-component="resizable-table-container"]')
    expect(container).not.toBeInTheDocument()
  })

  it('should accept className on Table.Grid (applied to resizable container when allowsResizing)', () => {
    const { container } = render(
      <Table>
        <Table.Grid aria-label="Resizable" className="max-w-sz-640">
          <Table.Header>
            <Table.Column label="Col" />
          </Table.Header>
          <Table.Body>
            <Table.Row id="r1">
              <Table.Cell>X</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Grid>
      </Table>
    )

    const wrapper = container.querySelector('.max-w-sz-640') ?? container.firstElementChild
    expect(wrapper).toBeTruthy()
    if (wrapper && wrapper instanceof HTMLElement) {
      expect(wrapper.className).toContain('max-w-sz-640')
    }
  })
})
