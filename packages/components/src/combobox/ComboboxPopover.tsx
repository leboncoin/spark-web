import { cx } from 'class-variance-authority'
import { Children, ComponentProps, isValidElement, type ReactNode, Ref, useEffect } from 'react'

import { Popover as SparkPopover } from '../popover'
import { useComboboxContext } from './ComboboxContext'

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
  const ctx = useComboboxContext()

  useEffect(() => {
    ctx.setHasPopover(true)

    return () => ctx.setHasPopover(false)
  }, [])

  const singleChild =
    Children.count(children) === 1 && isValidElement(children) ? Children.only(children) : null

  return (
    <SparkPopover.Content
      ref={forwardedRef}
      inset
      render={singleChild ?? undefined}
      matchTriggerWidth={matchTriggerWidth}
      className={cx('z-dropdown! relative', className)}
      sideOffset={sideOffset}
      onOpenAutoFocus={e => {
        e.preventDefault()
      }}
      {...props}
      data-spark-component="combobox-popover"
    >
      {singleChild ? (singleChild.props as { children?: ReactNode }).children : children}
    </SparkPopover.Content>
  )
}

Popover.displayName = 'Combobox.Popover'
