import { Close as CloseSVG } from '@spark-ui/icons/Close'
import { cx } from 'class-variance-authority'

import { Icon } from '../icon'
import { IconButton, type IconButtonProps } from '../icon-button'
import { DrawerClose, type DrawerCloseProps } from './DrawerClose'

export type DrawerCloseButtonProps = DrawerCloseProps &
  Pick<IconButtonProps, 'size' | 'intent' | 'design' | 'aria-label'>

export const DrawerCloseButton = ({
  'aria-label': ariaLabel,
  className,
  size = 'md',
  intent = 'neutral',
  design = 'ghost',
  children = <CloseSVG />,
  ref,
  ...rest
}: DrawerCloseButtonProps) => (
  <DrawerClose
    ref={ref}
    className={cx(['absolute', 'top-sm', 'right-xl'], className)}
    asChild
    {...rest}
  >
    <IconButton intent={intent} size={size} design={design} aria-label={ariaLabel}>
      <Icon>{children}</Icon>
    </IconButton>
  </DrawerClose>
)

DrawerCloseButton.displayName = 'Drawer.CloseButton'
