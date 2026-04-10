import { Ref } from 'react'

import { Button, ButtonProps } from '../button'
import { iconButtonStyles } from './IconButton.styles'

export interface IconButtonProps extends Omit<ButtonProps, 'loadingText'> {
  'aria-label': string
  ref?: Ref<HTMLButtonElement>
}

/**
 * A button component that contains only an icon without text label.
 */
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
      data-spark-component="icon-button"
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
