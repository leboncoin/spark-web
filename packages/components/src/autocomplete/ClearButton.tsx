import { DeleteOutline } from '@spark-ui/icons/DeleteOutline'
import { cx } from 'class-variance-authority'
import { ComponentPropsWithoutRef, MouseEventHandler, Ref } from 'react'

import { Icon } from '../icon'
import { useAutoComplete } from './Root'

export interface ClearButtonProps extends ComponentPropsWithoutRef<'button'> {
  'aria-label': string
  ref?: Ref<HTMLButtonElement>
}

export const ClearButton = ({ className, onClick, ref, ...others }: ClearButtonProps) => {
  const { actions } = useAutoComplete()

  const handleClick: MouseEventHandler<HTMLButtonElement> = event => {
    event.stopPropagation()

    actions.clear()
    // todo: FOCUS INPUT WITH REF

    if (onClick) {
      onClick(event)
    }
  }

  return (
    <button
      type="button"
      ref={ref}
      className={cx(className, 'h-sz-44 text-neutral hover:text-neutral-hovered')}
      tabIndex={-1}
      onClick={handleClick}
      {...others}
    >
      <Icon size="sm">
        <DeleteOutline />
      </Icon>
    </button>
  )
}

ClearButton.displayName = 'AutoComplete.ClearButton'
