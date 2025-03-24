import { useMergeRefs } from '@spark-ui/use-merge-refs'
import { cx } from 'class-variance-authority'
import { ComponentPropsWithoutRef, ReactNode, Ref, useLayoutEffect, useRef } from 'react'

import { Spinner } from '../spinner'
import { useComboboxContext } from './ComboboxContext'

interface ItemsProps extends ComponentPropsWithoutRef<'ul'> {
  children: ReactNode
  className?: string
  ref?: Ref<HTMLUListElement>
}

export const Items = ({ children, className, ref: forwardedRef, ...props }: ItemsProps) => {
  const ctx = useComboboxContext()

  const { ref: downshiftRef, ...downshiftMenuProps } = ctx.getMenuProps({
    onMouseMove: () => {
      ctx.setLastInteractionType('mouse')
    },
  })

  const innerRef = useRef<HTMLElement>(null)

  const ref = useMergeRefs(forwardedRef, downshiftRef, innerRef)

  const isOpen = ctx.hasPopover ? ctx.isOpen : true

  const isPointerEventsDisabled = ctx.hasPopover && !isOpen

  useLayoutEffect(() => {
    if (innerRef.current?.parentElement) {
      innerRef.current.parentElement.style.pointerEvents = isPointerEventsDisabled ? 'none' : ''
      innerRef.current.style.pointerEvents = isPointerEventsDisabled ? 'none' : ''
    }
  }, [isPointerEventsDisabled])

  return (
    <ul
      ref={ref}
      className={cx(
        className,
        'flex flex-col',
        isOpen ? 'block' : 'pointer-events-none invisible opacity-0',
        ctx.hasPopover && 'p-lg',
        ctx.isLoading && 'items-center overflow-y-auto'
      )}
      {...props}
      {...downshiftMenuProps}
      aria-busy={ctx.isLoading}
      data-spark-component="combobox-items"
    >
      {ctx.isLoading ? <Spinner size="sm" /> : children}
    </ul>
  )
}

Items.displayName = 'Combobox.Items'
