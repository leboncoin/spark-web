import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockResizeObserver } from 'jsdom-testing-mocks'
import { beforeAll, describe, expect, it, vi } from 'vitest'

import { createTabs, type TabItem } from './Tabs.stories'

const tabs: TabItem[] = [
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

    render(createTabs({ tabs, rootProps }))

    expect(screen.getByText('Yesterday')).toBeInTheDocument()

    await user.click(screen.getByText('Today'))

    expect(rootProps.onValueChange).toHaveBeenCalledTimes(1)
    expect(rootProps.onValueChange).toHaveBeenCalledWith('tab2')
  })

  it('should scroll into focused tab item', async () => {
    const user = userEvent.setup()

    render(createTabs({ tabs }))

    await user.click(screen.getByText('Today'))

    expect(scrollIntoViewSpy).toHaveBeenCalledTimes(1)
  })

  it('should not trigger any event on disabled tab item click', async () => {
    const user = userEvent.setup()
    const rootProps = { defaultValue: 'tab1', onValueChange: vi.fn() }
    const tabsWithDisabled = [
      ...tabs,
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
            tabs,
            rootProps: { defaultValue: 'tab1', forceMount: true },
          })
        )

        expect(screen.getByText(/Make things happen!/)).toBeInTheDocument()

        expect(screen.getAllByRole('tabpanel').at(-1)).toHaveClass('data-[state=inactive]:hidden')
      })
    })
  })
})
