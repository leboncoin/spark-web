import { Collapsible } from '@base-ui/react/collapsible'
import { cx } from 'class-variance-authority'
import { type ComponentProps } from 'react'

export interface ContentProps extends ComponentProps<typeof Collapsible.Panel> {}

export const Content = ({
  className,
  children,
  hiddenUntilFound = true,
  ...props
}: ContentProps) => {
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
      hiddenUntilFound={hiddenUntilFound}
      {...props}
    >
      {children}
    </Collapsible.Panel>
  )
}

Content.displayName = 'Collapsible.Content'
