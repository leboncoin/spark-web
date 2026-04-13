import { cx } from 'class-variance-authority'
import { Ref } from 'react'

import { useDropdownGroupContext } from './DropdownItemsGroupContext'

interface LabelProps {
  children: string
  className?: string
  ref?: Ref<HTMLDivElement>
}

/**
 * A label for a group of dropdown items. Renders a <div> element.
 */

export const Label = ({ children, className, ref: forwardedRef }: LabelProps) => {
  const { labelId } = useDropdownGroupContext()

  return (
    <div
      ref={forwardedRef}
      id={labelId}
      className={cx('px-md py-sm text-body-2 text-neutral italic', className)}
    >
      {children}
    </div>
  )
}

Label.displayName = 'Dropdown.Label'
