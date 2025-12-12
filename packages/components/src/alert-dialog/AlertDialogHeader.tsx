import { cx } from 'class-variance-authority'
import { type ReactElement, type ReactNode, Ref } from 'react'

export interface AlertDialogHeaderProps {
  children: ReactNode
  className?: string
  ref?: Ref<HTMLDivElement>
}

export const AlertDialogHeader = ({
  children,
  className,
  ref,
  ...rest
}: AlertDialogHeaderProps): ReactElement => (
  <header
    data-spark-component="alert-dialog-header"
    ref={ref}
    className={cx(className, ['px-xl', 'py-lg'])}
    {...rest}
  >
    {children}
  </header>
)

AlertDialogHeader.displayName = 'AlertDialog.Header'
