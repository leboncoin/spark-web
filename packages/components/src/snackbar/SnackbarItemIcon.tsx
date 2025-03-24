import { cx } from 'class-variance-authority'
import type { ReactElement } from 'react'

import { Icon, type IconProps } from '../icon'

export type SnackbarItemIconProps = IconProps

export const SnackbarItemIcon = ({
  children,
  className,
  ...rest
}: SnackbarItemIconProps): ReactElement => (
  <Icon
    size="md"
    className={cx('mx-md', className)}
    style={{ gridArea: 'icon', ...rest.style }}
    {...rest}
  >
    {children}
  </Icon>
)

SnackbarItemIcon.displayName = 'Snackbar.ItemIcon'
