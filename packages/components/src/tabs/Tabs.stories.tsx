/* eslint-disable max-lines */
import { Tag } from '@spark-ui/components/tag'
import { ConversationFill } from '@spark-ui/icons/ConversationFill'
import { FireFill } from '@spark-ui/icons/FireFill'
import { MailFill } from '@spark-ui/icons/MailFill'
import type { Meta, StoryFn } from '@storybook/react-vite'
import { type ReactNode } from 'react'

import { Button } from '../button'
import { Icon } from '../icon'
import { Tabs } from '.'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['navigation'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/0QchRdipAVuvVoDfTjLrgQ/Component-Specs-of-Spark?node-id=1613-37148&t=RvxIc25Ub8xTcBFf-4',
      allowFullscreen: true,
    },
  },
}

export default meta

export interface TabItem {
  children?: ReactNode
  value: string
  disabled?: boolean
  a11yLabel?: string
  content: string
}

export const Default: StoryFn = _args => {
  const tabs = [
    {
      children: <span>Inbox</span>,
      value: 'tab1',
      content: 'Your inbox is empty',
    },
    {
      children: <span>Today</span>,
      value: 'tab2',
      content: 'Make some coffee',
    },
    {
      children: <span>Upcoming</span>,
      value: 'tab3',
      content: 'Order more coffee',
    },
  ]

  return (
    <div>
      <h4 id="tasks-label" className="text-display-2">
        Tasks
      </h4>
      <Tabs defaultValue="tab1">
        <Tabs.List aria-labelledby="tasks-label">
          {tabs.map(({ value, children }) => (
            <Tabs.Trigger key={value} value={value}>
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
    </div>
  )
}

export const Icons: StoryFn = _args => {
  const tabs = [
    {
      value: 'tab1',
      children: (
        <>
          <Icon size="sm">
            <MailFill />
          </Icon>
          <span>Inbox</span>
        </>
      ),
      content: 'Your inbox is empty',
      disabled: false,
    },
    {
      children: (
        <>
          <Icon size="sm">
            <ConversationFill />
          </Icon>
          <span>Today</span>
        </>
      ),
      value: 'tab2',
      content: 'Make some coffee',
      disabled: false,
    },
    {
      children: (
        <>
          <Icon size="sm">
            <FireFill />
          </Icon>
          <span>Upcoming</span>
        </>
      ),
      value: 'tab3',
      content: 'Order more coffee',
      disabled: false,
    },
  ]

  return (
    <div className="gap-lg flex flex-col">
      <div>
        <Tabs defaultValue="tab2">
          <Tabs.List>
            {tabs.map(({ value, children, disabled }) => (
              <Tabs.Trigger key={value} value={value} disabled={disabled}>
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
      </div>
    </div>
  )
}

export const Intent: StoryFn = _args => {
  const tabs = [
    {
      children: <span>Inbox</span>,
      value: 'tab1',
      disabled: false,
      content: 'Your inbox is empty',
    },
    {
      children: <span>Today</span>,
      value: 'tab2',
      disabled: false,
      content: 'Make some coffee',
    },
    {
      children: <span>Upcoming</span>,
      value: 'tab3',
      disabled: false,
      content: 'Order more coffee',
    },
  ]

  return (
    <div className="gap-lg flex flex-col">
      <div>
        <Tag className="mb-md flex">basic (default)</Tag>
        <Tabs defaultValue="tab1">
          <Tabs.List>
            {tabs.map(({ value, children, disabled }) => (
              <Tabs.Trigger key={value} value={value} disabled={disabled}>
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
      </div>
      <div>
        <Tag className="mb-md flex">main</Tag>
        <Tabs defaultValue="tab1" intent="main">
          <Tabs.List>
            {tabs.map(({ value, children, disabled }) => (
              <Tabs.Trigger key={value} value={value} disabled={disabled}>
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
      </div>
      <div>
        <Tag className="mb-md flex">support</Tag>
        <Tabs defaultValue="tab1" intent="support">
          <Tabs.List>
            {tabs.map(({ value, children, disabled }) => (
              <Tabs.Trigger key={value} value={value} disabled={disabled}>
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
      </div>
    </div>
  )
}

export const Orientation: StoryFn = _args => {
  const tabs = [
    {
      children: <span>Inbox</span>,
      value: 'tab1',
      disabled: false,
      content: 'Your inbox is empty',
    },
    {
      children: <span>Today</span>,
      value: 'tab2',
      disabled: false,
      content: 'Make some coffee',
    },
    {
      children: <span>Upcoming</span>,
      value: 'tab3',
      disabled: false,
      content: 'Order more coffee',
    },
  ]

  return (
    <div className="gap-lg flex flex-col">
      <div>
        <Tag className="mb-md flex">horizontal (default)</Tag>
        <Tabs defaultValue="tab1" orientation="horizontal">
          <Tabs.List>
            {tabs.map(({ value, children, disabled }) => (
              <Tabs.Trigger key={value} value={value} disabled={disabled}>
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
      </div>

      <div>
        <Tag className="mb-md flex">vertical</Tag>
        <Tabs defaultValue="tab1" orientation="vertical">
          <Tabs.List>
            {tabs.map(({ value, children, disabled }) => (
              <Tabs.Trigger key={value} value={value} disabled={disabled}>
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
      </div>
    </div>
  )
}

export const Overflow: StoryFn = _args => {
  const overflowTabs = [
    {
      children: <span>Inbox</span>,
      value: 'tab1',
      disabled: false,
      content: 'Your inbox is empty',
    },
    {
      children: <span>Today</span>,
      value: 'tab2',
      disabled: false,
      content: 'Make some coffee',
    },
    {
      children: <span>Upcoming</span>,
      value: 'tab3',
      disabled: false,
      content: 'Order more coffee',
    },
    {
      children: <span>Pending</span>,
      value: 'tab4',
      disabled: false,
      content: 'Wait for your coffee',
    },
    {
      children: <span>Blocked</span>,
      value: 'tab5',
      disabled: false,
      content: 'Something went wrong',
    },
    {
      children: <span>Sandbox</span>,
      value: 'tab6',
      disabled: false,
      content: 'Imagine your coffee',
    },
  ]

  return (
    <div className="gap-lg flex flex-col">
      <div className="max-w-sz-464 shrink basis-auto overflow-auto">
        <Tag className="mb-md flex">with loop</Tag>
        <Tabs defaultValue="tab1">
          <Tabs.List loop>
            {overflowTabs.map(({ value, children, disabled }) => (
              <Tabs.Trigger key={value} value={value} disabled={disabled}>
                {children}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {overflowTabs.map(({ content, value }) => (
            <Tabs.Content key={value} value={value}>
              <p>{content}</p>
            </Tabs.Content>
          ))}
        </Tabs>
      </div>

      <div className="max-w-sz-464 shrink basis-auto overflow-auto">
        <Tag className="mb-md flex">without loop (default)</Tag>

        <Tabs defaultValue="tab1">
          <Tabs.List>
            {overflowTabs.map(({ value, children, disabled }) => (
              <Tabs.Trigger key={value} value={value} disabled={disabled}>
                {children}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {overflowTabs.map(({ content, value }) => (
            <Tabs.Content key={value} value={value}>
              <p>{content}</p>
            </Tabs.Content>
          ))}
        </Tabs>
      </div>
    </div>
  )
}

export const Size: StoryFn = _args => {
  const sizes = ['xs', 'sm', 'md'] as const
  const tabs = [
    {
      children: <span>Inbox</span>,
      value: 'tab1',
      disabled: false,
      content: 'Your inbox is empty',
    },
    {
      children: <span>Today</span>,
      value: 'tab2',
      disabled: false,
      content: 'Make some coffee',
    },
    {
      children: <span>Upcoming</span>,
      value: 'tab3',
      disabled: false,
      content: 'Order more coffee',
    },
  ]

  return (
    <div className="gap-lg flex flex-col">
      {sizes.map(size => (
        <div key={size}>
          <Tag className="mb-md flex">
            {size}
            {size === 'md' && ' (default)'}
          </Tag>
          <Tabs defaultValue="tab1" size={size}>
            <Tabs.List>
              {tabs.map(({ value, children, disabled }) => (
                <Tabs.Trigger key={value} value={value} disabled={disabled}>
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
        </div>
      ))}
    </div>
  )
}

export const ForceMount: StoryFn = _args => {
  const tabs = [
    {
      children: <span>Inbox</span>,
      value: 'tab1',
      disabled: false,
      content: 'Your inbox is empty',
    },
    {
      children: <span>Today</span>,
      value: 'tab2',
      disabled: false,
      content: 'Make some coffee',
    },
    {
      children: <span>Upcoming</span>,
      value: 'tab3',
      disabled: false,
      content: 'Order more coffee',
    },
  ]

  return (
    <div>
      <Tag className="mb-md flex">forceMount</Tag>

      <Tabs defaultValue="tab1" forceMount>
        <Tabs.List>
          {tabs.map(({ value, children, disabled }) => (
            <Tabs.Trigger key={value} value={value} disabled={disabled}>
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
    </div>
  )
}

export const Disabled: StoryFn = _args => {
  const tabs = [
    {
      children: <span>Inbox</span>,
      value: 'tab1',
      content: 'Your inbox is empty',
      disabled: true,
    },
    {
      children: <span>Today</span>,
      value: 'tab2',
      content: 'Make some coffee',
      disabled: false,
    },
    {
      children: <span>Upcoming</span>,
      value: 'tab3',
      content: 'Order more coffee',
      disabled: false,
    },
  ]

  return (
    <div className="gap-lg flex flex-row">
      <div className="shrink basis-auto overflow-auto">
        <Tabs defaultValue="tab2">
          <Tabs.List>
            {tabs.map(({ value, children, disabled }) => (
              <Tabs.Trigger key={value} value={value} disabled={disabled}>
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
      </div>
    </div>
  )
}

export const WithPopover: StoryFn = _args => {
  return (
    <div className="gap-lg flex flex-col">
      <div>
        <Tag className="mb-md flex">with renderMenu (try Shift+F10 on focused tabs)</Tag>
        <Tabs defaultValue="tab1" orientation="vertical">
          <Tabs.List>
            <Tabs.Trigger
              value="tab1"
              renderMenu={({ Popover }) => (
                <Popover>
                  <Popover.Trigger aria-label="Options for Inbox tab" />
                  <Popover.Portal>
                    <Popover.Content>
                      <Button intent="surface" className="justify-start">
                        Close tab
                      </Button>
                      <Button intent="surface" className="justify-start">
                        Duplicate tab
                      </Button>
                    </Popover.Content>
                  </Popover.Portal>
                </Popover>
              )}
            >
              <span>Inbox</span>
            </Tabs.Trigger>

            <Tabs.Trigger
              value="tab2"
              renderMenu={({ Popover }) => (
                <Popover>
                  <Popover.Trigger aria-label="Options for Today tab" />
                  <Popover.Portal>
                    <Popover.Content>
                      <Button intent="surface" className="justify-start">
                        Close tab
                      </Button>
                      <Button intent="surface" className="justify-start">
                        Duplicate tab
                      </Button>
                    </Popover.Content>
                  </Popover.Portal>
                </Popover>
              )}
            >
              <span>Today</span>
            </Tabs.Trigger>

            <Tabs.Trigger value="tab3">
              <span>Upcoming</span>
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="tab1">
            <p>Your inbox is empty</p>
          </Tabs.Content>
          <Tabs.Content value="tab2">
            <p>Make some coffee</p>
          </Tabs.Content>
          <Tabs.Content value="tab3">
            <p>Order more coffee</p>
          </Tabs.Content>
        </Tabs>
      </div>

      <div>
        <Tag className="mb-md flex">horizontal orientation (popover appears below)</Tag>
        <Tabs defaultValue="tab1" orientation="horizontal">
          <Tabs.List>
            <Tabs.Trigger
              value="tab1"
              renderMenu={({ Popover }) => (
                <Popover>
                  <Popover.Trigger aria-label="Options for Inbox tab" />
                  <Popover.Portal>
                    <Popover.Content>
                      <Button intent="surface" className="justify-start">
                        Close tab
                      </Button>
                      <Button intent="surface" className="justify-start">
                        Duplicate tab
                      </Button>
                    </Popover.Content>
                  </Popover.Portal>
                </Popover>
              )}
            >
              <span>Inbox</span>
            </Tabs.Trigger>

            <Tabs.Trigger value="tab2">
              <span>Today</span>
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="tab1">
            <p>Your inbox is empty</p>
          </Tabs.Content>
          <Tabs.Content value="tab2">
            <p>Make some coffee</p>
          </Tabs.Content>
        </Tabs>
      </div>
    </div>
  )
}
