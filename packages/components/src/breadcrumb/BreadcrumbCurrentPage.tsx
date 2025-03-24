import { cx } from 'class-variance-authority'
import { ComponentPropsWithoutRef, Ref } from 'react'

import { Slot } from '../slot'
import { TextLink } from '../text-link'

export interface CurrentPageProps extends ComponentPropsWithoutRef<typeof TextLink> {
  asChild?: boolean
  className?: string
  ref?: Ref<HTMLAnchorElement>
}

export const CurrentPage = ({
  asChild = false,
  className,
  children,
  ...rest
}: CurrentPageProps) => {
  const Component = asChild ? Slot : 'span'

  return (
    <Component
      data-spark-component="breadcrumb-current-page"
      role="link"
      aria-disabled
      aria-current="page"
      className={cx(
        'inline! overflow-hidden font-bold text-ellipsis whitespace-nowrap text-current',
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  )
}

CurrentPage.displayName = 'Breadcrumb.CurrentPage'
