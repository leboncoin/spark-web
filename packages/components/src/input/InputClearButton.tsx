import { DeleteOutline } from '@spark-ui/icons/DeleteOutline'
import { cx } from 'class-variance-authority'
import { ComponentPropsWithoutRef, MouseEventHandler, Ref } from 'react'

import { Icon } from '../icon'
import { useInputGroup } from './InputGroupContext'

export interface InputClearButtonProps extends ComponentPropsWithoutRef<'button'> {
  'aria-label': string
  ref?: Ref<HTMLButtonElement>
}

const Root = ({ className, tabIndex = -1, onClick, ref, ...others }: InputClearButtonProps) => {
  const { onClear, hasTrailingIcon } = useInputGroup()

  const handleClick: MouseEventHandler<HTMLButtonElement> = event => {
    if (onClick) {
      onClick(event)
    }

    if (onClear) {
      onClear()
    }
  }

  return (
    <button
      ref={ref}
      className={cx(
        className,
        'pointer-events-auto absolute top-1/2 -translate-y-1/2',
        'inline-flex h-full items-center justify-center outline-hidden',
        'text-neutral hover:text-neutral-hovered',
        hasTrailingIcon ? 'right-3xl px-sz-12' : 'pl-md pr-lg right-0'
      )}
      tabIndex={tabIndex}
      onClick={handleClick}
      type="button"
      {...others}
    >
      <Icon size="sm">
        <DeleteOutline />
      </Icon>
    </button>
  )
}

export const InputClearButton = Object.assign(Root, {
  id: 'ClearButton',
})

Root.displayName = 'InputGroup.ClearButton'
