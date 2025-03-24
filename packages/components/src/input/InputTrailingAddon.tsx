import { cx } from 'class-variance-authority'
import { Ref } from 'react'

import { InputAddon, InputAddonProps } from './InputAddon'
import { useInputGroup } from './InputGroupContext'

export type InputTrailingAddonProps = InputAddonProps & {
  ref?: Ref<HTMLDivElement>
}

const Root = ({ className, ref, ...others }: InputTrailingAddonProps) => {
  const { disabled, readOnly } = useInputGroup()
  const isInactive = disabled || readOnly

  return (
    <div className={cx('rounded-r-lg', isInactive ? 'bg-on-surface/dim-5' : null)}>
      <InputAddon
        ref={ref}
        className={cx(className, 'rounded-l-0! ml-[-1px] rounded-r-lg')}
        {...others}
      />
    </div>
  )
}

export const InputTrailingAddon = Object.assign(Root, {
  id: 'TrailingAddon',
})

Root.displayName = 'InputGroup.TrailingAddon'
