import { cx } from 'class-variance-authority'
import { ComponentProps, Ref } from 'react'

import { Popover as SparkPopover } from '../popover'

interface PopoverProps extends ComponentProps<typeof SparkPopover.Content> {
  ref?: Ref<HTMLDivElement>
}

export const Popover = ({
  children,
  matchTriggerWidth = true,
  sideOffset = 4,
  className,
  ref: forwardedRef,
  ...props
}: PopoverProps) => {
  return (
    <SparkPopover.Content
      ref={forwardedRef}
      inset
      asChild
      matchTriggerWidth={matchTriggerWidth}
      className={cx('z-dropdown! relative', className)}
      sideOffset={sideOffset}
      onOpenAutoFocus={e => {
        /**
         * With a autosuggest pattern, the focus should remain on the trigger at all times.
         * Passing the focus to the autosuggest popover would break keyboard navigation.
         */
        e.preventDefault()
      }}
      {...props}
      data-spark-component="autosuggest-popover"
    >
      {children}
    </SparkPopover.Content>
  )
}

Popover.displayName = 'AutoSuggest.Popover'
