import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { Close as CloseSVG } from '@spark-ui/icons/Close'
import { cx } from 'class-variance-authority'
import { Popover as RadixPopover } from 'radix-ui'
import { Ref } from 'react'

import { Icon } from '../icon'
import { IconButton } from '../icon-button'

export type CloseButtonProps = Omit<RadixPopover.PopoverCloseProps, 'asChild' | 'children'> &
  useRender.ComponentProps<'button'> & {
    'aria-label': string
    ref?: Ref<HTMLButtonElement>
  }

export const CloseButton = ({
  'aria-label': ariaLabel,
  render,
  className,
  ref,
  ...rest
}: CloseButtonProps) => {
  const defaultContent = (
    <IconButton size="sm" intent="neutral" design="ghost" aria-label={ariaLabel}>
      <Icon>
        <CloseSVG />
      </Icon>
    </IconButton>
  )

  const defaultProps = {
    'data-spark-component': 'popover-close-button',
    className: cx('right-lg top-md absolute', className),
    'aria-label': ariaLabel,
    ...rest,
    children: defaultContent,
  }

  const element = useRender({
    defaultTagName: 'button',
    render: (render ?? (() => null)) as useRender.RenderProp,
    ref,
    props: mergeProps<'button'>(defaultProps, {}),
  })

  if (render) {
    return (
      <RadixPopover.Close asChild ref={ref}>
        {element}
      </RadixPopover.Close>
    )
  }

  return (
    <RadixPopover.Close
      data-spark-component="popover-close-button"
      ref={ref}
      className={cx('right-lg top-md absolute', className)}
      asChild
      {...rest}
    >
      <IconButton size="sm" intent="neutral" design="ghost" aria-label={ariaLabel}>
        <Icon>
          <CloseSVG />
        </Icon>
      </IconButton>
    </RadixPopover.Close>
  )
}

CloseButton.displayName = 'Popover.CloseButton'
