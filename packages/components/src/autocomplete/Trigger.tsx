import { useFormFieldControl } from '@spark-ui/components/form-field'
import { useMergeRefs } from '@spark-ui/hooks/use-merge-refs'
import { cx } from 'class-variance-authority'
import { Fragment, ReactNode, Ref, useCallback, useEffect, useRef } from 'react'
import { useSnapshot } from 'valtio'

import { Popover } from '../popover'
import { useAutoComplete } from './Root'
import { styles } from './Trigger.styles'
import { findElement } from './utils'
import { useWidthIncreaseCallback } from './utils/useWidthIncreaseCallback'

interface TriggerProps {
  className?: string
  children: ReactNode
  ref?: Ref<HTMLDivElement>
}

export const Trigger = ({ className, children, ref: forwardedRef }: TriggerProps) => {
  const field = useFormFieldControl()
  const { state, refs, actions } = useAutoComplete()
  const snap = useSnapshot(state)

  // Trigger compound elements
  const leadingIcon = findElement(children, 'AutoComplete.LeadingIcon')
  const input = findElement(children, 'AutoComplete.Input')
  const clearButton = findElement(children, 'AutoComplete.ClearButton')
  const disclosure = findElement(children, 'AutoComplete.Disclosure')

  const [PopoverAnchor, popoverAnchorProps] = snap.hasPopover
    ? [Popover.Anchor, { asChild: true, type: undefined }]
    : [Fragment, {}]

  const scrollableAreaRef = useRef<HTMLDivElement>(null)

  const disabled = field.disabled || snap.disabled
  const readOnly = field.readOnly || snap.readOnly

  const hasClearButton = !!clearButton && !disabled && !readOnly

  /**
   * In case wrap behaviour is disabled, we sometimes need to scroll to the right-side of the trigger:
   * - when a selected item chip is added.
   * - when the component width changes (window resizing, etc.)
   *
   * The goal is that the typing area remains visible at all times.
   */
  const scrollToRight = () => {
    if (scrollableAreaRef.current) {
      const { scrollWidth, clientWidth } = scrollableAreaRef.current
      // Scroll to the rightmost position
      scrollableAreaRef.current.scrollLeft = scrollWidth - clientWidth
    }
  }

  useWidthIncreaseCallback(scrollableAreaRef, scrollToRight)

  useEffect(() => {
    const resizeObserver = new ResizeObserver(scrollToRight)

    if (scrollableAreaRef.current) {
      resizeObserver.observe(scrollableAreaRef.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  const ref = useMergeRefs(forwardedRef, refs.triggerRef)

  const handleClick = useCallback(() => {
    if (!disabled && !readOnly) {
      actions.focusInput()
      if (!snap.isOpen) actions.openMenu()
    }
  }, [actions, disabled, readOnly, snap.isOpen])

  return (
    <>
      <PopoverAnchor {...popoverAnchorProps}>
        <div
          ref={ref}
          className={styles({
            className,
            state: snap.state,
            disabled,
            readOnly,
          })}
          onClick={handleClick}
        >
          {leadingIcon}
          <div
            ref={scrollableAreaRef}
            className={cx(
              'min-w-none gap-sm py-md inline-flex grow items-start',
              'u-no-scrollbar overflow-x-auto p-[2px]'
            )}
          >
            {input}
          </div>

          {hasClearButton && clearButton}

          {disclosure}
        </div>
      </PopoverAnchor>
    </>
  )
}

Trigger.displayName = 'AutoComplete.Trigger'
