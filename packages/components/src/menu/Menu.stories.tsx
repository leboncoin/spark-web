import type { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'

import { Menu } from '.'
import { Button } from '../button'
import { Dialog } from '../dialog'
import { MenuCheckboxItem } from './MenuCheckboxItem'
import { MenuGroup } from './MenuGroup'
import { MenuGroupLabel } from './MenuGroupLabel'
import { MenuItem } from './MenuItem'
import { MenuLinkItem } from './MenuLinkItem'
import { MenuPopup } from './MenuPopup'
import { MenuPortal } from './MenuPortal'
import { MenuPositioner } from './MenuPositioner'
import { MenuRadioGroup } from './MenuRadioGroup'
import { MenuRadioItem } from './MenuRadioItem'
import { MenuSeparator } from './MenuSeparator'
import { MenuSubmenu } from './MenuSubmenu'
import { MenuSubmenuTrigger } from './MenuSubmenuTrigger'
import { MenuTrigger } from './MenuTrigger'

const meta: Meta<typeof Menu> = {
  title: 'Experimental/Menu',
  component: Menu,
  subcomponents: {
    'Menu.Trigger': MenuTrigger,
    'Menu.Portal': MenuPortal,
    'Menu.Positioner': MenuPositioner,
    'Menu.Popup': MenuPopup,
    'Menu.Item': MenuItem,
    'Menu.LinkItem': MenuLinkItem,
    'Menu.Submenu': MenuSubmenu,
    'Menu.SubmenuTrigger': MenuSubmenuTrigger,
    'Menu.Group': MenuGroup,
    'Menu.GroupLabel': MenuGroupLabel,
    'Menu.RadioGroup': MenuRadioGroup,
    'Menu.RadioItem': MenuRadioItem,
    'Menu.CheckboxItem': MenuCheckboxItem,
    'Menu.Separator': MenuSeparator,
  } as Record<string, React.ComponentType<unknown>>,
}

export default meta

export const Default: StoryFn = _args => {
  return (
    <Menu>
      <Menu.Trigger asChild>
        <Button>Open menu</Button>
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner>
          <Menu.Popup>
            <Menu.Item onClick={() => console.log('New File')}>New File</Menu.Item>
            <Menu.Item onClick={() => console.log('New Window')}>New Window</Menu.Item>
            <Menu.Item onClick={() => console.log('Open File')}>Open File...</Menu.Item>
            <Menu.Separator />
            <Menu.Item onClick={() => console.log('Save')}>Save</Menu.Item>
            <Menu.Item onClick={() => console.log('Save As')}>Save As...</Menu.Item>
            <Menu.Separator />
            <Menu.Item disabled onClick={() => console.log('Export')}>
              Export
            </Menu.Item>
            <Menu.Item onClick={() => console.log('Exit')}>Exit</Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu>
  )
}

export const CheckboxItems: StoryFn = _args => {
  const [showBookmarks, setShowBookmarks] = useState(true)
  const [showFullURLs, setShowFullURLs] = useState(false)
  const [showToolbar, setShowToolbar] = useState(true)

  return (
    <Menu>
      <Menu.Trigger asChild>
        <Button>View</Button>
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner>
          <Menu.Popup>
            <Menu.CheckboxItem checked={showBookmarks} onCheckedChange={setShowBookmarks}>
              Show Bookmarks
            </Menu.CheckboxItem>
            <Menu.CheckboxItem checked={showFullURLs} onCheckedChange={setShowFullURLs}>
              Show Full URLs
            </Menu.CheckboxItem>
            <Menu.CheckboxItem checked={showToolbar} onCheckedChange={setShowToolbar}>
              Show Toolbar
            </Menu.CheckboxItem>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu>
  )
}

export const CloseOnClick: StoryFn = _args => {
  return (
    <Menu>
      <Menu.Trigger asChild>
        <Button>Actions (Menu closes after click)</Button>
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner>
          <Menu.Popup>
            <Menu.Item closeOnClick={false} onClick={() => console.log('Copy')}>
              Copy
            </Menu.Item>
            <Menu.Item closeOnClick={false} onClick={() => console.log('Cut')}>
              Cut
            </Menu.Item>
            <Menu.Item closeOnClick={false} onClick={() => console.log('Paste')}>
              Paste
            </Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu>
  )
}

export const Controlled: StoryFn = _args => {
  const [open, setOpen] = useState(false)

  return (
    <div className="gap-md flex flex-col items-start">
      <div className="text-body-2">Menu is {open ? 'open' : 'closed'}</div>
      <Menu open={open} onOpenChange={setOpen}>
        <Menu.Trigger asChild>
          <Button>Controlled menu</Button>
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner>
            <Menu.Popup>
              <Menu.Item onClick={() => console.log('Item 1')}>Item 1</Menu.Item>
              <Menu.Item onClick={() => console.log('Item 2')}>Item 2</Menu.Item>
              <Menu.Item onClick={() => console.log('Item 3')}>Item 3</Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu>
    </div>
  )
}

export const ControlledModeMultipleTriggers: StoryFn = _args => {
  const [open, setOpen] = useState(false)

  return (
    <div className="gap-md flex items-center">
      <Menu open={open} onOpenChange={setOpen}>
        <Menu.Trigger asChild>
          <Button>Trigger 1</Button>
        </Menu.Trigger>
        <Menu.Trigger asChild>
          <Button design="outlined">Trigger 2</Button>
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner>
            <Menu.Popup>
              <Menu.Item onClick={() => console.log('Action 1')}>Action 1</Menu.Item>
              <Menu.Item onClick={() => console.log('Action 2')}>Action 2</Menu.Item>
              <Menu.Item onClick={() => console.log('Action 3')}>Action 3</Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu>
    </div>
  )
}

export const DetachedTriggers: StoryFn = _args => {
  return (
    <Menu>
      <div className="gap-md flex items-center">
        <Menu.Trigger asChild>
          <Button>Open</Button>
        </Menu.Trigger>
        <span className="text-body-2">Some content between triggers</span>
        <Menu.Portal>
          <Menu.Positioner>
            <Menu.Popup>
              <Menu.Item onClick={() => console.log('Item 1')}>Item 1</Menu.Item>
              <Menu.Item onClick={() => console.log('Item 2')}>Item 2</Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </div>
    </Menu>
  )
}

export const GroupLabels: StoryFn = _args => {
  const [sortBy, setSortBy] = useState('date')
  const [showMinimap, setShowMinimap] = useState(true)
  const [showSearch, setShowSearch] = useState(false)
  const [showSidebar, setShowSidebar] = useState(true)

  return (
    <Menu>
      <Menu.Trigger asChild>
        <Button>View Options</Button>
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner>
          <Menu.Popup>
            <Menu.Group>
              <Menu.GroupLabel>Sort</Menu.GroupLabel>
              <Menu.RadioGroup value={sortBy} onValueChange={setSortBy}>
                <Menu.RadioItem value="date">Date</Menu.RadioItem>
                <Menu.RadioItem value="name">Name</Menu.RadioItem>
                <Menu.RadioItem value="type">Type</Menu.RadioItem>
              </Menu.RadioGroup>
            </Menu.Group>
            <Menu.Separator />
            <Menu.Group>
              <Menu.GroupLabel>Workspace</Menu.GroupLabel>
              <Menu.CheckboxItem checked={showMinimap} onCheckedChange={setShowMinimap}>
                Minimap
              </Menu.CheckboxItem>
              <Menu.CheckboxItem checked={showSearch} onCheckedChange={setShowSearch}>
                Search
              </Menu.CheckboxItem>
              <Menu.CheckboxItem checked={showSidebar} onCheckedChange={setShowSidebar}>
                Sidebar
              </Menu.CheckboxItem>
            </Menu.Group>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu>
  )
}

export const MultipleTriggers: StoryFn = _args => {
  return (
    <div className="gap-md flex items-center">
      <Menu>
        <Menu.Trigger asChild>
          <Button>Button 1</Button>
        </Menu.Trigger>
        <Menu.Trigger asChild>
          <Button design="outlined">Button 2</Button>
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner>
            <Menu.Popup>
              <Menu.Item onClick={() => console.log('Item 1')}>Item 1</Menu.Item>
              <Menu.Item onClick={() => console.log('Item 2')}>Item 2</Menu.Item>
              <Menu.Item onClick={() => console.log('Item 3')}>Item 3</Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu>
    </div>
  )
}

export const NavigateToAnotherPage: StoryFn = _args => {
  return (
    <Menu>
      <Menu.Trigger asChild>
        <Button>Go to</Button>
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner>
          <Menu.Popup>
            <Menu.LinkItem href="https://spark.adevinta.com">Spark Design System</Menu.LinkItem>
            <Menu.LinkItem href="https://base-ui.com" target="_blank" rel="noopener noreferrer">
              Base UI Docs
            </Menu.LinkItem>
            <Menu.LinkItem href="https://github.com/leboncoin/spark">Spark GitHub</Menu.LinkItem>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu>
  )
}

export const NestedMenu: StoryFn = _args => {
  return (
    <Menu>
      <Menu.Trigger asChild>
        <Button>File</Button>
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner>
          <Menu.Popup>
            <Menu.Item onClick={() => console.log('New File')}>New File</Menu.Item>
            <Menu.Item onClick={() => console.log('New Window')}>New Window</Menu.Item>
            <Menu.Separator />
            <Menu.Submenu>
              <Menu.SubmenuTrigger>Open Recent</Menu.SubmenuTrigger>
              <Menu.Positioner>
                <Menu.Popup>
                  <Menu.Item onClick={() => console.log('Document 1')}>Document 1</Menu.Item>
                  <Menu.Item onClick={() => console.log('Document 2')}>Document 2</Menu.Item>
                  <Menu.Separator />
                  <Menu.Submenu>
                    <Menu.SubmenuTrigger>More items</Menu.SubmenuTrigger>
                    <Menu.Positioner>
                      <Menu.Popup>
                        <Menu.Item onClick={() => console.log('Document 3')}>Document 3</Menu.Item>
                        <Menu.Item onClick={() => console.log('Document 4')}>Document 4</Menu.Item>
                      </Menu.Popup>
                    </Menu.Positioner>
                  </Menu.Submenu>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Submenu>
            <Menu.Separator />
            <Menu.Item onClick={() => console.log('Save')}>Save</Menu.Item>
            <Menu.Item onClick={() => console.log('Exit')}>Exit</Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu>
  )
}

export const OpenDialog: StoryFn = _args => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleMenuOpenChange = (open: boolean) => {
    // Prevent menu from closing when dialog is open
    if (!open && dialogOpen) {
      return
    }
    setMenuOpen(open)
  }

  const handleDialogOpenChange = (open: boolean) => {
    setDialogOpen(open)
    // Keep menu open when opening dialog
    if (open) {
      setMenuOpen(true)
    }
  }

  return (
    <>
      <Menu open={menuOpen} onOpenChange={handleMenuOpenChange}>
        <Menu.Trigger asChild>
          <Button>Actions</Button>
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner>
            <Menu.Popup>
              <Menu.Item onClick={() => console.log('View Details')}>View Details</Menu.Item>
              <Menu.Item closeOnClick={false} onClick={() => setDialogOpen(true)}>
                Open Settings
              </Menu.Item>
              <Menu.Item onClick={() => console.log('Share')}>Share</Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu>

      <Dialog open={dialogOpen} onOpenChange={handleDialogOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Settings</Dialog.Title>
              <Dialog.Description>Configure your preferences here.</Dialog.Description>
            </Dialog.Header>
            <Dialog.Body>
              <p className="text-body-1">Settings content goes here...</p>
            </Dialog.Body>
            <Dialog.Footer className="gap-lg flex">
              <Dialog.Close asChild>
                <Button design="outlined">Cancel</Button>
              </Dialog.Close>
              <Button onClick={() => setDialogOpen(false)}>Save</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </>
  )
}

export const OpenOnHover: StoryFn = _args => {
  return (
    <div className="text-body-2">
      <p className="mb-md">Hover over the button to open the menu</p>
      <Menu>
        <Menu.Trigger asChild openOnHover>
          <Button>Hover to open</Button>
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner>
            <Menu.Popup>
              <Menu.Item onClick={() => console.log('Item 1')}>Item 1</Menu.Item>
              <Menu.Item onClick={() => console.log('Item 2')}>Item 2</Menu.Item>
              <Menu.Item onClick={() => console.log('Item 3')}>Item 3</Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu>
    </div>
  )
}

export const RadioItems: StoryFn = _args => {
  const [textSize, setTextSize] = useState('medium')

  return (
    <Menu>
      <Menu.Trigger asChild>
        <Button>Text Size</Button>
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner>
          <Menu.Popup>
            <Menu.RadioGroup value={textSize} onValueChange={setTextSize}>
              <Menu.RadioItem value="small">Small</Menu.RadioItem>
              <Menu.RadioItem value="medium">Medium</Menu.RadioItem>
              <Menu.RadioItem value="large">Large</Menu.RadioItem>
            </Menu.RadioGroup>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu>
  )
}
