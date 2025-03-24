import { ArrowDoubleLeft } from '@spark-ui/icons/ArrowDoubleLeft'
import { mergeProps } from '@zag-js/react'
import { ComponentPropsWithoutRef, Ref } from 'react'

import { Icon } from '../icon'
import { IconButton } from '../icon-button'
import { usePagination } from './PaginationContext'

interface AnchorProps extends ComponentPropsWithoutRef<'a'> {
  href: string
}

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  href?: undefined
}
export type FirstPageTriggerProps = Omit<AnchorProps | ButtonProps, 'aria-label'> & {
  'aria-label': string
  ref?: Ref<HTMLButtonElement>
}

export const FirstPageTrigger = ({
  children,
  className,
  href,
  ref,
  ...props
}: FirstPageTriggerProps) => {
  const { pagination, type } = usePagination()

  // ZagJS props
  const apiProps = pagination.getFirstPageTriggerProps()

  const shouldDisableLink =
    type === 'link' &&
    (apiProps as typeof apiProps & { 'data-disabled'?: string })['data-disabled'] === ''

  // Locally managed props
  const localProps = {
    'data-spark-component': 'pagination-first-page-trigger',
    intent: 'support',
    design: 'ghost',
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
      <ArrowDoubleLeft />
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

FirstPageTrigger.displayName = 'Pagination.FirstPageTrigger'
