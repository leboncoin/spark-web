/* eslint-disable max-lines-per-function */
import { useFormFieldControl } from '@spark-ui/components/form-field'
import { useMergeRefs } from '@spark-ui/hooks/use-merge-refs'
import { cx } from 'class-variance-authority'
import { ComponentPropsWithoutRef, Fragment, Ref, useCallback, useEffect } from 'react'
import { useSnapshot } from 'valtio'
import { subscribeKey } from 'valtio/utils'

import { Popover } from '../popover'
import { VisuallyHidden } from '../visually-hidden'
import { useAutoComplete } from './Root'

type InputPrimitiveProps = ComponentPropsWithoutRef<'input'>

interface InputProps extends Omit<InputPrimitiveProps, 'value' | 'placeholder'> {
  className?: string
  placeholder?: string
  onValueChange?: (value: string) => void
  ref?: Ref<HTMLInputElement>
}

export const Input = ({
  'aria-label': ariaLabel,
  className,
  placeholder,
  onValueChange,
  ref: forwardedRef,
  ...props
}: InputProps) => {
  const { state, actions, refs } = useAutoComplete()
  const snap = useSnapshot(state)
  const field = useFormFieldControl()

  const { isInvalid, description } = field

  const PopoverTrigger = snap.hasPopover ? Popover.Trigger : Fragment
  const popoverTriggerProps = snap.hasPopover
    ? {
        asChild: true,
        type: undefined,
        'aria-haspopup': undefined,
      }
    : {}

  useEffect(() => {
    const unsubscribe = subscribeKey(state, 'inputDisplayValue', value => {
      onValueChange?.(value)
    })

    return () => {
      unsubscribe()
    }
  }, [onValueChange, snap.inputDisplayValue, state])

  useEffect(() => {
    const isFocusOutside = (target: Node) => {
      const isOutsideTrigger = refs.triggerRef.current && !refs.triggerRef.current.contains(target)
      const isOutsideItems = refs.menuRef.current && !refs.menuRef.current.contains(target)

      return isOutsideTrigger && isOutsideItems
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (isFocusOutside(event.target as Node) && snap.isOpen) {
        actions.onBlur({ type: 'mouse' })
      }
    }

    const handleFocusOut = (event: FocusEvent) => {
      if (!event.relatedTarget) return

      if (isFocusOutside(event.relatedTarget as Node) && snap.isOpen) {
        actions.onBlur({ type: 'keyboard' })
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('focusout', handleFocusOut)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('focusout', handleFocusOut)
    }
  }, [actions, snap.isOpen, refs.triggerRef, refs.menuRef])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault()
        if (!snap.isOpen) {
          actions.openMenu()
        } else if (e.key === 'ArrowDown') {
          actions.highlightNextOption()
        } else if (e.key === 'ArrowUp') {
          actions.highlightPreviousOption()
        }
      }

      if (e.key === 'Enter') {
        actions.selectHighlightedOption()
        actions.closeMenu()
        actions.focusInput()
      }

      if (e.key === 'Escape') {
        actions.closeMenu()
      }
    },
    [actions, snap.isOpen]
  )

  // TODO: merge with event props
  const eventProps = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      e.persist()
      const caretStart = e.target.selectionStart
      const caretEnd = e.target.selectionEnd

      actions.setInputDisplayValue(e.target.value)

      // Reset caret position after state update
      requestAnimationFrame(() => {
        e.target.setSelectionRange(caretStart, caretEnd)
      })

      onValueChange?.(e.target.value)
      props.onChange?.(e)
    },
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
      handleKeyDown(e)
      props.onKeyDown?.(e)
    },
    onInput: (e: React.ChangeEvent<HTMLInputElement>) => {
      actions.typeInputValue(e.target.value)
      props.onInput?.(e)
    },
  }

  const ref = useMergeRefs(forwardedRef, refs.inputRef)

  return (
    <>
      {ariaLabel && (
        <VisuallyHidden>
          <label id={`${snap.id}-label`} htmlFor={`${snap.id}-input`}>
            {ariaLabel}
          </label>
        </VisuallyHidden>
      )}

      {/* <input type="text" value="test" className="bg-main absolute inset-0" /> */}
      <PopoverTrigger {...popoverTriggerProps}>
        <input
          type="text"
          ref={ref}
          id={`${snap.id}-input`}
          data-spark-component="autocomplete-input"
          aria-invalid={isInvalid}
          aria-describedby={description}
          aria-controls={`${snap.id}-menu`}
          aria-labelledby={`${snap.id}-label`}
          {...(snap.inputDisplayValue === '' && { placeholder })}
          className={cx(
            'max-w-full shrink-0 grow basis-[80px]',
            'h-sz-28 bg-surface px-sm text-body-1 text-ellipsis outline-hidden',
            'disabled:text-on-surface/dim-3 disabled:cursor-not-allowed disabled:bg-transparent',
            'read-only:text-on-surface read-only:cursor-default read-only:bg-transparent',
            className
          )}
          {...props}
          {...eventProps}
          value={snap.inputDisplayValue}
          aria-label={ariaLabel}
          disabled={snap.disabled || snap.readOnly}
          readOnly={snap.readOnly}
        />
      </PopoverTrigger>
    </>
  )
}

Input.displayName = 'AutoComplete.Input'
