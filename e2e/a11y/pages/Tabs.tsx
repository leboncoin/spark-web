import { ConversationFill } from '@spark-ui/icons/ConversationFill'
import { FireFill } from '@spark-ui/icons/FireFill'
import { MailFill } from '@spark-ui/icons/MailFill'
import { Icon } from '@spark-ui/components/icon'
import { Tabs } from '@spark-ui/components/tabs'
import React from 'react'

export const A11yTabs = () => (
  <section>
    <div className="max-w-sz-464 shrink basis-auto overflow-auto">
      <Tabs defaultValue="tab2">
        <Tabs.List>
          <Tabs.Trigger value="tab1" disabled>
            <Icon size="sm">
              <MailFill />
            </Icon>
            <span>Inbox</span>
          </Tabs.Trigger>

          <Tabs.Trigger value="tab2">
            <Icon size="sm">
              <ConversationFill />
            </Icon>
            <span>Today</span>
          </Tabs.Trigger>

          <Tabs.Trigger value="tab3">
            <Icon size="sm">
              <FireFill />
            </Icon>
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
  </section>
)
