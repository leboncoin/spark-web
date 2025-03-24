import { cx } from 'class-variance-authority'
import { Ref } from 'react'

import { InputAddon, InputAddonProps } from './InputAddon'
import { useInputGroup } from './InputGroupContext'

export type InputLeadingAddonProps = InputAddonProps & {
  ref?: Ref<HTMLDivElement>
}

const Root = ({ className, ref, ...others }: InputLeadingAddonProps) => {
  const { disabled, readOnly } = useInputGroup()
  const isInactive = disabled || readOnly

  return (
    <div className={cx('rounded-l-lg', isInactive ? 'bg-on-surface/dim-5' : null)}>
      <InputAddon
        ref={ref}
        className={cx(className, 'rounded-r-0! mr-[-1px] rounded-l-lg')}
        {...others}
      />
    </div>
  )
}

export const InputLeadingAddon = Object.assign(Root, {
  id: 'LeadingAddon',
})

Root.displayName = 'InputGroup.LeadingAddon'
