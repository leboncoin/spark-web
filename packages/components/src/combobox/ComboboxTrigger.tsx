import { useFormFieldControl } from '@spark-ui/components/form-field'
import { useMergeRefs } from '@spark-ui/hooks/use-merge-refs'
import { cx } from 'class-variance-authority'
import { ReactNode, Ref, useEffect, useRef } from 'react'

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

  const ref = useMergeRefs(forwardedRef, ctx.triggerAreaRef)
  const scrollableAreaRef = useRef<HTMLDivElement>(null)

  const disabled = field.disabled || ctx.disabled
  const readOnly = field.readOnly || ctx.readOnly

  const hasClearButton = !!clearButton && !disabled && !readOnly

  const scrollToRight = () => {
    if (scrollableAreaRef.current && !ctx.wrap) {
      const { scrollWidth, clientWidth } = scrollableAreaRef.current
      scrollableAreaRef.current.scrollLeft = scrollWidth - clientWidth
    }
  }

  useWidthIncreaseCallback(scrollableAreaRef, scrollToRight)

  const hasSelectedItems = !!selectedItems
  useEffect(() => {
    ctx.setAreSelectedItemsInTrigger(hasSelectedItems)
  }, [hasSelectedItems])

  useEffect(() => {
    const resizeObserver = new ResizeObserver(scrollToRight)
    if (scrollableAreaRef.current) {
      resizeObserver.observe(scrollableAreaRef.current)
    }

    return () => resizeObserver.disconnect()
  }, [])

  const divProps = {
    ref,
    className: styles({
      className,
      state: ctx.state,
      disabled,
      readOnly,
      allowWrap: ctx.wrap,
    }),
    onClick: () => {
      if (!ctx.isOpen && !disabled && !readOnly) {
        ctx.openMenu()
        if (ctx.innerInputRef.current) {
          ctx.innerInputRef.current.focus()
        }
      }
    },
  }

  const content = (
    <>
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
    </>
  )

  return ctx.hasPopover ? (
    <Popover.Anchor render={<div />} {...divProps}>
      {content}
    </Popover.Anchor>
  ) : (
    <div {...divProps}>{content}</div>
  )
}

Trigger.displayName = 'Combobox.Trigger'
