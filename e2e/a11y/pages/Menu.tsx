import { Button } from '@spark-ui/components/button'
import { Menu } from '@spark-ui/components/menu'
import React, { useState } from 'react'

export const A11yMenu = () => {
  const [sortBy, setSortBy] = useState('date')
  const [showBookmarks, setShowBookmarks] = useState(true)
  const [showFullURLs, setShowFullURLs] = useState(false)

  return (
    <section>
      <Menu defaultOpen>
        <Menu.Trigger asChild>
          <Button>Complete Menu</Button>
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner>
            <Menu.Popup>
              <Menu.Item>New File</Menu.Item>
              <Menu.Item>New Window</Menu.Item>
              <Menu.Separator />
              <Menu.Submenu>
                <Menu.SubmenuTrigger>Open Recent</Menu.SubmenuTrigger>
                <Menu.Positioner>
                  <Menu.Popup>
                    <Menu.Item>Document 1</Menu.Item>
                    <Menu.Item>Document 2</Menu.Item>
                  </Menu.Popup>
                </Menu.Positioner>
              </Menu.Submenu>
              <Menu.Separator />
              <Menu.Group>
                <Menu.GroupLabel>Sort By</Menu.GroupLabel>
                <Menu.RadioGroup value={sortBy} onValueChange={setSortBy}>
                  <Menu.RadioItem value="date">Date</Menu.RadioItem>
                  <Menu.RadioItem value="name">Name</Menu.RadioItem>
                  <Menu.RadioItem value="type">Type</Menu.RadioItem>
                </Menu.RadioGroup>
              </Menu.Group>
              <Menu.Separator />
              <Menu.Group>
                <Menu.GroupLabel>Display Options</Menu.GroupLabel>
                <Menu.CheckboxItem checked={showBookmarks} onCheckedChange={setShowBookmarks}>
                  Show Bookmarks
                </Menu.CheckboxItem>
                <Menu.CheckboxItem checked={showFullURLs} onCheckedChange={setShowFullURLs}>
                  Show Full URLs
                </Menu.CheckboxItem>
              </Menu.Group>
              <Menu.Separator />
              <Menu.LinkItem href="https://spark.adevinta.com">
                Spark Design System
              </Menu.LinkItem>
              <Menu.LinkItem href="https://github.com/leboncoin/spark" target="_blank" rel="noopener noreferrer">
                Spark GitHub
              </Menu.LinkItem>
              <Menu.Separator />
              <Menu.Item disabled>Export (Disabled)</Menu.Item>
              <Menu.Item>Exit</Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu>
    </section>
  )
}
