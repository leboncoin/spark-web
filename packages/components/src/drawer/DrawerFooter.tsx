import { cx } from 'class-variance-authority'
import { ComponentPropsWithoutRef, type ReactElement, Ref } from 'react'

export type DrawerFooterProps = ComponentPropsWithoutRef<'footer'> & {
  ref?: Ref<HTMLDivElement>
}

/**
 * The footer section of the drawer, typically containing action buttons. Renders a <footer> element.
 */
export const DrawerFooter = ({ className, ref, ...rest }: DrawerFooterProps): ReactElement => (
  <footer
    data-spark-component="drawer-footer"
    ref={ref}
    className={cx(['px-xl', 'py-lg'], className)}
    {...rest}
  />
)

DrawerFooter.displayName = 'Drawer.Footer'
