import { cx } from 'class-variance-authority'

import { InputIcon, InputIconProps } from './InputIcon'

export type InputTrailingIconProps = InputIconProps

export const InputTrailingIcon = ({ className, ...others }: InputTrailingIconProps) => (
  <InputIcon className={cx(className, 'right-lg text-body-1')} {...others} />
)

InputTrailingIcon.id = 'TrailingIcon'
InputTrailingIcon.displayName = 'InputGroup.TrailingIcon'
