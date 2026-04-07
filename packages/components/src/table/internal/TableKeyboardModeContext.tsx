import { createContext } from 'react'

export type TableKeyboardMode = 'grid' | 'interaction'

export const TableKeyboardModeContext = createContext<TableKeyboardMode>('grid')
