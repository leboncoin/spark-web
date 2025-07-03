import { Collapsible } from '@base-ui-components/react/collapsible'
import { cx } from 'class-variance-authority'
import { type ComponentProps } from 'react'

import { useRenderSlot } from './useRenderSlot'

export interface ContentProps extends ComponentProps<typeof Collapsible.Panel> {
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
  asChild?: boolean
}

export const Content = ({
  asChild = false,
  className,
  children,
  hiddenUntilFound = true,
  ...props
}: ContentProps) => {
  const renderSlot = useRenderSlot(asChild, 'div')

  return (
    <Collapsible.Panel
      data-spark-component="collapsible-content"
      className={cx(
        'overflow-hidden',
        'h-[var(--collapsible-panel-height)]',
        'transition-all duration-200',
        'motion-reduce:transition-none',
        'data-[starting-style]:h-0',
        'data-[ending-style]:h-0',
        className
      )}
      render={renderSlot}
      hiddenUntilFound={hiddenUntilFound}
      {...props}
    >
      {children}
    </Collapsible.Panel>
  )
}

Content.displayName = 'Collapsible.Content'
