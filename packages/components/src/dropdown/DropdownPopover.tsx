import { cx } from 'class-variance-authority'
import { ComponentProps, useEffect } from 'react'

import { Popover as SparkPopover } from '../popover'
import { useDropdownContext } from './DropdownContext'

export const Popover = ({
  children,
  matchTriggerWidth = true,
  sideOffset = 4,
  className,
  elevation = 'dropdown',
  ref: forwardedRef,
  ...props
}: ComponentProps<typeof SparkPopover.Content>) => {
  const ctx = useDropdownContext()

  useEffect(() => {
    ctx.setHasPopover(true)

    return () => ctx.setHasPopover(false)
  }, [])

  return (
    <SparkPopover.Content
      ref={forwardedRef}
      inset
      asChild
      matchTriggerWidth={matchTriggerWidth}
      elevation={elevation}
      className={cx('relative', className)}
      sideOffset={sideOffset}
      onOpenAutoFocus={e => {
        /**
         * With a combobox pattern, the focus should remain on the trigger at all times.
         * Passing the focus to the dropdown popover would break keyboard navigation.
         */
        e.preventDefault()
      }}
      {...props}
      data-spark-component="dropdown-popover"
    >
      {children}
    </SparkPopover.Content>
  )
}

Popover.displayName = 'Dropdown.Popover'
