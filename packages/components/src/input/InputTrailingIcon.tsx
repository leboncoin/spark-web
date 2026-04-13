import { cx } from 'class-variance-authority'

import { InputIcon, InputIconProps } from './InputIcon'

export type InputTrailingIconProps = InputIconProps

/** An icon displayed after the input text. Renders a <div> element. */
export const InputTrailingIcon = ({ className, ...others }: InputTrailingIconProps) => (
  <InputIcon className={cx(className, 'right-lg text-body-1')} {...others} />
)

InputTrailingIcon.id = 'TrailingIcon'
InputTrailingIcon.displayName = 'InputGroup.TrailingIcon'
