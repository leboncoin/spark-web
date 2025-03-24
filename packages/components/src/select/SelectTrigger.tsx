import { ArrowHorizontalDown } from '@spark-ui/icons/ArrowHorizontalDown'
import { ReactNode, type Ref, useEffect } from 'react'

import { Icon } from '../icon'
import { useSelectContext } from './SelectContext'
import { styles } from './SelectTrigger.styles'

interface TriggerProps {
  'aria-label'?: string
  children: ReactNode
  className?: string
  ref?: Ref<HTMLDivElement>
}

/**
 * This trigger acts as a fake button for the `select` tag.
 * It is not interactive.
 */
export const Trigger = ({
  'aria-label': ariaLabel,
  children,
  className,
  ref: forwardedRef,
}: TriggerProps) => {
  const { disabled, readOnly, state, setAriaLabel, itemsComponent } = useSelectContext()

  useEffect(() => {
    if (ariaLabel) {
      setAriaLabel(ariaLabel)
    }
  }, [ariaLabel])

  return (
    <div
      data-spark-component="select-trigger"
      ref={forwardedRef}
      className={styles({ className, state, disabled, readOnly })}
    >
      <span className="gap-md flex items-center justify-start">{children}</span>

      <Icon className="ml-md shrink-0" size="sm">
        <ArrowHorizontalDown />
      </Icon>

      {itemsComponent}
    </div>
  )
}

Trigger.displayName = 'Select.Trigger'
