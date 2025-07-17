import { ComponentProps } from 'react'

import { Slot } from '../slot'
import { contentStyles } from './Content.styles'
import { useCardContext } from './context'

export interface ContentProps extends ComponentProps<'div'> {
  /**
   * Change the component to the HTML tag or custom component of the only child.
   */
  asChild?: boolean
  /**
   * Whether the card should have an inset padding.
   */
  inset?: boolean
}

export const Content = ({ children, inset, asChild, className, ref, ...props }: ContentProps) => {
  const Component = asChild ? Slot : 'div'
  const { design, intent, hasBackdrop } = useCardContext()

  return (
    <Component
      data-spark-component="card-content"
      ref={ref}
      className={contentStyles({
        className,
        design,
        intent,
        inset,
        hasBackdrop,
      })}
      {...props}
    >
      {children}
    </Component>
  )
}

Content.displayName = 'Content'
