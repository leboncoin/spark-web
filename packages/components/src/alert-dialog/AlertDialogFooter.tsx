import { cx } from 'class-variance-authority'
import { type ReactElement, type ReactNode, Ref } from 'react'

export interface AlertDialogFooterProps {
  children: ReactNode
  className?: string
  ref?: Ref<HTMLDivElement>
}

/**
 * The footer section of the alert dialog, typically containing action buttons. Renders a <footer> element.
 */
export const AlertDialogFooter = ({
  children,
  className,
  ref,
  ...rest
}: AlertDialogFooterProps): ReactElement => (
  <footer
    data-spark-component="alert-dialog-footer"
    ref={ref}
    className={cx(className, ['px-xl', 'py-lg'])}
    {...rest}
  >
    {children}
  </footer>
)

AlertDialogFooter.displayName = 'AlertDialog.Footer'
