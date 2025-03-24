import { cx } from 'class-variance-authority'
import { type ReactElement, type ReactNode, Ref } from 'react'

export interface FooterProps {
  children: ReactNode
  className?: string
  ref?: Ref<HTMLDivElement>
}

export const Footer = ({ children, className, ref, ...rest }: FooterProps): ReactElement => (
  <footer ref={ref} className={cx(className, ['px-xl', 'py-lg'])} {...rest}>
    {children}
  </footer>
)

Footer.displayName = 'Dialog.Footer'
