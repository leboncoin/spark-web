import { cx } from 'class-variance-authority'

import { Icon, type IconProps } from '../icon'
import { useInputGroup } from './InputGroupContext'

export type InputIconProps = IconProps

export const InputIcon = ({ className, intent, children, ...others }: InputIconProps) => {
  const { disabled, readOnly } = useInputGroup()
  const isInactive = disabled || readOnly

  return (
    <Icon
      intent={intent}
      className={cx(
        className,
        'pointer-events-none absolute top-[calc(var(--spacing-sz-44)/2)] -translate-y-1/2',
        intent ? undefined : 'text-neutral peer-focus:text-outline-high',
        isInactive ? 'opacity-dim-3' : undefined
      )}
      {...others}
    >
      {children}
    </Icon>
  )
}

InputIcon.displayName = 'InputGroup.Icon'
