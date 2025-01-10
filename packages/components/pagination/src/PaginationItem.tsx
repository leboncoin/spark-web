import { Button } from '@spark-ui/button'
import { mergeProps } from '@zag-js/react'
import { ComponentPropsWithoutRef, RefObject } from 'react'

import { usePagination } from './PaginationContext'

interface AnchorProps extends ComponentPropsWithoutRef<'a'> {
  href: string
}

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  href?: undefined
}
export type ItemProps = Omit<AnchorProps | ButtonProps, 'aria-label'> & {
  'aria-label': string
  value: number
  ref?: RefObject<HTMLButtonElement>
}

export const Item = ({ children, value, className, href, ref, ...props }: ItemProps) => {
  const { pagination } = usePagination()

  // ZagJS props
  const apiProps = pagination.getItemProps({ type: 'page', value })

  // Locally managed props
  const localProps = {
    'data-spark-component': 'pagination-item',
    intent: 'support',
    design: apiProps['aria-current'] === 'page' ? 'filled' : 'ghost',
    className,
    ...props,
  }

  const mergedProps = mergeProps(apiProps, localProps)

  return (
    <li>
      {href ? (
        <Button ref={ref} {...mergedProps} asChild>
          <a href={href}>{children || value}</a>
        </Button>
      ) : (
        <Button ref={ref} {...mergedProps}>
          {children || value}
        </Button>
      )}
    </li>
  )
}

Item.displayName = 'Pagination.Item'
