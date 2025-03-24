import { cx } from 'class-variance-authority'
import { type ReactElement, type ReactNode, Ref } from 'react'

export interface HeaderProps {
  children: ReactNode
  className?: string
  ref?: Ref<HTMLDivElement>
}

export const Header = ({ children, className, ref, ...rest }: HeaderProps): ReactElement => (
  <header ref={ref} className={cx(className, ['px-xl', 'py-lg'])} {...rest}>
    {children}
  </header>
)

Header.displayName = 'Dialog.Header'
