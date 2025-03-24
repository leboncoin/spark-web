import { useCombinedState } from '@spark-ui/use-combined-state'
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  ReactElement,
  SetStateAction,
  useContext,
  useEffect,
  useId,
  useState,
} from 'react'

import { useFormFieldControl } from '../form-field'
import { type ItemsMap, SelectItem } from './types'
import { getItemsFromChildren } from './utils'

export interface SelectContextState {
  itemsMap: ItemsMap
  disabled: boolean
  readOnly: boolean
  state?: 'error' | 'alert' | 'success'
  itemsComponent: ReactElement | undefined
  selectedItem: SelectItem | undefined
  setValue: (value: string) => void
  isControlled: boolean
  onValueChange?: (value: string) => void
  ariaLabel: string | undefined
  setAriaLabel: Dispatch<SetStateAction<string | undefined>>
  fieldId: string
  fieldLabelId: string | undefined
  name: string | undefined
  required: boolean
  placeholder: string | undefined
  setPlaceholder: Dispatch<SetStateAction<string | undefined>>
}

export type SelectContextProps = PropsWithChildren<{
  /**
   * Use `state` prop to assign a specific state to the select, choosing from: `error`, `alert` and `success`. By doing so, the outline styles will be updated.
   */
  state?: 'error' | 'alert' | 'success'
  /**
   * When true, prevents the user from interacting with the select.
   */
  disabled?: boolean
  /**
   * Sets the select as interactive or not.
   */
  readOnly?: boolean
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

  itemsComponent: ReactElement | undefined
  /**
   * This attribute is used to specify the name of the control.
   * If wrapped with a FormField with a name, will be inherited from it.
   */
  name?: string
  /**
   * A Boolean attribute indicating that an option with a non-empty string value must be selected.
   */
  required?: boolean
}>

const SelectContext = createContext<SelectContextState | null>(null)

const ID_PREFIX = ':select'

export const SelectProvider = ({
  children,
  defaultValue,
  value: valueProp,
  onValueChange,
  disabled: disabledProp = false,
  readOnly: readOnlyProp = false,
  state: stateProp,
  itemsComponent,
  name: nameProp,
  required: requiredProp,
}: SelectContextProps) => {
  const [value, setValue] = useCombinedState(valueProp, defaultValue, onValueChange)
  const [placeholder, setPlaceholder] = useState<string | undefined>(undefined)
  const [itemsMap, setItemsMap] = useState<ItemsMap>(getItemsFromChildren(itemsComponent))
  const [ariaLabel, setAriaLabel] = useState<string>()

  // Computed state
  const firstItem = itemsMap.entries().next().value[1]
  const selectedItem = typeof value === 'string' ? itemsMap.get(value) : firstItem
  const isControlled = valueProp != null

  // Derivated from FormField context
  const field = useFormFieldControl()
  const state = field.state || stateProp

  const internalFieldID = `${ID_PREFIX}-field-${useId()}`
  const fieldId = field.id || internalFieldID
  const fieldLabelId = field.labelId
  const disabled = field.disabled ?? disabledProp
  const readOnly = field.readOnly ?? readOnlyProp
  const name = field.name ?? nameProp
  const required = !!(field.isRequired ?? requiredProp)

  /**
   * Indices in a Map are set when an element is added to the Map.
   * If for some reason, in the Select:
   * - items order changes
   * - items are added
   * - items are removed
   *
   * The Map must be rebuilt from the new children in order to preserve logical indices.
   *
   */
  useEffect(() => {
    const newMap = getItemsFromChildren(itemsComponent)

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

  return (
    <SelectContext.Provider
      value={{
        disabled,
        readOnly,
        itemsMap,
        state,
        itemsComponent,
        selectedItem,
        setValue,
        isControlled,
        onValueChange,
        ariaLabel,
        setAriaLabel,
        fieldId,
        fieldLabelId,
        name,
        required,
        placeholder,
        setPlaceholder,
      }}
    >
      {children}
    </SelectContext.Provider>
  )
}

export const useSelectContext = () => {
  const context = useContext(SelectContext)

  if (!context) {
    throw Error('useSelectContext must be used within a Select provider')
  }

  return context
}
