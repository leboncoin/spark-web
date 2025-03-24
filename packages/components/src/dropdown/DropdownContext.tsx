import {
  createContext,
  Dispatch,
  Fragment,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useId,
  useState,
} from 'react'

import { useFormFieldControl } from '../form-field'
import { Popover } from '../popover'
import { type DownshiftState, type DropdownItem, type ItemsMap } from './types'
import { useDropdown } from './useDropdown'
import { getElementByIndex, getItemsFromChildren, hasChildComponent } from './utils'

export interface DropdownContextState extends DownshiftState {
  itemsMap: ItemsMap
  highlightedItem: DropdownItem | undefined
  hasPopover: boolean
  setHasPopover: Dispatch<SetStateAction<boolean>>
  multiple: boolean
  disabled: boolean
  readOnly: boolean
  state?: 'error' | 'alert' | 'success'
  lastInteractionType: 'mouse' | 'keyboard'
  setLastInteractionType: (type: 'mouse' | 'keyboard') => void
}

export type DropdownContextCommonProps = PropsWithChildren<{
  /**
   * The controlled open state of the select. Must be used in conjunction with `onOpenChange`.
   */
  open?: boolean
  /**
   * Event handler called when the open state of the select changes.
   */
  onOpenChange?: (isOpen: boolean) => void
  /**
   * The open state of the select when it is initially rendered. Use when you do not need to control its open state.
   */
  defaultOpen?: boolean
  /**
   * Use `state` prop to assign a specific state to the dropdown, choosing from: `error`, `alert` and `success`. By doing so, the outline styles will be updated.
   */
  state?: 'error' | 'alert' | 'success'
  /**
   * When true, prevents the user from interacting with the dropdown.
   */
  disabled?: boolean
  /**
   * Sets the dropdown as interactive or not.
   */
  readOnly?: boolean
}>

interface DropdownPropsSingle {
  /**
   * Prop 'multiple' indicating whether multiple values are allowed.
   */
  multiple?: false
  /**
   * The value of the select when initially rendered. Use when you do not need to control the state of the select.
   */
  defaultValue?: string
  /**
   * The controlled value of the select. Should be used in conjunction with `onValueChange`.
   */
  value?: string
  /**
   * Event handler called when the value changes.
   */
  onValueChange?: (value: string) => void
}

interface DropdownPropsMultiple {
  /**
   * Prop 'multiple' indicating whether multiple values are allowed.
   */
  multiple: true
  /**
   * The value of the select when initially rendered. Use when you do not need to control the state of the select.
   */
  defaultValue?: string[]
  /**
   * The controlled value of the select. Should be used in conjunction with `onValueChange`.
   */
  value?: string[]
  /**
   * Event handler called when the value changes.
   */
  onValueChange?: (value: string[]) => void
}

export type DropdownContextProps = DropdownContextCommonProps &
  (DropdownPropsSingle | DropdownPropsMultiple)

const DropdownContext = createContext<DropdownContextState | null>(null)

export const ID_PREFIX = ':dropdown'

export const DropdownProvider = ({
  children,
  defaultValue,
  value,
  onValueChange,
  open,
  onOpenChange,
  defaultOpen,
  multiple = false,
  disabled: disabledProp = false,
  readOnly: readOnlyProp = false,
  state: stateProp,
}: DropdownContextProps) => {
  const [itemsMap, setItemsMap] = useState<ItemsMap>(getItemsFromChildren(children))
  const [hasPopover, setHasPopover] = useState<boolean>(
    hasChildComponent(children, 'Dropdown.Popover')
  )
  const [lastInteractionType, setLastInteractionType] = useState<'mouse' | 'keyboard'>('mouse')

  const field = useFormFieldControl()

  const state = field.state || stateProp

  const internalFieldLabelID = `${ID_PREFIX}-label-${useId()}`
  const internalFieldID = `${ID_PREFIX}-input-${useId()}`
  const id = field.id || internalFieldID
  const labelId = field.labelId || internalFieldLabelID

  const disabled = field.disabled ?? disabledProp
  const readOnly = field.readOnly ?? readOnlyProp

  const dropdownState = useDropdown({
    itemsMap,
    defaultValue,
    value,
    onValueChange,
    open,
    onOpenChange,
    defaultOpen,
    multiple,
    id,
    labelId,
  })

  /**
   * Indices in a Map are set when an element is added to the Map.
   * If for some reason, in the Dropdown:
   * - items order changes
   * - items are added
   * - items are removed
   *
   * The Map must be rebuilt from the new children in order to preserve logical indices.
   *
   * Downshift is heavily indices based for keyboard navigation, so it it important.
   */
  useEffect(() => {
    const newMap = getItemsFromChildren(children)

    const previousItems = [...itemsMap.values()]
    const newItems = [...newMap.values()]

    const hasItemsChanges =
      previousItems.length !== newItems.length ||
      previousItems.some((item, index) => {
        const hasUpdatedValue = item.value !== newItems[index]?.value
        const hasUpdatedText = item.text !== newItems[index]?.text

        return hasUpdatedValue || hasUpdatedText
      })

    if (hasItemsChanges) {
      setItemsMap(newMap)
    }
  }, [children])

  /**
   * Warning:
   * Downshift is expecting the items list to always be rendered, as per a11y guidelines.
   * This is why the `Popover` is always opened in this component, but visually hidden instead from Dropdown.Popover.
   */
  const [WrapperComponent, wrapperProps] = hasPopover ? [Popover, { open: true }] : [Fragment, {}]

  return (
    <DropdownContext.Provider
      value={{
        multiple,
        disabled,
        readOnly,
        ...dropdownState,
        itemsMap,
        highlightedItem: getElementByIndex(itemsMap, dropdownState.highlightedIndex),
        hasPopover,
        setHasPopover,
        state,
        lastInteractionType,
        setLastInteractionType,
      }}
    >
      <WrapperComponent {...wrapperProps}>{children}</WrapperComponent>
    </DropdownContext.Provider>
  )
}

export const useDropdownContext = () => {
  const context = useContext(DropdownContext)

  if (!context) {
    throw Error('useDropdownContext must be used within a Dropdown provider')
  }

  return context
}
