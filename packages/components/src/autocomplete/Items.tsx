import { useMergeRefs } from '@spark-ui/hooks/use-merge-refs'
import { cx } from 'class-variance-authority'
import { ComponentPropsWithoutRef, ReactNode, Ref, useLayoutEffect, useRef } from 'react'
import { useSnapshot } from 'valtio'

import { Spinner } from '../spinner'
import { useAutoComplete } from './Root'

interface ItemsProps extends ComponentPropsWithoutRef<'ul'> {
  children: ReactNode
  className?: string
  ref?: Ref<HTMLUListElement>
}

export const Items = ({ children, className, ref: forwardedRef, ...props }: ItemsProps) => {
  const { state, refs } = useAutoComplete()
  const snap = useSnapshot(state)

  const innerRef = useRef<HTMLElement>(null)

  const isOpen = snap.hasPopover ? snap.isOpen : true
  const isPointerEventsDisabled = snap.hasPopover && !isOpen

  /**
   * In a autocomplete pattern, the menu should always be in the DOM,
   * but we want to prevent the user from interacting with it when it's closed.
   */
  useLayoutEffect(() => {
    if (innerRef.current?.parentElement) {
      innerRef.current.parentElement.style.pointerEvents = isPointerEventsDisabled ? 'none' : ''
      innerRef.current.style.pointerEvents = isPointerEventsDisabled ? 'none' : ''
      innerRef.current.style.visibility = isPointerEventsDisabled ? 'hidden' : ''
      innerRef.current.style.opacity = isPointerEventsDisabled ? '0' : ''
    }
  }, [isPointerEventsDisabled])

  const ref = useMergeRefs(forwardedRef, innerRef, refs.menuRef)

  return (
    <ul
      ref={ref}
      id={`${snap.id}-menu`}
      aria-busy={snap.isLoading}
      aria-labelledby={`${snap.id}-label`}
      className={cx(
        className,
        'flex flex-col',
        snap.hasPopover && 'p-lg',
        snap.isLoading && 'items-center overflow-y-auto'
      )}
      {...props}
      data-spark-component="autocomplete-items"
    >
      {snap.isLoading ? <Spinner size="sm" /> : children}
    </ul>
  )
}

Items.displayName = 'AutoComplete.Items'
