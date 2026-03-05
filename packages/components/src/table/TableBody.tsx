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

export function TableBody<T extends object>({
  className,
  renderEmptyState,
  ...props
}: TableBodyProps<T>) {
  const wrappedRenderEmptyState: AriaTableBodyProps<T>['renderEmptyState'] =
    renderEmptyState != null
      ? renderProps => (
          <div data-spark-component="table-empty" className="p-lg">
            {renderEmptyState(renderProps)}
          </div>
        )
      : undefined

  return (
    <AriaTableBody
      data-spark-component="table-body"
      className={cx(tableBodyStyles(), className)}
      renderEmptyState={wrappedRenderEmptyState}
      {...props}
    />
  )
}

TableBody.displayName = 'Table.Body'
