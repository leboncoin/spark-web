import { ReactElement } from 'react'

import { Popover as SparkPopover } from '../popover'

/**
 * A portal that renders the dropdown in a different part of the DOM. Renders a <div> element.
 */

export const Portal: typeof SparkPopover.Portal = ({ children, ...rest }): ReactElement => (
  <SparkPopover.Portal {...rest}>{children}</SparkPopover.Portal>
)

Portal.displayName = 'Dropdown.Portal'
