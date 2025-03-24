import { useMergeRefs } from '@spark-ui/use-merge-refs'
import { cx } from 'class-variance-authority'
import { Fragment, ReactNode, Ref, useEffect, useRef } from 'react'

import { useFormFieldControl } from '../form-field'
import { Popover } from '../popover'
import { useComboboxContext } from './ComboboxContext'
import { styles } from './ComboboxTrigger.styles'
import { findElement } from './utils'
import { useWidthIncreaseCallback } from './utils/useWidthIncreaseCallback'

interface TriggerProps {
  className?: string
  children: ReactNode
  ref?: Ref<HTMLDivElement>
}

export const Trigger = ({ className, children, ref: forwardedRef }: TriggerProps) => {
  const ctx = useComboboxContext()
  const field = useFormFieldControl()

  // Trigger compound elements
  const leadingIcon = findElement(children, 'Combobox.LeadingIcon')
  const selectedItems = findElement(children, 'Combobox.SelectedItems')
  const input = findElement(children, 'Combobox.Input')
  const clearButton = findElement(children, 'Combobox.ClearButton')
  const disclosure = findElement(children, 'Combobox.Disclosure')

  const [PopoverAnchor, popoverAnchorProps] = ctx.hasPopover
    ? [Popover.Anchor, { asChild: true, type: undefined }]
    : [Fragment, {}]

  const ref = useMergeRefs(forwardedRef, ctx.triggerAreaRef)
  const scrollableAreaRef = useRef<HTMLDivElement>(null)

  const disabled = field.disabled || ctx.disabled
  const readOnly = field.readOnly || ctx.readOnly

  const hasClearButton = !!clearButton && !disabled && !readOnly

  /**
   * In case wrap behaviour is disabled, we sometimes need to scroll to the right-side of the trigger:
   * - when a selected item chip is added.
   * - when the component width changes (window resizing, etc.)
   *
   * The goal is that the typing area remains visible at all times.
   */
  const scrollToRight = () => {
    if (scrollableAreaRef.current && !ctx.wrap) {
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

  return (
    <>
      <PopoverAnchor {...popoverAnchorProps}>
        <div
          ref={ref}
          className={styles({
            className,
            state: ctx.state,
            disabled,
            readOnly,
            allowWrap: ctx.wrap,
          })}
          onClick={() => {
            if (!ctx.isOpen && !disabled && !readOnly) {
              ctx.openMenu()
              if (ctx.innerInputRef.current) {
                ctx.innerInputRef.current.focus()
              }
            }
          }}
        >
          {leadingIcon}
          <div
            ref={scrollableAreaRef}
            className={cx(
              'min-w-none gap-sm py-md inline-flex grow items-start',
              ctx.wrap ? 'flex-wrap' : 'u-no-scrollbar overflow-x-auto p-[2px]'
            )}
          >
            {selectedItems}
            {input}
          </div>

          {hasClearButton && clearButton}

          {disclosure}
        </div>
      </PopoverAnchor>
    </>
  )
}

Trigger.displayName = 'Combobox.Trigger'
