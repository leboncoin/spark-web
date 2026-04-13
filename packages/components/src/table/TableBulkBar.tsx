import { cx } from 'class-variance-authority'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { createContext, useContext } from 'react'

import { Button, type ButtonProps } from '../button'
import { useTableContext } from './internal/TableContext'

interface TableBulkBarContextValue {
  selectedCount: number
  totalCount?: number
  onClearSelection: () => void
  onSelectAll?: () => void
  /** When true, "Clear all" and "Select all" are shown (subject to their own conditions). */
  hasMultiplePages?: boolean
}

const TableBulkBarContext = createContext<TableBulkBarContextValue | null>(null)

function useTableBulkBarContext() {
  const ctx = useContext(TableBulkBarContext)

  if (!ctx) {
    throw new Error('Table.BulkBar subcomponents must be used within Table.BulkBar')
  }

  return ctx
}

export interface TableBulkBarProps {
  children: ReactNode
  className?: string
  /** `aria-label` for the toolbar (for i18n). Overrides `bulkBarAriaLabel` from `Table`. */
  'aria-label'?: string
  /**
   * Additional props passed to the root element.
   * Note: `role` is fixed to "toolbar".
   */
  rootProps?: Omit<ComponentPropsWithoutRef<'div'>, 'children' | 'className' | 'role' | 'aria-label'>
}

/**
 * A toolbar component for bulk actions on table rows. Displays selected row count and action buttons.
 * Must be used within a Table component.
 */
function TableBulkBarRoot({ children, className, rootProps, ...props }: TableBulkBarProps) {
  const { selectedCount, totalCount, onClearSelection, onSelectAll, hasMultiplePages } = useTableContext()

  const contextValue: TableBulkBarContextValue = {
    selectedCount,
    totalCount,
    onClearSelection,
    onSelectAll,
    hasMultiplePages,
  }

  return (
    <TableBulkBarContext.Provider value={contextValue}>
      <div
        role="toolbar"
        aria-label={props['aria-label'] ?? 'Table bulk actions'}
        data-spark-component="table-bulk-bar"
        className={cx(
          'gap-lg min-h-sz-64 flex w-full flex-wrap items-center justify-between',
          'rounded-lg',
          'bg-support-container text-on-support-container p-lg',
          className
        )}
        {...rootProps}
      >
        {children}
      </div>
    </TableBulkBarContext.Provider>
  )
}

/**
 * Displays the count of selected rows in the bulk action bar. Typically used to show text like "5 items selected".
 */
function TableBulkBarSelectedCount({ children }: { children: ReactNode }) {
  useTableBulkBarContext() // enforce usage within BulkBar

  return <span className="text-body-1 font-bold">{children}</span>
}

type BulkBarButtonProps = Omit<ButtonProps, 'onClick'>

/**
 * A button to clear all selected rows. Only visible when hasMultiplePages is true in the Table context.
 * Automatically disabled when no rows are selected.
 */
function TableBulkBarClearButton({ className, children, ...props }: BulkBarButtonProps) {
  const { selectedCount, onClearSelection, hasMultiplePages } = useTableBulkBarContext()

  if (!hasMultiplePages) {
    return null
  }

  const ariaDisabled = selectedCount === 0

  return (
    <Button
      size="sm"
      design="ghost"
      intent="support"
      underline
      ariaDisabled={ariaDisabled}
      onClick={onClearSelection}
      className={cx('text-body-2', className)}
      {...props}
    >
      {children}
    </Button>
  )
}

/**
 * A button to select all rows across all pages. Only visible when hasMultiplePages is true in the Table context.
 * Automatically disabled when all rows are already selected or when onSelectAll is not provided.
 */
function TableBulkBarSelectAllButton({ className, children, ...props }: BulkBarButtonProps) {
  const { selectedCount, totalCount, onSelectAll, hasMultiplePages } = useTableBulkBarContext()

  if (!hasMultiplePages) {
    return null
  }

  const ariaDisabled = totalCount == null || onSelectAll == null || selectedCount >= totalCount

  return (
    <Button
      size="sm"
      design="ghost"
      intent="support"
      underline
      ariaDisabled={ariaDisabled}
      onClick={onSelectAll}
      className={cx('text-body-2', className)}
      {...props}
    >
      {children}
    </Button>
  )
}

TableBulkBarRoot.displayName = 'Table.BulkBar'

export const TableBulkBar = TableBulkBarRoot
TableBulkBar.displayName = 'Table.BulkBar'

export { TableBulkBarSelectedCount, TableBulkBarClearButton, TableBulkBarSelectAllButton }
TableBulkBarSelectedCount.displayName = 'Table.BulkBarSelectedCount'
TableBulkBarClearButton.displayName = 'Table.BulkBarClearButton'
TableBulkBarSelectAllButton.displayName = 'Table.BulkBarSelectAllButton'
