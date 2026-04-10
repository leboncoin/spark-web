import { PropsWithChildren, Ref } from 'react'

import { BadgeItem, BadgeItemProps } from './BadgeItem'

export type BadgeProps = PropsWithChildren<Omit<BadgeItemProps, 'type'>> & {
  ref?: Ref<HTMLElement>
}

/**
 * A visual indicator that displays a count or status, typically positioned on top of another element.
 */
export const Badge = ({ children, ...props }: BadgeProps) => {
  const isStandalone = !children

  return isStandalone ? (
    <BadgeItem type="standalone" {...props} />
  ) : (
    <div className="relative inline-flex">
      {children}
      <BadgeItem {...props} />
    </div>
  )
}

Badge.displayName = 'Badge'
