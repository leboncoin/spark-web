import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { cx } from 'class-variance-authority'
import { ComponentProps, Ref } from 'react'

export interface DrawerTitleProps extends Omit<ComponentProps<typeof BaseDialog.Title>, 'render'> {
  ref?: Ref<HTMLHeadingElement>
}

/**
 * The title of the drawer, announced to assistive technology. Renders an <h2> element.
 */
export const DrawerTitle = ({ className, ...props }: DrawerTitleProps) => {
  return (
    <BaseDialog.Title
      data-spark-component="drawer-title"
      className={cx('text-headline-2 text-on-surface', className)}
      {...props}
    />
  )
}

DrawerTitle.displayName = 'Drawer.Title'
