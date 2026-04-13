import { cx } from 'class-variance-authority'

import { InputIcon, InputIconProps } from './InputIcon'

export type InputLeadingIconProps = InputIconProps

/** An icon displayed before the input text. Renders a <div> element. */
export const InputLeadingIcon = ({ className, ...others }: InputLeadingIconProps) => (
  <InputIcon className={cx(className, 'left-lg text-body-1')} {...others} />
)

InputLeadingIcon.id = 'LeadingIcon'
InputLeadingIcon.displayName = 'InputGroup.LeadingIcon'
