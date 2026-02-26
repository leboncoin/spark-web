import { cx } from 'class-variance-authority'
import {
  TableBody as AriaTableBody,
  type TableBodyProps as AriaTableBodyProps,
} from 'react-aria-components'

import { tableBodyStyles } from './Table.styles'

export interface TableBodyProps<T extends object = object>
  extends Omit<AriaTableBodyProps<T>, 'className'> {
  className?: string
}

export function TableBody<T extends object>({ className, ...props }: TableBodyProps<T>) {
  return (
    <AriaTableBody
      data-spark-component="table-body"
      className={cx(tableBodyStyles(), className)}
      {...props}
    />
  )
}

TableBody.displayName = 'Table.Body'
