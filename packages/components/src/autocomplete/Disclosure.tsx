import { ArrowHorizontalDown } from '@spark-ui/icons/ArrowHorizontalDown'
import { cx } from 'class-variance-authority'
import { ComponentProps, Ref } from 'react'
import { useSnapshot } from 'valtio'

import { Icon } from '../icon'
import { IconButton } from '../icon-button'
import { useAutoComplete } from './Root'

interface DisclosureProps extends Omit<ComponentProps<typeof IconButton>, 'aria-label'> {
  className?: string
  closedLabel: string
  openedLabel: string
  ref?: Ref<HTMLButtonElement>
}

export const Disclosure = ({
  className,
  closedLabel,
  openedLabel,
  intent = 'neutral',
  design = 'ghost',
  size = 'sm',
  ref: forwardedRef,
  ...props
}: DisclosureProps) => {
  const { state, actions } = useAutoComplete()
  const snap = useSnapshot(state)

  return (
    <IconButton
      ref={forwardedRef}
      className={cx(className, 'mt-[calc((44px-32px)/2)]')}
      intent={intent}
      design={design}
      size={size}
      {...props}
      onClick={e => {
        e.preventDefault()
        e.stopPropagation()
        actions.toggleMenu()
      }}
      aria-controls="TODO(id of the autocomplete menu)"
      aria-expanded={snap.isOpen}
      aria-label={snap.isOpen ? openedLabel : closedLabel}
      tabIndex={-1}
      disabled={snap.disabled || snap.readOnly}
    >
      <Icon
        className={cx('shrink-0', 'rotate-0 transition duration-100 ease-in', {
          'rotate-180': snap.isOpen,
        })}
        size="sm"
      >
        <ArrowHorizontalDown />
      </Icon>
    </IconButton>
  )
}

Disclosure.displayName = 'AutoComplete.Disclosure'
