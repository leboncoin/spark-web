import { cva, cx } from 'class-variance-authority'
import { type HTMLAttributes, type ReactNode, Ref } from 'react'
import { useSnapshot } from 'valtio'

import { useAutoSuggest } from './AutoSuggest'

export interface ItemProps extends HTMLAttributes<HTMLLIElement> {
  disabled?: boolean
  value: string
  children: ReactNode
  className?: string
  ref?: Ref<HTMLLIElement>
}

export const Item = ({ children, ref: forwardedRef, ...props }: ItemProps) => {
  // const { value, disabled } = props

  return (
    // <AutoSuggestItemProvider value={value} disabled={disabled}>
    <ItemContent ref={forwardedRef} {...props}>
      {children}
    </ItemContent>
    // </AutoSuggestItemProvider>
  )
}

const styles = cva('px-lg py-md text-body-1', {
  variants: {
    selected: {
      true: 'font-bold',
    },
    disabled: {
      true: 'opacity-dim-3 cursor-not-allowed',
      false: 'cursor-pointer',
    },
    highlighted: {
      true: 'bg-overlay/dim-4 rounded-md',
    },
  },
})

const ItemContent = ({
  className,
  disabled = false,
  value,
  children,
  ref: forwardedRef,
}: ItemProps) => {
  const { state, actions } = useAutoSuggest()
  const snap = useSnapshot(state)

  const isSelected = snap.getValueText(snap.value) === snap.getValueText(value)
  const isHighlighted = snap.getValueText(snap.highlightedOption) === snap.getValueText(value)

  return (
    <li
      id={`${snap.id}-item-${value}`}
      ref={forwardedRef}
      aria-selected={isSelected}
      // aria-labelledby={itemCtx.textId} // TODO if ItemText is used
      className={cx(
        styles({
          selected: isSelected,
          disabled,
          highlighted: isHighlighted,
          className,
        })
      )}
      key={value}
      onClick={() => {
        actions.selectOption(value)
        actions.closeMenu()
        actions.focusInput()
      }}
      onMouseMove={() => {
        if (!isHighlighted) {
          actions.highlightOption(value)
        }
      }}
      onMouseLeave={() => {
        actions.unsetHighlightedOption()
      }}
    >
      {children}
    </li>
  )
}

Item.displayName = 'AutoSuggest.Item'
