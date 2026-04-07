import type { TableProps as AriaTableProps } from '@react-types/table'

import { ResizableTableContainer } from './ResizableTableContainer'
import { useTableContext } from './TableContext'
import { TableRoot } from './TableRoot'

function toMaxHeightStyle(value: number | string): React.CSSProperties['maxHeight'] {
  return typeof value === 'number' ? `${value}px` : value
}

export interface TableGridProps {
  /** Required for accessibility. */
  'aria-label'?: string
  'aria-labelledby'?: string
  className?: string
  children?: AriaTableProps<object>['children']
}

export function TableGrid({
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  className: gridClassName,
  children,
}: TableGridProps) {
  const ctx = useTableContext()
  const {
    allowsResizing = true,
    maxHeight,
    onResizeStart,
    onResize,
    onResizeEnd,
    onKeyDownCapture,
    sortDescriptor,
    onSortChange,
    className: contextClassName,
    ...ariaTableProps
  } = ctx

  const scrollContainerStyle =
    maxHeight != null ? { maxHeight: toMaxHeightStyle(maxHeight) } : undefined
  const className = gridClassName ?? contextClassName

  const tableRootProps = {
    ...ariaTableProps,
    ...(ariaLabel != null && { 'aria-label': ariaLabel }),
    ...(ariaLabelledBy != null && { 'aria-labelledby': ariaLabelledBy }),
    sortDescriptor,
    onSortChange,
    onKeyDownCapture,
    className,
  }

  // React Aria's Table expects a tuple of [Header, Body] children.
  // We keep the public `Table.Grid` API flexible, so we intentionally type-erase at this boundary.
  const TableRootAny = TableRoot as any

  if (allowsResizing) {
    return (
      <ResizableTableContainer
        className={className}
        style={scrollContainerStyle}
        onResizeStart={onResizeStart}
        onResize={onResize}
        onResizeEnd={onResizeEnd}
      >
        <TableRootAny {...tableRootProps}>{children}</TableRootAny>
      </ResizableTableContainer>
    )
  }

  return (
    <div className="relative w-full overflow-auto" style={scrollContainerStyle}>
      <TableRootAny {...tableRootProps}>{children}</TableRootAny>
    </div>
  )
}

TableGrid.displayName = 'Table.Grid'
