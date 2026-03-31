import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Table } from '..'

describe('Table rendering and structure', () => {
  it('should render a table with correct structure and accessibility', () => {
    render(
      <Table>
        <Table.Grid aria-label="Files">
          <Table.Header>
            <Table.Column isRowHeader label="Name" />
            <Table.Column label="Type" />
            <Table.Column label="Date Modified" />
          </Table.Header>
          <Table.Body>
            <Table.Row id="row-1">
              <Table.Cell>Games</Table.Cell>
              <Table.Cell>File folder</Table.Cell>
              <Table.Cell>6/7/2020</Table.Cell>
            </Table.Row>
            <Table.Row id="row-2">
              <Table.Cell>Program Files</Table.Cell>
              <Table.Cell>File folder</Table.Cell>
              <Table.Cell>4/7/2021</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Grid>
      </Table>
    )

    const table = screen.getByRole('grid', { name: 'Files' })
    expect(table).toBeInTheDocument()

    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Type')).toBeInTheDocument()
    expect(screen.getByText('Date Modified')).toBeInTheDocument()
    expect(screen.getByText('Games')).toBeInTheDocument()
    expect(screen.getByText('Program Files')).toBeInTheDocument()
    expect(screen.getAllByText('File folder')).toHaveLength(2)
    expect(screen.getByText('6/7/2020')).toBeInTheDocument()
    expect(screen.getByText('4/7/2021')).toBeInTheDocument()
  })

  it('should have data-spark-component attributes', () => {
    render(
      <Table>
        <Table.Grid aria-label="Test">
          <Table.Header>
            <Table.Column label="Col" />
          </Table.Header>
          <Table.Body>
            <Table.Row id="r1">
              <Table.Cell>Cell</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Grid>
      </Table>
    )

    expect(document.querySelector('[data-spark-component="table"]')).toBeInTheDocument()
    expect(document.querySelector('[data-spark-component="table-header"]')).toBeInTheDocument()
    expect(document.querySelector('[data-spark-component="table-column"]')).toBeInTheDocument()
    expect(document.querySelector('[data-spark-component="table-body"]')).toBeInTheDocument()
    expect(document.querySelector('[data-spark-component="table-row"]')).toBeInTheDocument()
    expect(document.querySelector('[data-spark-component="table-cell"]')).toBeInTheDocument()
  })

  it('should render empty state when Table.Body has no rows', () => {
    render(
      <Table>
        <Table.Grid aria-label="Empty">
          <Table.Header>
            <Table.Column label="Col" />
          </Table.Header>
          <Table.Body items={[]} renderEmptyState={() => 'No results found.'}>
            {() => null}
          </Table.Body>
        </Table.Grid>
      </Table>
    )

    expect(screen.getByRole('grid', { name: 'Empty' })).toBeInTheDocument()
    expect(screen.getByText('No results found.')).toBeInTheDocument()
  })

  it('should support dynamic rows via items prop', () => {
    const rows = [
      { id: '1', name: 'Alpha', value: 'A' },
      { id: '2', name: 'Beta', value: 'B' },
    ]

    render(
      <Table>
        <Table.Grid aria-label="Dynamic">
          <Table.Header>
            <Table.Column isRowHeader label="Name" />
            <Table.Column label="Value" />
          </Table.Header>
          <Table.Body items={rows}>
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

    expect(screen.getByText('Alpha')).toBeInTheDocument()
    expect(screen.getByText('Beta')).toBeInTheDocument()
    expect(screen.getByText('A')).toBeInTheDocument()
    expect(screen.getByText('B')).toBeInTheDocument()
  })

  it('should accept className on Table.Grid', () => {
    render(
      <Table>
        <Table.Grid
          aria-label="Styled"
          className="custom-table"
        >
          <Table.Header>
            <Table.Column label="Col" />
          </Table.Header>
          <Table.Body>
            <Table.Row id="r1">
              <Table.Cell>Cell</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Grid>
      </Table>
    )

    const table = screen.getByRole('grid', { name: 'Styled' })
    expect(table).toHaveClass('custom-table')
  })
})
