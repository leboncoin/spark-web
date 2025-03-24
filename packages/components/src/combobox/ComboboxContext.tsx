/* eslint-disable complexity */
/* eslint-disable max-lines-per-function */
import { useCombinedState } from '@spark-ui/use-combined-state'
import { useCombobox, useMultipleSelection } from 'downshift'
import {
  createContext,
  Dispatch,
  Fragment,
  PropsWithChildren,
  RefObject,
  SetStateAction,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'

import { useFormFieldControl } from '../form-field'
import { Popover } from '../popover'
import { type ComboboxItem, type DownshiftState, type ItemsMap } from './types'
import { multipleSelectionReducer } from './useCombobox/multipleSelectionReducer'
import { singleSelectionReducer } from './useCombobox/singleSelectionReducer'
import { getElementByIndex, getItemsFromChildren, hasChildComponent } from './utils'

export interface ComboboxContextState extends DownshiftState {
  itemsMap: ItemsMap
  filteredItemsMap: ItemsMap
  highlightedItem: ComboboxItem | undefined
  hasPopover: boolean
  multiple: boolean
  disabled: boolean
  readOnly: boolean
  wrap?: boolean
  state?: 'error' | 'alert' | 'success'
  lastInteractionType: 'mouse' | 'keyboard'
  setHasPopover: Dispatch<SetStateAction<boolean>>
  setLastInteractionType: (type: 'mouse' | 'keyboard') => void
  setOnInputValueChange: Dispatch<SetStateAction<((v: string) => void) | null>>
  innerInputRef: RefObject<HTMLInputElement | null>
  triggerAreaRef: RefObject<HTMLDivElement | null>
  isLoading?: boolean
  isTyping?: boolean
  setIsTyping: Dispatch<SetStateAction<boolean>>
}

export type ComboboxContextCommonProps = PropsWithChildren<{
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
   * Use `state` prop to assign a specific state to the combobox, choosing from: `error`, `alert` and `success`. By doing so, the outline styles will be updated.
   */
  state?: 'error' | 'alert' | 'success'
  /**
   * When true, prevents the user from interacting with the combobox.
   */
  disabled?: boolean
  /**
   * Sets the combobox as interactive or not.
   */
  readOnly?: boolean
  /**
   * When true, the items will be filtered depending on the value of the input (not case-sensitive).
   */
  filtering?: 'none' | 'auto' | 'strict'
  /**
   * By default, the combobox will clear or restore the input value to the selected item value on blur.
   */
  allowCustomValue?: boolean
  /**
   * In multiple selection, many selected items might be displayed. Be default, the combobox trigger will expand vertically to display them all.
   * If you wish to keep every item on a single line, disabled this property.
   */
  wrap?: boolean
  /**
   * Display a spinner to indicate to the user that the combobox is loading results for .
   */
  isLoading?: boolean
}>

interface ComboboxPropsSingle {
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
  value?: string | null
  /**
   * Event handler called when the value changes.
   */
  onValueChange?: (value: string) => void
}

interface ComboboxPropsMultiple {
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

export type ComboboxContextProps = ComboboxContextCommonProps &
  (ComboboxPropsSingle | ComboboxPropsMultiple)

const ComboboxContext = createContext<ComboboxContextState | null>(null)

const getFilteredItemsMap = (map: ItemsMap, inputValue: string | undefined): ItemsMap => {
  if (!inputValue) return map

  return new Map(
    Array.from(map).filter(([_, { text }]) => text.toLowerCase().includes(inputValue.toLowerCase()))
  )
}

export const ID_PREFIX = ':combobox'

export const ComboboxProvider = ({
  children,
  state: stateProp,
  allowCustomValue = false,
  filtering = 'auto',
  disabled: disabledProp = false,
  multiple = false,
  readOnly: readOnlyProp = false,
  wrap = true,
  // Value
  value: controlledValue,
  defaultValue,
  onValueChange,
  // Open
  open: controlledOpen,
  defaultOpen,
  onOpenChange,
  isLoading,
}: ComboboxContextProps) => {
  const isMounted = useRef(false)

  // Input state
  const [inputValue, setInputValue] = useState<string | undefined>('')
  const [isTyping, setIsTyping] = useState<boolean>(filtering === 'strict')
  const triggerAreaRef = useRef<HTMLDivElement>(null)
  const innerInputRef = useRef<HTMLInputElement>(null)
  const [onInputValueChange, setOnInputValueChange] = useState<((v: string) => void) | null>(null)

  const [comboboxValue] = useCombinedState(controlledValue, defaultValue)

  const shouldFilterItems = filtering === 'strict' || (filtering === 'auto' && isTyping)

  // Items state
  const [itemsMap, setItemsMap] = useState<ItemsMap>(getItemsFromChildren(children))
  const [filteredItemsMap, setFilteredItems] = useState(
    shouldFilterItems ? getFilteredItemsMap(itemsMap, inputValue) : itemsMap
  )

  const [selectedItem, setSelectedItem] = useState<ComboboxItem | null>(
    itemsMap.get(comboboxValue as string) || null
  )

  const [selectedItems, setSelectedItems] = useState<ComboboxItem[]>(
    comboboxValue
      ? [...itemsMap.values()].filter(item => (comboboxValue as string[]).includes(item.value))
      : []
  )

  const onInternalSelectedItemChange = (item: ComboboxItem | null) => {
    setIsTyping(false)

    if (item?.value !== selectedItem?.value) {
      setSelectedItem(item)
      setTimeout(() => {
        onValueChange?.(item?.value as string & string[])
      }, 0)
    }
  }

  const onInternalSelectedItemsChange = (items: ComboboxItem[]) => {
    setSelectedItems(items)
    setTimeout(() => {
      onValueChange?.(items.map(i => i.value) as string & string[])
    }, 0)
  }

  // Sync internal state with controlled value
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true

      return
    }

    if (multiple) {
      const newSelectedItems = (comboboxValue as string[]).reduce(
        (accum: ComboboxItem[], value) => {
          const match = itemsMap.get(value)

          return match ? [...accum, match] : accum
        },
        []
      )

      setSelectedItems(comboboxValue ? newSelectedItems : [])
    } else {
      setSelectedItem(itemsMap.get(comboboxValue as string) || null)
    }
  }, [multiple ? JSON.stringify(comboboxValue) : comboboxValue])

  // Form field state
  const field = useFormFieldControl()

  const internalFieldLabelID = `${ID_PREFIX}-label-${useId()}`
  const internalFieldID = `${ID_PREFIX}-field-${useId()}`
  const id = field.id || internalFieldID
  const labelId = field.labelId || internalFieldLabelID

  const state = field.state || stateProp
  const disabled = field.disabled ?? disabledProp
  const readOnly = field.readOnly ?? readOnlyProp

  const [hasPopover, setHasPopover] = useState<boolean>(
    hasChildComponent(children, 'Combobox.Popover')
  )
  const [lastInteractionType, setLastInteractionType] = useState<'mouse' | 'keyboard'>('mouse')

  useEffect(() => {
    setFilteredItems(shouldFilterItems ? getFilteredItemsMap(itemsMap, inputValue) : itemsMap)
  }, [inputValue, itemsMap])

  const multiselect = useMultipleSelection<ComboboxItem>({
    selectedItems,
    stateReducer: (state, { type, changes }) => {
      const types = useMultipleSelection.stateChangeTypes

      // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
      switch (type) {
        case types.SelectedItemKeyDownBackspace:
        case types.SelectedItemKeyDownDelete: {
          onInternalSelectedItemsChange(changes.selectedItems || [])

          let activeIndex

          if (type === types.SelectedItemKeyDownDelete) {
            const isLastItem = state?.activeIndex === changes.selectedItems?.length
            activeIndex = isLastItem ? -1 : state.activeIndex
          } else {
            const hasItemBefore = (changes?.activeIndex || 0) - 1 >= 0
            activeIndex = hasItemBefore ? state.activeIndex - 1 : changes?.activeIndex
          }

          return {
            ...changes,
            activeIndex,
          }
        }
        case types.SelectedItemClick:
          if (innerInputRef.current) {
            innerInputRef.current.focus()
          }

          return {
            ...changes,
            activeIndex: -1, // the focus will remain on the input
          }
        case types.FunctionRemoveSelectedItem:
          return {
            ...changes,
            activeIndex: -1, // the focus will remain on the input
          }
        case types.DropdownKeyDownNavigationPrevious:
          downshift.closeMenu()

          return changes
        default:
          return changes
      }
    },
  })

  const filteredItems = Array.from(filteredItemsMap.values())

  useEffect(() => {
    onInputValueChange?.(inputValue || '')
  }, [inputValue])

  /**
   * - props: https://github.com/downshift-js/downshift/tree/master/src/hooks/useCombobox#basic-props
   * - state (for state reducer): https://github.com/downshift-js/downshift/tree/master/src/hooks/useCombobox#statechangetypes
   * - output: https://github.com/downshift-js/downshift/tree/master/src/hooks/useCombobox#returned-props
   */
  const downshift = useCombobox<ComboboxItem>({
    inputId: id,
    items: filteredItems,
    selectedItem: multiple ? undefined : selectedItem,
    id,
    labelId,
    // Input
    inputValue,
    onInputValueChange: ({ inputValue: newInputValue }) => {
      setInputValue(newInputValue)

      if (shouldFilterItems) {
        const filtered = getFilteredItemsMap(itemsMap, newInputValue || '')
        setFilteredItems(filtered)
      }
    },
    // Open
    initialIsOpen: defaultOpen,
    ...(controlledOpen != null && { isOpen: controlledOpen }),
    onIsOpenChange: changes => {
      if (changes.isOpen != null) {
        onOpenChange?.(changes.isOpen)
      }
    },
    // Custom Spark item object parsing
    itemToString: item => {
      return (item as ComboboxItem)?.text
    },
    isItemDisabled: item => {
      const isFilteredOut =
        !!inputValue &&
        !filteredItems.some(filteredItem => {
          return item.value === filteredItem.value
        })

      return item.disabled || isFilteredOut
    },
    // Main reducer
    stateReducer: multiple
      ? multipleSelectionReducer({
          multiselect,
          selectedItems,
          allowCustomValue,
          setSelectedItems: onInternalSelectedItemsChange,
          triggerAreaRef,
          items: itemsMap,
        })
      : singleSelectionReducer({
          allowCustomValue,
          setSelectedItem: onInternalSelectedItemChange,
          filteredItems: [...filteredItemsMap.values()],
        }),
    /**
     * Downshift default behaviour is to scroll into view the highlighted item when the dropdown opens. This behaviour is not stable and scrolls the dropdown to the bottom of the screen.
     */
    scrollIntoView: node => {
      if (node) {
        node.scrollIntoView({ block: 'nearest' })
      }

      return undefined
    },
  })

  /**
   * Indices in a Map are set when an element is added to the Map.
   * If for some reason, in the Combobox:
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
   * This is why the `Popover` is always opened in this component, but visually hidden instead from Combobox.Popover.
   */
  const [WrapperComponent, wrapperProps] = hasPopover ? [Popover, { open: true }] : [Fragment, {}]

  return (
    <ComboboxContext.Provider
      value={{
        // Data
        itemsMap,
        filteredItemsMap,
        highlightedItem: getElementByIndex(filteredItemsMap, downshift.highlightedIndex),
        // State
        multiple,
        disabled,
        readOnly,
        hasPopover,
        setHasPopover,
        state,
        lastInteractionType,
        setLastInteractionType,
        wrap,
        // Refs
        innerInputRef,
        triggerAreaRef,
        // Downshift state
        ...downshift,
        ...multiselect,
        setInputValue,
        selectItem: onInternalSelectedItemChange,
        setSelectedItems: onInternalSelectedItemsChange,
        isLoading,
        setOnInputValueChange,
        isTyping,
        setIsTyping,
      }}
    >
      <WrapperComponent {...wrapperProps}>{children}</WrapperComponent>
    </ComboboxContext.Provider>
  )
}

export const useComboboxContext = () => {
  const context = useContext(ComboboxContext)

  if (!context) {
    throw Error('useComboboxContext must be used within a Combobox provider')
  }

  return context
}
