import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { useMergeRefs } from '@spark-ui/hooks/use-merge-refs'
import { Tabs as RadixTabs } from 'radix-ui'
import { type FocusEvent, type KeyboardEvent, type ReactNode, Ref, useRef } from 'react'

import { useTabsContext } from './TabsContext'
import { type ConfiguredPopoverComponent, Popover } from './TabsPopoverAbstraction'
import { triggerVariants } from './TabsTrigger.styles'

export interface TabsTriggerProps
  extends Omit<RadixTabs.TabsTriggerProps, 'asChild' | 'children'>,
    useRender.ComponentProps<'button'> {
  /**
   * A unique value that associates the trigger with a content.
   */
  value: string
  /**
   * When true, prevents the user from interacting with the tab.
   * @default false
   */
  disabled?: boolean
  /**
   * Function that receives a pre-configured Popover component and returns the popover structure.
   * @example
   * renderMenu={({ Popover }) => (
   *   <Popover>
   *     <Popover.Trigger aria-label="Options">
   *       <CustomIcon />
   *     </Popover.Trigger>
   *     <Popover.Content>
   *       <Button>Action</Button>
   *     </Popover.Content>
   *   </Popover>
   * )}
   */
  renderMenu?: (props: { Popover: ConfiguredPopoverComponent }) => ReactNode
  ref?: Ref<HTMLButtonElement>
}

export const TabsTrigger = ({
  value,
  disabled = false,
  children,
  render,
  className,
  ref,
  onKeyDown,
  renderMenu,
  ...rest
}: TabsTriggerProps) => {
  const { intent, size, orientation } = useTabsContext()
  const popoverTriggerRef = useRef<HTMLButtonElement>(null)
  const tabsTriggerRef = useRef<HTMLButtonElement>(null)

  const mergedRef = useMergeRefs(ref, tabsTriggerRef)

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'F10' && e.shiftKey && renderMenu && popoverTriggerRef.current) {
      e.preventDefault()
      popoverTriggerRef.current.click()
    }
    onKeyDown?.(e)
  }

  const hasMenu = !!renderMenu
  const popoverSide = orientation === 'vertical' ? 'right' : 'bottom'

  const defaultProps = {
    'data-spark-component': 'tabs-trigger',
    className: triggerVariants({
      intent,
      size,
      hasMenu,
      orientation: orientation ?? 'horizontal',
      className,
    }),
    disabled,
    value,
    onFocus: ({ target }: FocusEvent<HTMLButtonElement>) =>
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      }),
    onKeyDown: handleKeyDown,
    'aria-haspopup': hasMenu ? ('menu' as const) : undefined,
    ...rest,
    children,
  }

  const element = useRender({
    defaultTagName: 'button',
    render: (render ?? (() => null)) as useRender.RenderProp,
    ref: mergedRef,
    props: mergeProps<'button'>(defaultProps, {}),
  })

  if (render) {
    const trigger = (
      <RadixTabs.Trigger asChild value={value} disabled={disabled}>
        {element}
      </RadixTabs.Trigger>
    )
    if (!hasMenu) return trigger

    return (
      <div className={orientation === 'vertical' ? 'relative w-full' : 'relative'}>
        {trigger}
        <div className="right-md mr-md pointer-events-auto absolute top-1/2 -translate-y-1/2">
          <Popover popoverSide={popoverSide} popoverTriggerRef={popoverTriggerRef}>
            {PopoverAbstraction => renderMenu?.({ Popover: PopoverAbstraction })}
          </Popover>
        </div>
      </div>
    )
  }

  const trigger = (
    <RadixTabs.Trigger
      data-spark-component="tabs-trigger"
      ref={mergedRef}
      className={triggerVariants({
        intent,
        size,
        hasMenu,
        orientation: orientation ?? 'horizontal',
        className,
      })}
      asChild={false}
      disabled={disabled}
      value={value}
      onFocus={({ target }: FocusEvent<HTMLButtonElement>) =>
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest',
        })
      }
      onKeyDown={handleKeyDown}
      aria-haspopup={hasMenu ? 'true' : undefined}
      {...rest}
    >
      {children}
    </RadixTabs.Trigger>
  )

  if (!hasMenu) {
    return trigger
  }

  return (
    <div className={orientation === 'vertical' ? 'relative w-full' : 'relative'}>
      {trigger}
      <div className="right-md mr-md pointer-events-auto absolute top-1/2 -translate-y-1/2">
        <Popover popoverSide={popoverSide} popoverTriggerRef={popoverTriggerRef}>
          {PopoverAbstraction => renderMenu?.({ Popover: PopoverAbstraction })}
        </Popover>
      </div>
    </div>
  )
}

TabsTrigger.displayName = 'Tabs.Trigger'
