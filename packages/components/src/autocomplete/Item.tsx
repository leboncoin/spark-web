import { cva, cx } from 'class-variance-authority'
import { type HTMLAttributes, type ReactNode, Ref } from 'react'
import { useSnapshot } from 'valtio'

import { ItemContext } from './ItemContext'
import { useAutoComplete } from './Root'

export interface ItemProps extends HTMLAttributes<HTMLLIElement> {
  disabled?: boolean
  value: string
  children: ReactNode
  className?: string
  ref?: Ref<HTMLLIElement>
}

export const Item = ({ children, ref: forwardedRef, ...props }: ItemProps) => {
  const { value, disabled } = props

  return (
    <ItemContext value={value} disabled={disabled}>
      <ItemContent ref={forwardedRef} {...props}>
        {children}
      </ItemContent>
    </ItemContext>
  )
}

const styles = cva('default:flex default:gap-md default:items-center px-lg py-md text-body-1', {
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
  const { state, actions } = useAutoComplete()
  const snap = useSnapshot(state)

  const isSelected = snap.value === value
  const isHighlighted = snap.highlightedOption === value

  const id = `${snap.id}-item-${value}`

  return (
    <li
      id={id}
      key={id}
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

Item.displayName = 'AutoComplete.Item'
