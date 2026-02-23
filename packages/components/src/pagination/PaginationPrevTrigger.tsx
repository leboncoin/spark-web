import { ArrowVerticalLeft } from '@spark-ui/icons/ArrowVerticalLeft'
import { mergeProps } from '@zag-js/react'
import { ComponentPropsWithoutRef, Ref } from 'react'

import { Icon } from '../icon'
import { IconButton } from '../icon-button'
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

export type PrevTriggerProps = (AnchorProps | ButtonProps) & {
  'aria-label': string
  ref?: Ref<HTMLButtonElement>
}

export const PrevTrigger = ({ children, className, href, ref, ...props }: PrevTriggerProps) => {
  const { pagination, type } = usePagination()

  // ZagJS props
  const apiProps = pagination.getPrevTriggerProps()

  const shouldDisableLink =
    type === 'link' &&
    (apiProps as typeof apiProps & { 'data-disabled'?: string })['data-disabled'] === ''

  // Locally managed props
  const localProps = {
    'data-spark-component': 'pagination-prev-trigger',
    intent: 'support',
    design: 'contrast',
    ...props,
    className,
    ...(shouldDisableLink && {
      disabled: true,
      role: 'link',
      'aria-disabled': true,
    }),
  }

  // We know 'aria-label' is included in props
  type WithAriaLabel = Omit<typeof apiProps, 'aria-label'> & { 'aria-label': string }

  const mergedProps = mergeProps(
    apiProps,
    localProps as unknown as typeof apiProps
  ) as WithAriaLabel

  const content = children || (
    <Icon>
      <ArrowVerticalLeft />
    </Icon>
  )

  return (
    <li>
      {href ? (
        <IconButton ref={ref} {...mergedProps} asChild>
          <a href={shouldDisableLink ? undefined : href}>{content}</a>
        </IconButton>
      ) : (
        <IconButton ref={ref} {...mergedProps}>
          {content}
        </IconButton>
      )}
    </li>
  )
}

PrevTrigger.displayName = 'Pagination.PrevTrigger'
