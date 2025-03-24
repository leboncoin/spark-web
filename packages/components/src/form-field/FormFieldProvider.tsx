import { ReactNode, useCallback, useId, useMemo, useState } from 'react'

import { FormFieldContext, FormFieldContextState, ID_PREFIX } from './FormFieldContext'

export interface FormFieldProviderProps
  extends Pick<
    FormFieldContextState,
    'id' | 'name' | 'disabled' | 'readOnly' | 'state' | 'isRequired'
  > {
  children: ReactNode
}

export const FormFieldProvider = ({
  id,
  name,
  disabled = false,
  readOnly = false,
  state,
  isRequired,
  children,
}: FormFieldProviderProps) => {
  const labelId = `${ID_PREFIX}-label-${useId()}`
  const [messageIds, setMessageIds] = useState<string[]>([])
  const description = messageIds.length > 0 ? messageIds.join(' ') : undefined

  const handleMessageIdAdd = useCallback((msgId: string) => {
    setMessageIds(ids => [...ids, msgId])
  }, [])

  const handleMessageIdRemove = useCallback((msgId: string) => {
    setMessageIds(ids => ids.filter(current => current !== msgId))
  }, [])

  const value = useMemo(() => {
    const isInvalid = state === 'error'

    return {
      id,
      labelId,
      name,
      disabled,
      readOnly,
      state,
      isRequired,
      isInvalid,
      description,
      onMessageIdAdd: handleMessageIdAdd,
      onMessageIdRemove: handleMessageIdRemove,
    }
  }, [
    id,
    labelId,
    name,
    disabled,
    readOnly,
    description,
    state,
    isRequired,
    handleMessageIdAdd,
    handleMessageIdRemove,
  ])

  return <FormFieldContext.Provider value={value}>{children}</FormFieldContext.Provider>
}

FormFieldProvider.displayName = 'FormFieldProvider'
