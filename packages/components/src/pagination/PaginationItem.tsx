import { mergeProps } from '@zag-js/react'
import { ComponentPropsWithoutRef, ReactElement, Ref } from 'react'

import { Button } from '../button'
import { usePagination } from './PaginationContext'

type AnchorProps = ComponentPropsWithoutRef<'a'> & {
  href: string
  asChild?: never
}

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  /**
   * Change the component to the HTML tag or custom component of the only child.
   * Unavailable for anchor items (with `href` prop) since the component will already be rendered as an anchor element.
   */
  asChild?: boolean
  href?: never
}

export type ItemProps = (AnchorProps | ButtonProps) & {
  'aria-label': string
  value: number
  ref?: Ref<HTMLButtonElement>
}

/**
 * A numbered page item.
 * Should be used within `Pagination.Pages` to ensure proper functionality and accessibility.
 *
 * Can be rendered as an anchor or a button :
 * - Set a `href` prop to render the item as an anchor element.
 * - When using `href`, the `asChild` prop isn’t available since the component will already be rendered as an anchor element.
 */
export function Item({ children, value, className, href, ref, ...props }: ItemProps): ReactElement {
  const { pagination } = usePagination()

  // ZagJS props
  const apiProps = pagination.getItemProps({ type: 'page', value })

  // Locally managed props
  const localProps = {
    'data-spark-component': 'pagination-item',
    intent: 'support',
    design: apiProps['aria-current'] === 'page' ? 'filled' : 'contrast',
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
