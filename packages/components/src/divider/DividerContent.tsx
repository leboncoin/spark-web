import { cx } from 'class-variance-authority'
import { HTMLAttributes, ReactNode, Ref } from 'react'

export interface DividerContentProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Change the component to the HTML tag or custom component of the only child.
   */
  asChild?: boolean
  children?: ReactNode
  ref?: Ref<HTMLSpanElement>
}

export const DividerContent = ({ children, ref, className, ...props }: DividerContentProps) => {
  return children ? (
    <span
      ref={ref}
      {...props}
      className={cx('group-data-[writing-mode=vertical-lr]:[writing-mode:vertical-lr]', className)}
    >
      {children}
    </span>
  ) : null
}

DividerContent.displayName = 'Divider.Content'
