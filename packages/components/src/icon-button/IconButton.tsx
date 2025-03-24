import { Ref } from 'react'

import { Button, ButtonProps } from '../button'
import { iconButtonStyles } from './IconButton.styles'

export interface IconButtonProps extends Omit<ButtonProps, 'loadingText'> {
  'aria-label': string
  ref?: Ref<HTMLButtonElement>
}

export const IconButton = ({
  design = 'filled',
  disabled = false,
  intent = 'main',
  shape = 'rounded',
  size = 'md',
  className,
  ref,
  ...others
}: IconButtonProps) => {
  return (
    <Button
      ref={ref}
      className={iconButtonStyles({ size, className })}
      design={design}
      disabled={disabled}
      intent={intent}
      shape={shape}
      size={size}
      {...others}
    />
  )
}

IconButton.displayName = 'IconButton'
