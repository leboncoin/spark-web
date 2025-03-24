import { mergeProps } from '@zag-js/react'
import { cx } from 'class-variance-authority'
import { type ComponentPropsWithRef } from 'react'

import { usePagination } from './PaginationContext'

interface EllipsisProps extends ComponentPropsWithRef<'span'> {
  index: number
}

export const Ellipsis = ({ children, index, className, ref, ...rest }: EllipsisProps) => {
  const { pagination } = usePagination()
  const apiProps = pagination.getEllipsisProps({ index })
  const localProps = {
    className: cx('flex size-sz-44 items-center justify-center', className),
    ...rest,
  }

  const mergedProps = mergeProps(apiProps, localProps)

  return (
    <li>
      <span
        data-spark-component="pagination-ellipsis"
        ref={ref}
        className={cx('size-sz-44 flex items-center justify-center')}
        {...mergedProps}
      >
        {children || '\u2026'}
      </span>
    </li>
  )
}

Ellipsis.displayName = 'Pagination.Ellipsis'
