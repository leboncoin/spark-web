import { Skeleton } from '@spark-ui/components/skeleton'
import { Switch } from '@spark-ui/components/switch'
import { Tag } from '@spark-ui/components/tag'
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite'
import { cx } from 'class-variance-authority'
import { type ComponentProps, useState } from 'react'

import { Card } from '.'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['action'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/0QchRdipAVuvVoDfTjLrgQ/Component-Specs-of-Spark?node-id=2340-22557&t=RvxIc25Ub8xTcBFf-4',
      allowFullscreen: true,
    },
  },
}

export default meta

type CardProps = ComponentProps<typeof Card>

const intents: CardProps['intent'][] = [
  'surface',
  'main',
  'support',
  'accent',
  'basic',
  'success',
  'alert',
  'danger',
  'info',
  'neutral',
]
const designs: CardProps['design'][] = ['filled', 'outlined', 'tinted', 'highlighted']

export const Default: StoryObj = {
  render: _args => {
    return (
      <Card className="gap-md flex flex-col items-start shadow-md">
        <Tag>New</Tag>

        <Skeleton label="Loading..." className="gap-xl flex w-full flex-col">
          <Skeleton.Line lines={3} />
        </Skeleton>
      </Card>
    )
  },
}

export const DesignAndIntentTable: StoryFn = _args => {
  const [withShadows, setWithShadows] = useState(true)

  return (
    <div className="gap-lg flex flex-col">
      <Switch checked={withShadows} onCheckedChange={setWithShadows}>
        With shadows
      </Switch>

      {designs.map(design => (
        <div key={`${design}`} className={'gap-md my-md flex flex-col'}>
          <p className="text-headline-1">{design}</p>
          <div className={'gap-md flex flex-wrap'}>
            {intents.map(intent => (
              <Card
                intent={intent}
                design={design}
                className={cx(
                  'gap-md min-w-sz-160 flex flex-col items-start',
                  withShadows && 'shadow-md'
                )}
              >
                <Tag>{intent}</Tag>

                <Skeleton label="Loading..." className="gap-xl flex w-full flex-col">
                  <Skeleton.Line lines={3} />
                </Skeleton>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export const Link: StoryFn = _args => (
  <div className="gap-md flex flex-wrap">
    <Card asChild>
      <a href="/">Card as a link</a>
    </Card>
  </div>
)
