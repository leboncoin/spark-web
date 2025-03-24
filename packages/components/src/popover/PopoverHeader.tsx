import { cx } from 'class-variance-authority'
import { type ReactNode, Ref, useId, useLayoutEffect } from 'react'

import { ID_PREFIX, usePopover } from './PopoverContext'

export interface HeaderProps {
  children: ReactNode
  className?: string
  ref?: Ref<HTMLDivElement>
}

export const Header = ({ children, className, ref, ...rest }: HeaderProps) => {
  const id = `${ID_PREFIX}-header-${useId()}`
  const { setHeaderId } = usePopover()

  useLayoutEffect(() => {
    setHeaderId(id)

    return () => setHeaderId(null)
  }, [id, setHeaderId])

  return (
    <header id={id} ref={ref} className={cx('mb-md text-headline-2', className)} {...rest}>
      {children}
    </header>
  )
}

Header.displayName = 'Popover.Header'
