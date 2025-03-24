import * as collapsible from '@zag-js/collapsible'
import { mergeProps, normalizeProps, type PropTypes, useMachine } from '@zag-js/react'
import { type ComponentProps, createContext, Ref, useContext, useId } from 'react'

import { Slot } from '../slot'

export interface CollapsibleProps extends ComponentProps<'div'> {
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
  asChild?: boolean
  /**
   * The open state of the collapsible when it is initially rendered. Use when you do not need to control its open state.
   */
  defaultOpen?: boolean
  /**
   * When `true`, prevents the user from interacting with the collapsible.
   */
  disabled?: boolean
  /**
   * Event handler called when the open state of the collapsible changes.
   */
  onOpenChange?: (open: boolean) => void
  /**
   * The controlled open state of the collapsible. Must be used in conjunction with `onOpenChange`.
   */
  open?: boolean
  /**
   * The ids of the elements in the collapsible. Useful for composition
   */
  ids?: collapsible.Props['ids']
  ref?: Ref<HTMLDivElement>
}

const CollapsibleContext = createContext<collapsible.Api<PropTypes> | null>(null)

export const Collapsible = ({
  asChild = false,
  children,
  defaultOpen = false,
  disabled = false,
  onOpenChange,
  open,
  ids,
  ref,
  ...props
}: CollapsibleProps) => {
  const service = useMachine(collapsible.machine, {
    open,
    defaultOpen,
    disabled,
    id: useId(),
    ids,
    onOpenChange(details) {
      onOpenChange?.(details.open)
    },
  })
  const api = collapsible.connect(service, normalizeProps)
  const Component = asChild ? Slot : 'div'

  const mergedProps = mergeProps(api.getRootProps(), props)

  return (
    <CollapsibleContext.Provider value={api}>
      <Component data-spark-component="collapsible" ref={ref} {...mergedProps}>
        {children}
      </Component>
    </CollapsibleContext.Provider>
  )
}

Collapsible.displayName = 'Collapsible'

export const useCollapsibleContext = () => {
  const context = useContext(CollapsibleContext)

  if (!context) {
    throw Error('useCollapsibleContext must be used within a Collapsible provider')
  }

  return context
}
