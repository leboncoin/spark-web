// oxlint-disable max-lines-per-function
import type { TableState } from '@react-stately/table'
import type { GridNode } from '@react-types/grid'
import { ArrowDown } from '@spark-ui/icons/ArrowDown'
import { ArrowUp } from '@spark-ui/icons/ArrowUp'
import { Sort } from '@spark-ui/icons/Sort'
import { cx } from 'class-variance-authority'
import { useRef } from 'react'
import { mergeProps, useFocusRing, useTableColumnHeader } from 'react-aria'

import { Icon } from '../../icon'
import { columnHeaderContentStyles, columnStyles } from './Table.styles'
import { TableColumnResizer } from './TableColumnResizer'
import { useTableContext } from './TableContext'
import { TableHeaderSelectionCheckbox } from './TableHeaderSelectionCheckbox'

const stickyHeaderCellClassName = cx('sticky top-0 z-sticky')

export function TableColumnHeader({
  column,
  state,
  resizeState,
  stickyHeader,
  resizeCallbacks,
  isLastColumnInRow = false,
}: {
  column: GridNode<unknown>
  state: TableState<unknown>
  resizeState: any
  stickyHeader?: boolean
  resizeCallbacks: {
    onResizeStart?: (widths: any) => void
    onResize?: (widths: any) => void
    onResizeEnd?: (widths: any) => void
  }
  /** Rightmost header cell in this row. No resizer — nothing to resize against. */
  isLastColumnInRow?: boolean
}) {
  const ref = useRef<HTMLTableCellElement>(null)
  const { resizeColumnAriaLabel } = useTableContext()
  const { columnHeaderProps } = useTableColumnHeader({ node: column }, state, ref)
  const { isFocusVisible, focusProps } = useFocusRing()
  const allowsResizing = (column.props as any)?.allowsResizing !== false && !isLastColumnInRow
  const columnWidth = resizeState?.columnWidths?.get?.(column.key)
  const hasResizer = Boolean(resizeState && allowsResizing)

  if ((column.props as any)?.isSelectionCell) {
    return (
      <th
        {...columnHeaderProps}
        ref={ref}
        role="columnheader"
        className={cx(columnStyles({ checkbox: true }), stickyHeader && stickyHeaderCellClassName)}
        data-spark-component="table-column"
        data-table-selection-columnheader
        data-focus-visible={isFocusVisible || undefined}
      >
        <TableHeaderSelectionCheckbox state={state} />
      </th>
    )
  }

  const allowsSorting = Boolean((column.props as any)?.allowsSorting)
  const isSorted = state.sortDescriptor?.column === column.key
  const direction = state.sortDescriptor?.direction ?? 'ascending'
  const sortIcon = (() => {
    if (!isSorted) return <Sort />
    return direction === 'descending' ? <ArrowDown /> : <ArrowUp />
  })()

  const handleSortingKeyDown = (e: React.KeyboardEvent) => {
    // Ensure keyboard sorting works even when column resizing is enabled.
    if (!allowsSorting) return
    if (e.key !== 'Enter' && e.key !== ' ') return
    e.preventDefault()
    e.stopPropagation()
    ;(state as any).sort?.(column.key)
  }

  return (
    <th
      {...mergeProps(columnHeaderProps, focusProps)}
      ref={ref}
      role="columnheader"
      className={cx(
        columnStyles({ resizable: hasResizer }),
        stickyHeader && stickyHeaderCellClassName
      )}
      style={columnWidth ? { width: columnWidth } : undefined}
      data-spark-component="table-column"
      data-focus-visible={isFocusVisible || undefined}
      onKeyDown={handleSortingKeyDown}
    >
      <div className={columnHeaderContentStyles()}>
        <button
          type="button"
          className={cx(
            // Make the header title focusable so grid keyboard navigation lands here
            // instead of the resizer when resizing is enabled.
            'gap-md flex min-w-0 flex-1 items-center text-left',
            'focus-visible:u-outline outline-none',
            // Avoid default button styling impacting layout.
            'bg-transparent p-0 border-0'
          )}
          onKeyDown={handleSortingKeyDown}
        >
          <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
            {column.rendered}
          </span>
        </button>
        {allowsSorting ? (
          <span
            aria-hidden="true"
            className={cx(
              'shrink-0 opacity-dim-2 group-hover/column:opacity-100',
              isSorted && 'opacity-100'
            )}
          >
            <Icon size="sm">{sortIcon}</Icon>
          </span>
        ) : null}
      </div>
      {resizeState && allowsResizing ? (
        <TableColumnResizer
          column={column}
          ariaLabel={
            typeof resizeColumnAriaLabel === 'function'
              ? resizeColumnAriaLabel(column)
              : resizeColumnAriaLabel
          }
          resizeState={resizeState}
          resizeCallbacks={resizeCallbacks}
        />
      ) : null}
    </th>
  )
}

TableColumnHeader.displayName = 'Table.ColumnHeader'
