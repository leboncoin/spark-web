/* eslint-disable max-lines */
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockResizeObserver } from 'jsdom-testing-mocks'
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'

import { Button } from '../button'
import { Tabs, TabsListProps, TabsProps } from '.'
import { type TabItem } from './Tabs.stories'

const defaultTabs: TabItem[] = [
  {
    children: 'Yesterday',
    value: 'tab1',
    content: 'Nothing happened',
  },
  {
    children: 'Today',
    value: 'tab2',
    content: 'Make things happen!',
  },
]

const tabsWithOverflow = [
  { children: 'One', value: 'tab1', content: 'Lorem ipsum dolor sit amet' },
  { children: 'Two', value: 'tab2', content: 'Lorem ipsum dolor sit amet' },
  { children: 'Three', value: 'tab3', content: 'Lorem ipsum dolor sit amet' },
  { children: 'Four', value: 'tab4', content: 'Lorem ipsum dolor sit amet', disabled: true },
  { children: 'Five', value: 'tab5', content: 'Lorem ipsum dolor sit amet', disabled: true },
  { children: 'Six', value: 'tab6', content: 'Lorem ipsum dolor sit amet' },
  { children: 'Seven', value: 'tab7', content: 'Lorem ipsum dolor sit amet' },
]

const createTabs = ({
  rootProps = {},
  listProps = {},
  tabs = defaultTabs,
}: {
  rootProps?: TabsProps
  listProps?: Omit<TabsListProps, 'children'>
  tabs?: TabItem[]
} = {}) => {
  return (
    <Tabs defaultValue="tab1" {...rootProps}>
      <Tabs.List {...listProps}>
        {tabs.map(({ value, children, disabled, a11yLabel }) => (
          <Tabs.Trigger key={value} value={value} disabled={disabled} aria-label={a11yLabel}>
            {children}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {tabs.map(({ content, value }) => (
        <Tabs.Content key={value} value={value}>
          <p>{content}</p>
        </Tabs.Content>
      ))}
    </Tabs>
  )
}

describe('Tabs', () => {
  const scrollIntoViewSpy = vi.fn()

  beforeAll(() => {
    Object.defineProperty(HTMLButtonElement.prototype, 'scrollIntoView', {
      value: scrollIntoViewSpy,
    })
    mockResizeObserver()
  })

  beforeEach(() => vi.clearAllMocks())

  it('should render tabs and handle callback on value change', async () => {
    const user = userEvent.setup()
    const rootProps = { defaultValue: 'tab1', onValueChange: vi.fn() }

    render(createTabs({ rootProps }))

    expect(screen.getByText('Yesterday')).toBeInTheDocument()

    await user.click(screen.getByText('Today'))

    expect(rootProps.onValueChange).toHaveBeenCalledTimes(1)
    expect(rootProps.onValueChange).toHaveBeenCalledWith('tab2')
  })

  it('should scroll into focused tab item', async () => {
    const user = userEvent.setup()

    render(createTabs())

    await user.click(screen.getByText('Today'))

    expect(scrollIntoViewSpy).toHaveBeenCalledTimes(1)
  })

  it('should not trigger any event on disabled tab item click', async () => {
    const user = userEvent.setup()
    const rootProps = { defaultValue: 'tab1', onValueChange: vi.fn() }
    const tabsWithDisabled = [
      ...defaultTabs,
      { children: 'Tomorrow', value: 'tab3', content: 'Things will happen', disabled: true },
    ]

    render(createTabs({ tabs: tabsWithDisabled, rootProps }))

    await user.click(screen.getByText('Tomorrow'))

    expect(rootProps.onValueChange).not.toHaveBeenCalled()
  })

  describe('overflow', () => {
    const scrollSpy = vi.fn()

    beforeAll(() => {
      vi.stubGlobal('innerWidth', 100)

      Object.defineProperty(HTMLDivElement.prototype, 'clientWidth', {
        value: 100,
        writable: true,
      })

      Object.defineProperty(HTMLDivElement.prototype, 'scrollWidth', {
        value: 200,
        writable: true,
      })

      Object.defineProperty(HTMLDivElement.prototype, 'scrollTo', {
        value: scrollSpy,
      })
    })

    beforeEach(() => {
      vi.clearAllMocks()

      Object.defineProperty(HTMLDivElement.prototype, 'scrollLeft', {
        value: 0,
        writable: true,
      })
    })

    it('should display navigation arrows on overflow and scroll on click', async () => {
      Object.defineProperty(HTMLDivElement.prototype, 'scrollLeft', {
        value: 50,
        writable: true,
      })

      const user = userEvent.setup()
      render(createTabs({ tabs: tabsWithOverflow }))

      await user.click(screen.getByLabelText('Scroll left'))
      await user.click(screen.getByLabelText('Scroll right'))

      expect(scrollSpy).toHaveBeenCalledTimes(2)
    })

    it('should not display navigation arrows on vertical orientation', () => {
      render(
        createTabs({
          tabs: tabsWithOverflow,
          rootProps: { orientation: 'vertical' },
        })
      )

      expect(screen.queryByLabelText('Scroll left')).not.toBeInTheDocument()
      expect(screen.queryByLabelText('Scroll right')).not.toBeInTheDocument()
    })

    it('should disable left arrow at the beginning of the list with disabled loop option', () => {
      render(
        createTabs({
          tabs: tabsWithOverflow,
          rootProps: { defaultValue: 'tab1' },
          listProps: { loop: false },
        })
      )

      expect(screen.getByLabelText('Scroll left')).toBeDisabled()
    })

    it('should disable right arrow at the end of the list with disabled loop option', () => {
      Object.defineProperty(HTMLDivElement.prototype, 'scrollLeft', {
        value: 100,
        writable: true,
      })

      render(
        createTabs({
          tabs: tabsWithOverflow,
          rootProps: { defaultValue: 'tab1' },
          listProps: { loop: false },
        })
      )

      expect(screen.getByLabelText('Scroll right')).toBeDisabled()
    })

    describe('with loop option', () => {
      it('should scroll forward on left arrow click, when at the beginning of the list', async () => {
        const user = userEvent.setup()
        render(
          createTabs({
            tabs: tabsWithOverflow,
            rootProps: { defaultValue: 'tab1' },
            listProps: { loop: true },
          })
        )

        await user.click(screen.getByLabelText('Scroll left'))

        expect(scrollSpy).toHaveBeenCalledTimes(1)
        expect(scrollSpy).toHaveBeenCalledWith({
          left: 100,
          behavior: 'smooth',
        })
      })

      it('should scroll backward on right arrow click, when at the end of the list', async () => {
        Object.defineProperty(HTMLDivElement.prototype, 'scrollLeft', {
          value: 100,
          writable: true,
        })

        const user = userEvent.setup()

        render(
          createTabs({
            tabs: tabsWithOverflow,
            rootProps: { defaultValue: 'tab1' },
            listProps: { loop: true },
          })
        )

        await user.click(screen.getByLabelText('Scroll right'))

        expect(scrollSpy).toHaveBeenCalledTimes(1)
        expect(scrollSpy).toHaveBeenCalledWith({
          left: 0,
          behavior: 'smooth',
        })
      })

      it('should keep inactive tabs in the DOM (but hidden) when forceMount prop is true', async () => {
        render(
          createTabs({
            rootProps: { defaultValue: 'tab1', forceMount: true },
          })
        )

        expect(screen.getByText(/Make things happen!/)).toBeInTheDocument()

        expect(screen.getAllByRole('tabpanel').at(-1)).toHaveClass('data-[state=inactive]:hidden')
      })
    })
  })

  describe('with menu', () => {
    it('should render menu structure and set accessibility attributes', () => {
      const CustomIcon = () => <span data-testid="custom-icon">Custom</span>

      render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Trigger
              value="tab1"
              renderMenu={({ Popover }) => (
                <Popover>
                  <Popover.Trigger aria-label="Options for tab">
                    <CustomIcon />
                  </Popover.Trigger>
                  <Popover.Content>
                    <Button>Action</Button>
                  </Popover.Content>
                </Popover>
              )}
            >
              Tab 1
            </Tabs.Trigger>
            <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">Content 1</Tabs.Content>
          <Tabs.Content value="tab2">Content 2</Tabs.Content>
        </Tabs>
      )

      // Menu trigger should be rendered
      expect(screen.getByLabelText('Options for tab')).toBeInTheDocument()
      // Custom icon should be used
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
      // Tab with menu should have aria-haspopup
      const tabWithMenu = screen.getByRole('tab', { name: 'Tab 1' })
      const tabWithoutMenu = screen.getByRole('tab', { name: 'Tab 2' })
      expect(tabWithMenu).toHaveAttribute('aria-haspopup', 'true')
      expect(tabWithoutMenu).not.toHaveAttribute('aria-haspopup')
    })

    it('should open menu via click or keyboard shortcut and display content', async () => {
      const user = userEvent.setup()

      render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Trigger
              value="tab1"
              renderMenu={({ Popover }) => (
                <Popover>
                  <Popover.Trigger aria-label="Options for tab" />
                  <Popover.Content>
                    <Button>Close tab</Button>
                    <Button>Duplicate tab</Button>
                  </Popover.Content>
                </Popover>
              )}
            >
              Tab 1
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">Content 1</Tabs.Content>
        </Tabs>
      )

      // Open menu via click
      const menuTrigger = screen.getByLabelText('Options for tab')
      await user.click(menuTrigger)
      expect(screen.getByText('Close tab')).toBeInTheDocument()
      expect(screen.getByText('Duplicate tab')).toBeInTheDocument()

      // Close menu
      await user.keyboard('{Escape}')
      await waitFor(() => {
        expect(screen.queryByText('Close tab')).not.toBeInTheDocument()
      })

      // Open menu via Shift+F10
      const tabTrigger = screen.getByRole('tab', { name: 'Tab 1' })
      await user.click(tabTrigger)
      await user.keyboard('{Shift>}{F10}{/Shift}')

      await waitFor(() => {
        expect(screen.getByText('Close tab')).toBeInTheDocument()
      })
    })

    it('should apply default props to MenuContent and allow overriding them', async () => {
      const user = userEvent.setup()

      render(
        <Tabs defaultValue="tab1" orientation="vertical">
          <Tabs.List>
            <Tabs.Trigger
              value="tab1"
              renderMenu={({ Popover }) => (
                <Popover>
                  <Popover.Trigger aria-label="Options" />
                  <Popover.Content>
                    <Button>Default props</Button>
                  </Popover.Content>
                </Popover>
              )}
            >
              Tab 1
            </Tabs.Trigger>
            <Tabs.Trigger
              value="tab2"
              renderMenu={({ Popover }) => (
                <Popover>
                  <Popover.Trigger aria-label="Options 2" />
                  <Popover.Content side="top" align="end" className="custom-class">
                    <Button>Overridden props</Button>
                  </Popover.Content>
                </Popover>
              )}
            >
              Tab 2
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">Content 1</Tabs.Content>
          <Tabs.Content value="tab2">Content 2</Tabs.Content>
        </Tabs>
      )

      // Test default props
      await user.click(screen.getByLabelText('Options'))
      const defaultMenuContent = screen
        .getByText('Default props')
        .closest('[data-spark-component="popover-content"]')
      expect(defaultMenuContent).toHaveClass('gap-sm', 'flex', 'flex-col')

      // Close and test overridden props
      await user.keyboard('{Escape}')
      await user.click(screen.getByLabelText('Options 2'))
      const overriddenMenuContent = screen
        .getByText('Overridden props')
        .closest('[data-spark-component="popover-content"]')
      expect(overriddenMenuContent).toHaveClass('custom-class')
    })
  })
})
