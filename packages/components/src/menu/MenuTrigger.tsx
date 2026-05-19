import { Menu as BaseMenu } from '@base-ui/react/menu'
import { ArrowHorizontalDown } from '@spark-ui/icons/ArrowHorizontalDown'
import { cx } from 'class-variance-authority'
import {
  cloneElement,
  isValidElement,
  type ComponentProps,
  type ReactElement,
  type Ref,
} from 'react'

import { Icon } from '../icon'
import { useRenderSlot } from './useRenderSlot'

export interface MenuTriggerProps extends Omit<ComponentProps<typeof BaseMenu.Trigger>, 'render'> {
  /**
   * Change the component to the HTML tag or custom component of the only child.
   * This will merge the original component props with the props of the supplied element/component and change the underlying DOM node.
   * @default false
   */
  asChild?: boolean
  ref?: Ref<HTMLButtonElement>
}

/**
 * The button that toggles the menu.
 * Renders a <button> element by default, or uses asChild for custom elements.
 * When used with asChild and a Button component, automatically adds an ArrowHorizontalDown icon.
 * Button components should use design="outlined" and intent="support".
 */
export const MenuTrigger = ({
  asChild = false,
  children,
  className,
  ref,
  ...rest
}: MenuTriggerProps) => {
  const renderSlot = useRenderSlot(asChild)

  // When asChild is used with a Button, enhance it with the arrow icon
  const enhancedChildren =
    asChild && isValidElement(children)
      ? cloneElement(
          children as ReactElement,
          {
            design: (children.props as { design?: string }).design ?? 'outlined',
            intent: (children.props as { intent?: string }).intent ?? 'support',
            children: (
              <>
                {(children.props as { children: React.ReactNode }).children}
                <Icon size="sm" intent="current" className="shrink-0">
                  <ArrowHorizontalDown />
                </Icon>
              </>
            ),
          } as Partial<unknown>
        )
      : children

  return (
    <BaseMenu.Trigger
      ref={ref}
      data-spark-component="menu-trigger"
      render={renderSlot}
      className={cx(
        'inline-flex items-center justify-center',
        'focus-visible:u-outline',
        className
      )}
      {...rest}
    >
      {enhancedChildren}
    </BaseMenu.Trigger>
  )
}

MenuTrigger.displayName = 'Menu.Trigger'
