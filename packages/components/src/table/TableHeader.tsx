import { cx } from 'class-variance-authority'
import type { ReactNode } from 'react'
import {
  Collection,
  Column as AriaColumn,
  TableHeader as AriaTableHeader,
  type TableHeaderProps as AriaTableHeaderProps,
  useTableOptions,
} from 'react-aria-components'

import { columnStyles } from './Table.styles'
import { TableSelectionCheckbox } from './TableSelectionCheckbox'

export interface TableHeaderProps<T extends object = object>
  extends Omit<AriaTableHeaderProps<T>, 'className'> {
  className?: string
  /** When true (default), the header row is sticky with z-raised and top-0. */
  sticky?: boolean
}

export function TableHeader<T extends object>({
  className,
  columns,
  children,
  sticky = true,
  ...props
}: TableHeaderProps<T>) {
  const { selectionBehavior, selectionMode, allowsDragging } = useTableOptions()

  return (
    <AriaTableHeader
      data-spark-component="table-header"
      className={cx(
        [
          sticky && 'z-raised sticky top-0',
          'text-on-neutral-container text-body-1 font-semibold',
          'after:pt-md after:block after:size-0',
        ],
        className
      )}
      columns={columns}
      {...props}
    >
      {allowsDragging && (
        <AriaColumn width={20} minWidth={20} className="w-sz-20 min-w-sz-20 box-border" />
      )}
      {selectionBehavior === 'toggle' && (
        <AriaColumn width={56} minWidth={56} className={cx(columnStyles())}>
          {selectionMode === 'multiple' && <TableSelectionCheckbox />}
        </AriaColumn>
      )}
      {columns != null ? (
        <Collection items={columns}>{children}</Collection>
      ) : (
        (children as ReactNode)
      )}
    </AriaTableHeader>
  )
}

TableHeader.displayName = 'Table.Header'
