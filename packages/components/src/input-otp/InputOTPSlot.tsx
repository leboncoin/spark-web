import { ComponentPropsWithoutRef } from 'react'

import { inputOTPSlotStyles } from './InputOTP.styles'
import { useInputOTPContext } from './InputOTPContext'

export interface InputOTPSlotProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Index of the slot (0-based).
   * If not provided, will be automatically assigned based on position in children.
   */
  index?: number
}

export const InputOTPSlot = ({ index: indexProp, className, ...props }: InputOTPSlotProps) => {
  const context = useInputOTPContext()

  // Use provided index or fallback to 0 (should not happen if auto-assignment works)
  const index = indexProp ?? 0
  const slot = context.slots[index]

  if (!slot) {
    return null
  }

  const { char, isActive, hasFakeCaret } = slot
  const isEmpty = !char
  const isPlaceholder = isEmpty && !hasFakeCaret && context.placeholder

  const isFocusTarget = index === context.activeIndex

  return (
    <div
      className={inputOTPSlotStyles({
        intent: context.intent,
        className,
      })}
      data-active={isActive}
      data-disabled={context.disabled}
      data-readonly={context.readOnly}
      data-filled={!isEmpty}
      data-focus-target={isFocusTarget}
      data-valid={context.intent !== 'error'}
      {...props}
    >
      <span className={isPlaceholder ? 'text-on-surface/dim-3' : ''}>
        {context.type === 'password' && char
          ? '•'
          : char || (!hasFakeCaret && context.placeholder ? context.placeholder : '')}
      </span>
      {hasFakeCaret && (
        <span
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <span className="bg-on-surface animate-standalone-caret-blink h-sz-24 w-sz-2" />
        </span>
      )}
    </div>
  )
}

InputOTPSlot.displayName = 'InputOTP.Slot'
