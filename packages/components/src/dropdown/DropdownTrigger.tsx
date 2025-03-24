import { ArrowHorizontalDown } from '@spark-ui/icons/ArrowHorizontalDown'
import { useMergeRefs } from '@spark-ui/use-merge-refs'
import { cx } from 'class-variance-authority'
import { Fragment, ReactNode, Ref } from 'react'

import { Icon } from '../icon'
import { Popover } from '../popover'
import { VisuallyHidden } from '../visually-hidden'
import { useDropdownContext } from './DropdownContext'
import { styles } from './DropdownTrigger.styles'

interface TriggerProps {
  'aria-label'?: string
  children: ReactNode
  className?: string
  ref?: Ref<HTMLButtonElement>
}

export const Trigger = ({
  'aria-label': ariaLabel,
  children,
  className,
  ref: forwardedRef,
}: TriggerProps) => {
  const {
    getToggleButtonProps,
    getDropdownProps,
    getLabelProps,
    hasPopover,
    disabled,
    readOnly,
    state,
    setLastInteractionType,
  } = useDropdownContext()

  const [WrapperComponent, wrapperProps] = hasPopover
    ? [Popover.Trigger, { asChild: true }]
    : [Fragment, {}]

  const { ref: downshiftRef, ...downshiftTriggerProps } = getToggleButtonProps({
    ...getDropdownProps(),
    onKeyDown: () => {
      setLastInteractionType('keyboard')
    },
  })

  const isExpanded = downshiftTriggerProps['aria-expanded']

  const ref = useMergeRefs(forwardedRef, downshiftRef)

  return (
    <>
      {ariaLabel && (
        <VisuallyHidden>
          <label {...getLabelProps()}>{ariaLabel}</label>
        </VisuallyHidden>
      )}
      <WrapperComponent {...wrapperProps}>
        <button
          type="button"
          ref={ref}
          disabled={disabled || readOnly}
          className={styles({ className, state, disabled, readOnly })}
          {...downshiftTriggerProps}
          data-spark-component="dropdown-trigger"
        >
          <span className="gap-md flex items-center justify-start">{children}</span>

          <Icon
            className={cx('ml-md shrink-0 rotate-0 transition duration-100 ease-in', {
              'rotate-180': isExpanded,
            })}
            size="sm"
          >
            <ArrowHorizontalDown />
          </Icon>
        </button>
      </WrapperComponent>
    </>
  )
}

Trigger.displayName = 'Dropdown.Trigger'
