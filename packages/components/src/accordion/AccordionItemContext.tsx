import {
  createContext,
  Dispatch,
  type PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react'

interface AccordionItemContextState {
  value: string
  setValue: Dispatch<SetStateAction<string>>
  disabled: boolean
  setDisabled: Dispatch<SetStateAction<boolean>>
}

const AccordionItemContext = createContext<AccordionItemContextState | null>(null)

export const AccordionItemProvider = ({
  value: valueProp,
  disabled: disabledProp = false,
  children,
}: PropsWithChildren<{ value: string; disabled?: boolean }>) => {
  const [value, setValue] = useState<string>(valueProp)
  const [disabled, setDisabled] = useState<boolean>(disabledProp)

  return (
    <AccordionItemContext.Provider value={{ value, setValue, disabled, setDisabled }}>
      {children}
    </AccordionItemContext.Provider>
  )
}

export const useAccordionItemContext = () => {
  const context = useContext(AccordionItemContext)

  if (!context) {
    throw Error('useAccordionItemContext must be used within a AccordionItem provider')
  }

  return context
}
