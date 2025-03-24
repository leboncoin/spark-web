import { cx } from 'class-variance-authority'
import { type ReactElement, type ReactNode, Ref } from 'react'

export interface DrawerHeaderProps {
  children: ReactNode
  className?: string
  ref?: Ref<HTMLDivElement>
}

export const DrawerHeader = ({
  children,
  className,
  ref,
  ...rest
}: DrawerHeaderProps): ReactElement => (
  <header ref={ref} className={cx(['px-xl', 'py-lg'], className)} {...rest}>
    {children}
  </header>
)

DrawerHeader.displayName = 'Dialog.Header'
