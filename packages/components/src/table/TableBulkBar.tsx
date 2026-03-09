import { cx } from 'class-variance-authority'
import type { ReactNode } from 'react'
import { createContext, useContext } from 'react'

import { Button, type ButtonProps } from '../button'

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

export interface TableBulkBarProps extends TableBulkBarContextValue {
  children: ReactNode
  className?: string
}

function TableBulkBarRoot({
  selectedCount,
  totalCount,
  onClearSelection,
  onSelectAll,
  hasMultiplePages,
  children,
  className,
}: TableBulkBarProps) {
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
        aria-label="Table bulk actions"
        data-spark-component="table-bulk-bar"
        className={cx(
          'gap-lg min-h-sz-64 flex w-full flex-wrap items-center justify-between',
          'rounded-lg',
          'bg-basic-container text-on-basic-container p-lg',
          className
        )}
      >
        {children}
      </div>
    </TableBulkBarContext.Provider>
  )
}

function TableBulkBarSelectedCount({ children }: { children: ReactNode }) {
  useTableBulkBarContext() // enforce usage within BulkBar

  return <span className="text-body-1 font-bold">{children}</span>
}

type BulkBarButtonProps = Omit<ButtonProps, 'onClick'>

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
