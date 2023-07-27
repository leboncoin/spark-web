import { Icon } from '@spark-ui/icon'
import { DeleteFill } from '@spark-ui/icons/dist/icons/DeleteFill'
import { Slot } from '@spark-ui/slot'
import React, { ComponentPropsWithoutRef, forwardRef } from 'react'

import {
  chipClearButtonStyles,
  type ChipClearButtonStylesProps,
  chipClearButtonWrapperStyles,
} from './ChipClearButton.styles'
import { useChipContext } from './useChipContext'

export interface ChipClearButtonProps
  extends ComponentPropsWithoutRef<'span'>,
    ChipClearButtonStylesProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  label: string
}

export const ChipClearButton = forwardRef<HTMLSpanElement, ChipClearButtonProps>(
  (
    {
      onClick,
      children = (
        <Icon className="opacity-dim-3">
          <DeleteFill />
        </Icon>
      ),
      tabIndex = 0,
      label,
    },
    forwardedRef
  ) => {
    const { design, disabled } = useChipContext()

    const onClearHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation()
      !disabled && onClick && onClick(event)
    }

    return (
      <span
        className={chipClearButtonWrapperStyles({
          isBordered: design === 'dashed',
          disabled: !!disabled,
        })}
        onClick={onClearHandler}
        ref={forwardedRef}
      >
        <button
          tabIndex={tabIndex}
          type="button"
          disabled={!!disabled}
          className={chipClearButtonStyles({ disabled })}
          aria-label={label}
        >
          <Slot aria-label={label}>{children}</Slot>
        </button>
      </span>
    )
  }
)

ChipClearButton.displayName = 'Chip.ClearButton'
