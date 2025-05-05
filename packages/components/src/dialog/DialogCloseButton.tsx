import { Close as CloseSVG } from '@spark-ui/icons/Close'
import { cx } from 'class-variance-authority'

import { Icon } from '../icon'
import { IconButton, type IconButtonProps } from '../icon-button'
import { Close, CloseProps } from './DialogClose'

export type CloseButtonProps = CloseProps &
  Pick<IconButtonProps, 'size' | 'intent' | 'design' | 'aria-label'>

const Root = ({
  'aria-label': ariaLabel,
  className,
  size = 'md',
  intent = 'neutral',
  design = 'ghost',
  children = <CloseSVG />,
  ref,
  ...rest
}: CloseButtonProps) => {
  return (
    <Close
      data-part="close"
      ref={ref}
      className={cx(['absolute', 'top-md', 'right-xl'], className)}
      asChild
      {...rest}
    >
      <IconButton intent={intent} size={size} design={design} aria-label={ariaLabel}>
        <Icon>{children}</Icon>
      </IconButton>
    </Close>
  )
}

export const CloseButton = Object.assign(Root, {
  id: 'CloseButton',
})

Root.displayName = 'Dialog.CloseButton'
