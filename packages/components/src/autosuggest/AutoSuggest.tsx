import { createContext, Fragment, useContext, useEffect, useRef } from 'react'
import { useSnapshot } from 'valtio'
import { subscribeKey } from 'valtio/utils'

import { Popover } from '../popover'
import { createStore, StoreInitialState } from './store'
import { getItemsFromChildren, hasChildComponent } from './utils'

type AutoSuggestContextType = ReturnType<typeof createStore>

const AutoSuggestContext = createContext<AutoSuggestContextType | null>(null)

export const useAutoSuggest = () => {
  const context = useContext(AutoSuggestContext)
  if (!context) {
    throw new Error('useAutoSuggest must be used within a AutoSuggestProvider')
  }

  return context
}

export interface AutoSuggestProps extends StoreInitialState {
  children: React.ReactNode
  filtering?: 'auto' | 'none'
  disabled?: boolean
  readOnly?: boolean
  state?: 'idle' | 'error' | 'alert' | 'success'
}

export const AutoSuggest = ({
  children,
  filtering = 'auto',
  disabled = false,
  readOnly = false,
  state = 'idle',
  onValueChange,
  value,
  ...props
}: AutoSuggestProps) => {
  const hasPopover = hasChildComponent(children, 'AutoSuggest.Popover')

  const triggerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const initialState = {
    ...props,
    hasPopover,
    options: getItemsFromChildren(children),
    filtering,
    disabled,
    readOnly,
    state,
    value,
    // callbacks
    onValueChange,
  }

  const refs = {
    triggerRef,
    menuRef,
    inputRef,
  }

  const store = useRef(createStore(initialState, refs)).current

  const { state: storeState, actions } = store
  const snap = useSnapshot(storeState)

  useEffect(() => {
    storeState.value = value
  }, [actions, value])

  useEffect(() => {
    actions.setOptions(getItemsFromChildren(children))
  }, [actions, children])

  useEffect(() => {
    const unsubscribe = subscribeKey(storeState, 'isOpen', value => {
      console.log('isOpen changed:', value)

      /**
       * This timeout is necessary to ensure that the onOpenChange callback is called after a few side-effects have been executed:
       * - update of the internal display value for the input.
       * - focus forward for the input.
       * - update of the isTyping state.
       */
      setTimeout(() => {
        storeState.onOpenChange?.(value)
      }, 0)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const WrapperComponent = hasPopover ? Popover : Fragment
  const wrapperProps = hasPopover ? { open: true } : {}

  return (
    <div className="gap-md grid grid-cols-2">
      <pre className="text-small">{JSON.stringify(snap, null, 2)}</pre>
      <AutoSuggestContext.Provider value={store}>
        <WrapperComponent {...wrapperProps}>{children}</WrapperComponent>
      </AutoSuggestContext.Provider>
    </div>
  )
}

AutoSuggest.displayName = 'AutoSuggest'
