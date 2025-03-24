import { useCombinedState } from '@spark-ui/use-combined-state'
import { useMergeRefs } from '@spark-ui/use-merge-refs'
import { cx } from 'class-variance-authority'
import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  Fragment,
  Ref,
  SyntheticEvent,
  useEffect,
} from 'react'

import { Popover } from '../popover'
import { VisuallyHidden } from '../visually-hidden'
import { useComboboxContext } from './ComboboxContext'

type InputPrimitiveProps = ComponentPropsWithoutRef<'input'>

interface InputProps extends Omit<InputPrimitiveProps, 'value' | 'placeholder'> {
  className?: string
  placeholder?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  ref?: Ref<HTMLInputElement>
}

export const Input = ({
  'aria-label': ariaLabel,
  className,
  placeholder,
  value,
  defaultValue,
  onValueChange,
  ref: forwardedRef,
  ...props
}: InputProps) => {
  const ctx = useComboboxContext()
  const [inputValue] = useCombinedState(value, defaultValue)

  useEffect(() => {
    if (inputValue != null) {
      ctx.setInputValue(inputValue)
    }
  }, [inputValue])

  useEffect(() => {
    if (onValueChange) {
      ctx.setOnInputValueChange(() => onValueChange)
    }

    // Sync input with combobox default value
    if (!ctx.multiple && ctx.selectedItem) {
      ctx.setInputValue(ctx.selectedItem.text)
    }
  }, [])

  const [PopoverTrigger, popoverTriggerProps] = ctx.hasPopover
    ? [Popover.Trigger, { asChild: true, type: undefined }]
    : [Fragment, {}]

  const multiselectInputProps = ctx.getDropdownProps()
  const inputRef = useMergeRefs(forwardedRef, ctx.innerInputRef, multiselectInputProps.ref)
  const downshiftInputProps = ctx.getInputProps({
    disabled: ctx.disabled || ctx.readOnly,
    ...multiselectInputProps,
    onKeyDown: event => {
      multiselectInputProps.onKeyDown?.(event)
      ctx.setLastInteractionType('keyboard')
      ctx.setIsTyping(true)
    },
    /**
     *
     * Important:
     * - without this, the input cursor is moved to the end after every change.
     * @see https://github.com/downshift-js/downshift/issues/1108#issuecomment-674180157
     */
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      ctx.setInputValue(e.target.value)
    },
    ref: inputRef,
  })

  const hasPlaceholder = ctx.multiple ? ctx.selectedItems.length === 0 : ctx.selectedItem === null

  function mergeHandlers<T extends SyntheticEvent>(
    handlerA?: (event: T) => void,
    handlerB?: (event: T) => void
  ) {
    return (event: T) => {
      handlerA?.(event)
      handlerB?.(event)
    }
  }

  /**
   * Downshift has its own callbacks set for a few events types.
   * We must merge the event handlers with the (optional) forwarded props if consumer wish to use the same events for alernate purposes (ex: tracking)
   */
  const mergedEventProps = {
    onBlur: mergeHandlers(props.onBlur, downshiftInputProps.onBlur),
    onChange: mergeHandlers(props.onChange, downshiftInputProps.onChange),
    onClick: mergeHandlers(props.onClick, downshiftInputProps.onClick),
    onKeyDown: mergeHandlers(props.onKeyDown, downshiftInputProps.onKeyDown),
  }

  return (
    <>
      {ariaLabel && (
        <VisuallyHidden>
          <label {...ctx.getLabelProps()}>{ariaLabel}</label>
        </VisuallyHidden>
      )}
      <PopoverTrigger {...popoverTriggerProps}>
        <input
          data-spark-component="combobox-input"
          type="text"
          {...(hasPlaceholder && { placeholder })}
          className={cx(
            'max-w-full shrink-0 grow basis-[80px]',
            'h-sz-28 bg-surface px-sm text-body-1 text-ellipsis outline-hidden',
            'disabled:text-on-surface/dim-3 disabled:cursor-not-allowed disabled:bg-transparent',
            'read-only:text-on-surface read-only:cursor-default read-only:bg-transparent',
            className
          )}
          {...props}
          {...downshiftInputProps}
          {...mergedEventProps}
          value={ctx.inputValue}
          aria-label={ariaLabel}
          disabled={ctx.disabled}
          readOnly={ctx.readOnly}
        />
      </PopoverTrigger>
    </>
  )
}

Input.displayName = 'Combobox.Input'
