// oxlint-disable max-lines
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Menu } from '.'

// Helper functions
const getMenuTrigger = (name: string) => screen.getByRole('button', { name })
const getMenu = () => screen.queryByRole('menu')
const getMenuItem = (name: string) => screen.getByRole('menuitem', { name })
const getMenuItemCheckbox = (name: string) => screen.getByRole('menuitemcheckbox', { name })
const getMenuItemRadio = (name: string) => screen.getByRole('menuitemradio', { name })

describe('Menu', () => {
  describe('Rendering', () => {
    it('should render trigger button', () => {
      render(
        <Menu>
          <Menu.Trigger>Open menu</Menu.Trigger>
        </Menu>
      )

      expect(getMenuTrigger('Open menu')).toBeInTheDocument()
    })

    it('should have data-spark-component attribute on trigger', () => {
      render(
        <Menu>
          <Menu.Trigger>Open menu</Menu.Trigger>
        </Menu>
      )

      const trigger = getMenuTrigger('Open menu')
      expect(trigger).toHaveAttribute('data-spark-component', 'menu-trigger')
    })

    it('should not render menu popup initially', () => {
      render(
        <Menu>
          <Menu.Trigger>Open menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Item>Item 1</Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu>
      )

      expect(getMenu()).not.toBeInTheDocument()
    })
  })

  describe('Basic Interactions', () => {
    it('should open menu on trigger click', async () => {
      const user = userEvent.setup()

      render(
        <Menu>
          <Menu.Trigger>Open menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Item>Item 1</Menu.Item>
                <Menu.Item>Item 2</Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu>
      )

      // When: Click trigger
      await user.click(getMenuTrigger('Open menu'))

      // Then: Menu should be visible
      await waitFor(() => {
        expect(getMenu()).toBeInTheDocument()
      })
      expect(getMenuItem('Item 1')).toBeInTheDocument()
      expect(getMenuItem('Item 2')).toBeInTheDocument()
    })

    it('should call onClick handler when menu item is clicked', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()

      render(
        <Menu>
          <Menu.Trigger>Open menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Item onClick={handleClick}>Item 1</Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu>
      )

      // When: Open menu and click item
      await user.click(getMenuTrigger('Open menu'))
      await waitFor(() => expect(getMenu()).toBeInTheDocument())
      await user.click(getMenuItem('Item 1'))

      // Then: Handler should be called
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should close menu on Escape key', async () => {
      const user = userEvent.setup()

      render(
        <Menu>
          <Menu.Trigger>Open menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Item>Item 1</Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu>
      )

      // Given: Menu is open
      await user.click(getMenuTrigger('Open menu'))
      await waitFor(() => expect(getMenu()).toBeInTheDocument())

      // When: Press Escape
      await user.keyboard('{Escape}')

      // Then: Menu should close
      await waitFor(() => {
        expect(getMenu()).not.toBeInTheDocument()
      })
    })
  })

  describe('Checkbox Items', () => {
    it('should render checkbox items with correct role', async () => {
      const user = userEvent.setup()

      render(
        <Menu>
          <Menu.Trigger>Open menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.CheckboxItem>Option 1</Menu.CheckboxItem>
                <Menu.CheckboxItem>Option 2</Menu.CheckboxItem>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu>
      )

      await user.click(getMenuTrigger('Open menu'))
      await waitFor(() => expect(getMenu()).toBeInTheDocument())

      expect(getMenuItemCheckbox('Option 1')).toBeInTheDocument()
      expect(getMenuItemCheckbox('Option 2')).toBeInTheDocument()
    })

    it('should toggle checkbox state on click', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()

      render(
        <Menu>
          <Menu.Trigger>Open menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.CheckboxItem checked={false} onCheckedChange={handleChange}>
                  Option 1
                </Menu.CheckboxItem>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu>
      )

      await user.click(getMenuTrigger('Open menu'))
      await waitFor(() => expect(getMenu()).toBeInTheDocument())

      const checkbox = getMenuItemCheckbox('Option 1')
      expect(checkbox).toHaveAttribute('aria-checked', 'false')

      // When: Click checkbox item
      await user.click(checkbox)

      // Then: Callback should be called
      await waitFor(() => {
        expect(handleChange).toHaveBeenCalled()
      })
      // Check the call was made with the right value (boolean)
      expect(handleChange.mock.calls[0]?.[0]).toBe(true)
    })

    it('should allow multiple checkboxes to be checked', async () => {
      const user = userEvent.setup()

      render(
        <Menu>
          <Menu.Trigger>Open menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.CheckboxItem checked={true}>Option 1</Menu.CheckboxItem>
                <Menu.CheckboxItem checked={true}>Option 2</Menu.CheckboxItem>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu>
      )

      await user.click(getMenuTrigger('Open menu'))
      await waitFor(() => expect(getMenu()).toBeInTheDocument())

      // Then: Both can be checked
      expect(getMenuItemCheckbox('Option 1')).toHaveAttribute('aria-checked', 'true')
      expect(getMenuItemCheckbox('Option 2')).toHaveAttribute('aria-checked', 'true')
    })
  })

  describe('Radio Items', () => {
    it('should render radio items with correct role', async () => {
      const user = userEvent.setup()

      render(
        <Menu>
          <Menu.Trigger>Open menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.RadioGroup value="option1">
                  <Menu.RadioItem value="option1">Option 1</Menu.RadioItem>
                  <Menu.RadioItem value="option2">Option 2</Menu.RadioItem>
                </Menu.RadioGroup>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu>
      )

      await user.click(getMenuTrigger('Open menu'))
      await waitFor(() => expect(getMenu()).toBeInTheDocument())

      expect(getMenuItemRadio('Option 1')).toBeInTheDocument()
      expect(getMenuItemRadio('Option 2')).toBeInTheDocument()
    })

    it('should select radio item on click', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()

      render(
        <Menu>
          <Menu.Trigger>Open menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.RadioGroup value="option1" onValueChange={handleChange}>
                  <Menu.RadioItem value="option1">Option 1</Menu.RadioItem>
                  <Menu.RadioItem value="option2">Option 2</Menu.RadioItem>
                </Menu.RadioGroup>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu>
      )

      await user.click(getMenuTrigger('Open menu'))
      await waitFor(() => expect(getMenu()).toBeInTheDocument())

      // When: Click second radio item
      await user.click(getMenuItemRadio('Option 2'))

      // Then: Callback should be called
      await waitFor(() => {
        expect(handleChange).toHaveBeenCalled()
      })
      // Check the call was made with the right value
      expect(handleChange.mock.calls[0]?.[0]).toBe('option2')
    })

    it('should only allow one radio item to be selected in a group', async () => {
      const user = userEvent.setup()

      render(
        <Menu>
          <Menu.Trigger>Open menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.RadioGroup value="option1">
                  <Menu.RadioItem value="option1">Option 1</Menu.RadioItem>
                  <Menu.RadioItem value="option2">Option 2</Menu.RadioItem>
                </Menu.RadioGroup>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu>
      )

      await user.click(getMenuTrigger('Open menu'))
      await waitFor(() => expect(getMenu()).toBeInTheDocument())

      // Then: Only one should be checked
      expect(getMenuItemRadio('Option 1')).toHaveAttribute('aria-checked', 'true')
      expect(getMenuItemRadio('Option 2')).toHaveAttribute('aria-checked', 'false')
    })
  })

  describe('Groups and Labels', () => {
    it('should render group labels', async () => {
      const user = userEvent.setup()

      render(
        <Menu>
          <Menu.Trigger>Open menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Group>
                  <Menu.GroupLabel>Group 1</Menu.GroupLabel>
                  <Menu.Item>Item 1</Menu.Item>
                </Menu.Group>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu>
      )

      await user.click(getMenuTrigger('Open menu'))
      await waitFor(() => expect(getMenu()).toBeInTheDocument())

      expect(screen.getByText('Group 1')).toBeInTheDocument()
    })

    it('should render separator between groups', async () => {
      const user = userEvent.setup()

      render(
        <Menu>
          <Menu.Trigger>Open menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Item>Item 1</Menu.Item>
                <Menu.Separator />
                <Menu.Item>Item 2</Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu>
      )

      await user.click(getMenuTrigger('Open menu'))
      await waitFor(() => expect(getMenu()).toBeInTheDocument())

      const separator = screen.getByRole('separator')
      expect(separator).toBeInTheDocument()
    })
  })

  describe('Nested Menus (Submenus)', () => {
    it('should render submenu trigger', async () => {
      const user = userEvent.setup()

      render(
        <Menu>
          <Menu.Trigger>Open menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Item>Item 1</Menu.Item>
                <Menu.Submenu>
                  <Menu.SubmenuTrigger>More options</Menu.SubmenuTrigger>
                  <Menu.Positioner>
                    <Menu.Popup>
                      <Menu.Item>Submenu Item</Menu.Item>
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Submenu>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu>
      )

      await user.click(getMenuTrigger('Open menu'))
      await waitFor(() => expect(getMenu()).toBeInTheDocument())

      expect(getMenuItem('More options')).toBeInTheDocument()
    })

    it('should have aria-haspopup on submenu trigger', async () => {
      const user = userEvent.setup()

      render(
        <Menu>
          <Menu.Trigger>Open menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Submenu>
                  <Menu.SubmenuTrigger>More options</Menu.SubmenuTrigger>
                  <Menu.Positioner>
                    <Menu.Popup>
                      <Menu.Item>Submenu Item</Menu.Item>
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Submenu>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu>
      )

      // Given: Main menu is open
      await user.click(getMenuTrigger('Open menu'))
      await waitFor(() => expect(getMenu()).toBeInTheDocument())

      // Then: Submenu trigger should have aria-haspopup
      const submenuTrigger = getMenuItem('More options')
      expect(submenuTrigger).toHaveAttribute('aria-haspopup', 'menu')
    })
  })

  describe('Disabled State', () => {
    it('should render disabled menu items', async () => {
      const user = userEvent.setup()

      render(
        <Menu>
          <Menu.Trigger>Open menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Item disabled>Disabled Item</Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu>
      )

      await user.click(getMenuTrigger('Open menu'))
      await waitFor(() => expect(getMenu()).toBeInTheDocument())

      const disabledItem = getMenuItem('Disabled Item')
      expect(disabledItem).toHaveAttribute('data-disabled', '')
    })

    it('should not call onClick for disabled items', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()

      render(
        <Menu>
          <Menu.Trigger>Open menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Item disabled onClick={handleClick}>
                  Disabled Item
                </Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu>
      )

      await user.click(getMenuTrigger('Open menu'))
      await waitFor(() => expect(getMenu()).toBeInTheDocument())

      // When: Try to click disabled item
      await user.click(getMenuItem('Disabled Item'))

      // Then: Handler should not be called
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('Controlled Mode', () => {
    it('should support controlled open state', async () => {
      const { rerender } = render(
        <Menu open={false}>
          <Menu.Trigger>Open menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Item>Item 1</Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu>
      )

      // Then: Menu should be closed
      expect(getMenu()).not.toBeInTheDocument()

      // When: Update to open
      rerender(
        <Menu open={true}>
          <Menu.Trigger>Open menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Item>Item 1</Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu>
      )

      // Then: Menu should be open
      await waitFor(() => {
        expect(getMenu()).toBeInTheDocument()
      })
    })
  })

  describe('LinkItem', () => {
    it('should render as anchor element', async () => {
      const user = userEvent.setup()

      render(
        <Menu>
          <Menu.Trigger>Open menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.LinkItem href="https://example.com">Go to Example</Menu.LinkItem>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu>
      )

      await user.click(getMenuTrigger('Open menu'))
      await waitFor(() => expect(getMenu()).toBeInTheDocument())

      const link = getMenuItem('Go to Example')
      expect(link.tagName).toBe('A')
      expect(link).toHaveAttribute('href', 'https://example.com')
    })

    it('should support target and rel attributes', async () => {
      const user = userEvent.setup()

      render(
        <Menu>
          <Menu.Trigger>Open menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.LinkItem href="https://example.com" target="_blank" rel="noopener">
                  External Link
                </Menu.LinkItem>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu>
      )

      await user.click(getMenuTrigger('Open menu'))
      await waitFor(() => expect(getMenu()).toBeInTheDocument())

      const link = getMenuItem('External Link')
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener')
    })
  })
})
