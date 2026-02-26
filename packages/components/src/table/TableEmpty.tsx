import { cx } from 'class-variance-authority'
import type { ReactNode } from 'react'

export interface TableEmptyProps {
  className?: string
  children?: ReactNode
}

export function TableEmpty({ className, children }: TableEmptyProps) {
  return (
    <div data-spark-component="table-empty" className={cx('p-lg', className)}>
      {children}
    </div>
  )
}

TableEmpty.displayName = 'Table.Empty'
