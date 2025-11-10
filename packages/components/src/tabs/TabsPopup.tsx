import { type ReactElement, type ReactNode, useEffect, useRef, useState } from 'react'

import { Tabs } from './index'

export interface TabDataWithPopup {
  value: string
  label: ReactNode
  content?: ReactNode
  popupContent?: ReactNode
}

export interface TabsPopupProps {
  tabs: TabDataWithPopup[]
  defaultValue?: string
  className?: string
  /**
   * Instructions text for keyboard navigation
   */
  keyboardInstructionsId?: string
  /**
   * Show keyboard instructions
   */
  showKeyboardInstructions?: boolean
}

export const TabsPopup = ({
  tabs,
  defaultValue,
  className,
  keyboardInstructionsId = 'tabs-keyboard-instructions',
  showKeyboardInstructions = false,
}: TabsPopupProps): ReactElement => {
  const [activeTab, setActiveTab] = useState(defaultValue || tabs[0]?.value || '')
  const [openPopup, setOpenPopup] = useState<string | null>(null)
  const [hasUsedKeyboard, setHasUsedKeyboard] = useState(false)

  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  useEffect(() => {
    if (hasUsedKeyboard) {
      const activeElement = tabRefs.current[activeTab]
      if (activeElement) {
        activeElement.focus()
      }
    }
  }, [activeTab, hasUsedKeyboard])

  const handleTabKeyDown = (e: React.KeyboardEvent, tabValue: string) => {
    setHasUsedKeyboard(true)

    const currentIndex = tabs.findIndex(tab => tab.value === tabValue)

    switch (e.key) {
      case 'ArrowLeft': {
        e.preventDefault()
        const prevIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1
        const prevTab = tabs[prevIndex]
        if (prevTab) {
          setActiveTab(prevTab.value)
        }
        break
      }
      case 'ArrowRight': {
        e.preventDefault()
        const nextIndex = currentIndex === tabs.length - 1 ? 0 : currentIndex + 1
        const nextTab = tabs[nextIndex]
        if (nextTab) {
          setActiveTab(nextTab.value)
        }
        break
      }
      case 'Home': {
        e.preventDefault()
        const firstTab = tabs[0]
        if (firstTab) {
          setActiveTab(firstTab.value)
        }
        break
      }
      case 'End': {
        e.preventDefault()
        const lastTab = tabs[tabs.length - 1]
        if (lastTab) {
          setActiveTab(lastTab.value)
        }
        break
      }
      case 'F10': {
        if (e.shiftKey) {
          e.preventDefault()
          setOpenPopup(tabValue)
        }
        break
      }
    }
  }

  const handleTabClick = (tabValue: string) => {
    setHasUsedKeyboard(false)
    setActiveTab(tabValue)
  }

  const handlePopupOpenChange = (tabValue: string) => (open: boolean) => {
    setOpenPopup(open ? tabValue : null)
  }

  return (
    <div className={`relative w-full ${className || ''}`}>
      {showKeyboardInstructions && (
        <p
          id={keyboardInstructionsId}
          className={`mb-md text-left text-sm ${!hasUsedKeyboard ? 'sr-only' : ''}`}
        >
          Appuyez sur Shift+F10 sur un onglet pour plus d'informations.
        </p>
      )}

      <div className="mb-md relative">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <Tabs.List
            aria-describedby={showKeyboardInstructions ? keyboardInstructionsId : undefined}
          >
            {tabs.map(tab => (
              <Tabs.Trigger
                key={tab.value}
                value={tab.value}
                ref={el => {
                  tabRefs.current[tab.value] = el
                }}
                onClick={() => handleTabClick(tab.value)}
                onKeyDown={e => handleTabKeyDown(e, tab.value)}
                aria-haspopup={tab.popupContent ? 'true' : undefined}
              >
                {tab.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {tabs.map(tab => (
            <Tabs.Content key={tab.value} value={tab.value}>
              {tab.content}
            </Tabs.Content>
          ))}
        </Tabs>

        {/* Positioned absolutely over the tabs - SIBLING of Tabs, not child */}
        <div className="pointer-events-none absolute top-6 right-0 flex w-full">
          {tabs.map(tab => {
            if (!tab.popupContent) return null

            const isActive = activeTab === tab.value

            return (
              <Tabs.Popup
                key={tab.value}
                tabValue={tab.value}
                isTabActive={isActive}
                open={openPopup === tab.value}
                onOpenChange={handlePopupOpenChange(tab.value)}
                className="pointer-events-auto"
              >
                {tab.popupContent}
              </Tabs.Popup>
            )
          })}
        </div>
      </div>
    </div>
  )
}

TabsPopup.displayName = 'TabsPopup'
