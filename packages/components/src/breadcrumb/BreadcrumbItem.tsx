import { cx } from 'class-variance-authority'
import { ComponentPropsWithoutRef, Ref } from 'react'

export interface ItemProps extends ComponentPropsWithoutRef<'li'> {
  className?: string
  ref?: Ref<HTMLLIElement>
}

export const Item = ({ className, ...rest }: ItemProps) => {
  return (
    <li
      data-spark-component="breadcrumb-item"
      className={cx('min-w-none gap-sm inline-flex items-center', className)}
      {...rest}
    />
  )
}

Item.displayName = 'Breadcrumb.Item'
