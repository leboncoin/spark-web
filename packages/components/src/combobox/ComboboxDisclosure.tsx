import { ArrowHorizontalDown } from '@spark-ui/icons/ArrowHorizontalDown'
import { useMergeRefs } from '@spark-ui/use-merge-refs'
import { cx } from 'class-variance-authority'
import { ComponentProps, Ref } from 'react'

import { Icon } from '../icon'
import { IconButton } from '../icon-button'
import { useComboboxContext } from './ComboboxContext'

interface DisclosureProps extends Omit<ComponentProps<typeof IconButton>, 'aria-label'> {
  className?: string
  closedLabel: string
  openedLabel: string
  ref?: Ref<HTMLButtonElement>
}

export const Disclosure = ({
  className,
  closedLabel,
  openedLabel,
  intent = 'neutral',
  design = 'ghost',
  size = 'sm',
  ref: forwardedRef,
  ...props
}: DisclosureProps) => {
  const ctx = useComboboxContext()

  const { ref: downshiftRef, ...downshiftDisclosureProps } = ctx.getToggleButtonProps({
    disabled: ctx.disabled || ctx.readOnly,
    onClick: event => {
      event.stopPropagation()
    },
  })
  const isExpanded = downshiftDisclosureProps['aria-expanded']
  const ref = useMergeRefs(forwardedRef, downshiftRef)

  return (
    <IconButton
      ref={ref}
      className={cx(className, 'mt-[calc((44px-32px)/2)]')}
      intent={intent}
      design={design}
      size={size}
      {...downshiftDisclosureProps}
      {...props}
      aria-label={isExpanded ? openedLabel : closedLabel}
      disabled={ctx.disabled}
    >
      <Icon
        className={cx('shrink-0', 'rotate-0 transition duration-100 ease-in', {
          'rotate-180': isExpanded,
        })}
        size="sm"
      >
        <ArrowHorizontalDown />
      </Icon>
    </IconButton>
  )
}

Disclosure.displayName = 'Combobox.Disclosure'
