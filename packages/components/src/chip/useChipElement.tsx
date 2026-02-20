import { useCombinedState } from '@spark-ui/hooks/use-combined-state'
import { emulateTab } from 'emulate-tab'
import {
  Children,
  FC,
  isValidElement,
  KeyboardEvent,
  MouseEvent,
  ReactElement,
  ReactNode,
} from 'react'

interface ReturnedValue {
  defaultTagName: 'button' | 'div'
  chipProps:
    | {
        type: 'button'
        'aria-pressed'?: boolean
        'data-state'?: 'on' | 'off'
        onClick: (event: MouseEvent<HTMLButtonElement>) => void
        onKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void
        disabled?: boolean
        children: ReactNode
      }
    | {
        'aria-disabled'?: boolean
        children: ReactNode
        onKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void
      }
  compoundElements: {
    leadingIcon: ReactNode
    trailingIcon: ReactNode
    content: ReactNode
    clearButton: ReactNode
  }
}

const getDisplayName = (element?: ReactElement) => {
  return element ? (element.type as FC).displayName : ''
}

const findElement =
  (children: ReactNode) =>
  (...values: string[]) => {
    const validChildren = Children.toArray(children).filter(isValidElement)

    return validChildren.find(child => {
      const displayName = getDisplayName(child)

      return values.includes(displayName || '')
    })
  }

export const useChipElement = ({
  onClick,
  render: _render,
  pressed,
  defaultPressed,
  disabled,
  value,
  defaultValue,
  children,
  onClear,
}: {
  onClick?: (
    event: MouseEvent<HTMLButtonElement>,
    args: { pressed: boolean; value?: string | number | readonly string[] }
  ) => void
  onKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void
  render?: React.ReactElement
  pressed?: boolean
  defaultPressed?: boolean
  value?: string | number | readonly string[]
  defaultValue?: string | number | readonly string[]
  disabled?: boolean
  children?: ReactNode
  onClear?: (event?: MouseEvent<HTMLButtonElement>) => void
}): ReturnedValue => {
  const [isPressed, setIsPressed] = useCombinedState<boolean | undefined>(pressed, defaultPressed)
  const [innerValue] = useCombinedState<string | number | readonly string[] | undefined>(
    value,
    defaultValue
  )

  const findChipElement = findElement(children)

  const leadingIcon = findChipElement('Chip.LeadingIcon')
  const trailingIcon = findChipElement('Chip.TrailingIcon')
  const content = findChipElement('Chip.Content')
  const clearButton = findChipElement('Chip.ClearButton')

  const isButton = (onClick || isPressed) !== undefined

  const formattedChildren = [leadingIcon, content, clearButton].every(
    element => element === undefined
  ) ? (
    <span className="inline-block grow truncate">{children}</span>
  ) : (
    <>
      {leadingIcon}
      {content}
      {leadingIcon === undefined ? trailingIcon : null}
      {clearButton}
    </>
  )

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>): void => {
    if (!!clearButton && !disabled && ['Delete', 'Backspace'].includes(event.key)) {
      if (onClear) {
        onClear()
        event.key === 'Delete' && emulateTab()
        event.key === 'Backspace' && emulateTab.backwards()
      }
    }
  }

  if (isButton) {
    return {
      defaultTagName: 'button',
      chipProps: {
        type: 'button',
        ...(isPressed !== undefined && {
          'aria-pressed': isPressed,
          'data-state': isPressed ? 'on' : 'off',
        }),
        onClick: (event: MouseEvent<HTMLButtonElement>): void => {
          isPressed !== undefined && setIsPressed(!isPressed)
          onClick && onClick(event, { pressed: isPressed as boolean, value: innerValue })
        },
        onKeyDown,
        disabled,
        children: formattedChildren,
      },
      compoundElements: {
        leadingIcon,
        trailingIcon,
        content,
        clearButton,
      },
    }
  }

  return {
    defaultTagName: 'div',
    chipProps: {
      'aria-disabled': disabled,
      children: formattedChildren,
      onKeyDown,
    },
    compoundElements: {
      leadingIcon,
      trailingIcon,
      content,
      clearButton,
    },
  }
}
