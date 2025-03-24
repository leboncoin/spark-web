import { HTMLAttributes, Ref } from 'react'

import { styles, type StylesProps } from './BadgeItem.styles'

export interface BadgeItemProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, 'aria-label'>,
    StylesProps {
  /**
   * Numeric value used as indicator inside the component.
   */
  count?: number
  /**
   * Maximum numeric value to be dispayed as a count value.
   * @default 99
   */
  overflowCount?: number
  /**
   * A custom label for accessibility purposes. It can also be defined as a builder function
   * to handle dynamic inner data to create a custom label.
   */
  'aria-label'?:
    | string
    | (({ count, overflowCount }: { count?: number; overflowCount?: number }) => string)
  /**
   * Describes the way the component is displayed: relative to another element or just standalone.
   * @default 'relative'
   */
  type?: 'relative' | 'standalone'
  ref?: Ref<HTMLSpanElement>
}

export const BadgeItem = ({
  intent = 'danger',
  size = 'md',
  type = 'relative',
  count,
  overflowCount = 99,
  'aria-label': label,
  className,
  ...others
}: BadgeItemProps) => {
  const hasOverflow = count && count > overflowCount
  const ariaLabel = typeof label === 'function' ? label({ count, overflowCount }) : label
  const props = { ...others, 'aria-label': ariaLabel }

  return (
    <span
      data-spark-component="badge"
      role="status"
      className={styles({
        intent,
        size,
        type,
        className,
      })}
      {...props}
    >
      {hasOverflow ? `${overflowCount}+` : count}
    </span>
  )
}

BadgeItem.displayName = 'BadgeItem'
