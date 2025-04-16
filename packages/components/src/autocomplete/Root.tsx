import { createContext, Fragment, useContext, useEffect, useRef } from 'react'
import { subscribeKey } from 'valtio/utils'

import { Popover } from '../popover'
import { createStore, StoreInitialState } from './store'
import { getItemsFromChildren, hasChildComponent } from './utils'

type AutoCompleteContextType = ReturnType<typeof createStore>

const AutoCompleteContext = createContext<AutoCompleteContextType | null>(null)

export const useAutoComplete = () => {
  const context = useContext(AutoCompleteContext)
  if (!context) {
    throw new Error('useAutoComplete must be used within a AutoCompleteProvider')
  }

  return context
}

export interface AutoCompleteProps extends StoreInitialState {
  children: React.ReactNode
  filtering?: 'auto' | 'none'
  disabled?: boolean
  readOnly?: boolean
  state?: 'idle' | 'error' | 'alert' | 'success'
  open?: boolean
  onValueChange?: (value: string | null) => void
  onOpenChange?: (isOpen: boolean) => void
  defaultValue?: string
}

export const AutoComplete = ({
  children,
  filtering = 'auto',
  disabled = false,
  readOnly = false,
  state = 'idle',
  open,
  onValueChange,
  onOpenChange,
  value,
  defaultValue,
  autoHighlight = 'match',
  selectOnBlur = true,
  ...props
}: AutoCompleteProps) => {
  const hasPopover = hasChildComponent(children, 'AutoComplete.Popover')

  const triggerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const initialState = {
    ...props,
    autoHighlight,
    selectOnBlur,
    hasPopover,
    options: getItemsFromChildren(children),
    filtering,
    disabled,
    readOnly,
    state,
    value: value ?? defaultValue,
  }

  const refs = {
    triggerRef,
    menuRef,
    inputRef,
  }

  const store = useRef(createStore(initialState, refs)).current

  const { state: storeState, actions } = store

  // Sync controlled props
  useEffect(() => {
    // Only sync value if it's provided (controlled mode)
    if (value != null) {
      storeState.value = value
    }

    // Only sync open if it's provided (controlled mode)
    if (open != null) {
      if (open) {
        actions.openMenu()
      } else {
        actions.closeMenu()
      }
    }
  }, [value, open, children, storeState, actions])

  // Sync other props
  useEffect(() => {
    storeState.autoHighlight = autoHighlight
    storeState.selectOnBlur = selectOnBlur
    actions.setOptions(getItemsFromChildren(children))
  }, [autoHighlight, selectOnBlur, children, actions, storeState])

  useEffect(() => {
    const unsubscribe = subscribeKey(storeState, 'isOpen', value => {
      /**
       * This timeout is necessary to ensure that the onOpenChange callback is called after a few side-effects have been executed:
       * - update of the internal display value for the input.
       * - focus forward for the input.
       * - update of the isTyping state.
       */
      setTimeout(() => {
        onOpenChange?.(value)
      }, 0)
    })

    return () => {
      unsubscribe()
    }
  }, [onOpenChange, storeState])

  useEffect(() => {
    let previousValue = storeState.value

    const unsubscribe = subscribeKey(storeState, 'value', value => {
      if (value !== previousValue) {
        previousValue = value
        setTimeout(() => {
          onValueChange?.(value)
        }, 0)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [onValueChange, storeState])

  const WrapperComponent = hasPopover ? Popover : Fragment
  const wrapperProps = hasPopover ? { open: true } : {}

  return (
    // <div className="gap-md grid grid-cols-2">
    //   <pre className="text-small">{JSON.stringify(storeState, null, 2)}</pre>
    <AutoCompleteContext.Provider value={store}>
      <WrapperComponent {...wrapperProps}>{children}</WrapperComponent>
    </AutoCompleteContext.Provider>
    // </div>
  )
}

AutoComplete.displayName = 'AutoComplete'
