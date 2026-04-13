import { cx } from 'class-variance-authority'
import { Ref } from 'react'

import { ChipIcon, type ChipIconProps } from './ChipIcon'

export type ChipTrailingIconProps = ChipIconProps & {
  ref?: Ref<HTMLSpanElement>
}

/**
 * An icon displayed at the end of the chip. Renders a <span> element.
 */
export const ChipTrailingIcon = ({
  className,
  ref: forwardedRef,
  ...props
}: ChipTrailingIconProps) => (
  <ChipIcon className={cx('ml-md', className)} ref={forwardedRef} {...props} />
)

ChipTrailingIcon.displayName = 'Chip.TrailingIcon'
