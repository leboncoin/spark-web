import { ReactElement } from 'react'

import { Popover as SparkPopover } from '../popover'

export const Portal: typeof SparkPopover.Portal = ({ children, ...rest }): ReactElement => (
  <SparkPopover.Portal {...rest}>{children}</SparkPopover.Portal>
)

Portal.displayName = 'Combobox.Portal'
