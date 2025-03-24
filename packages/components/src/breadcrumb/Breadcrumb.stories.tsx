import { ArrowRight } from '@spark-ui/icons/ArrowRight'
import { Meta, StoryFn } from '@storybook/react'

import { Icon } from '../icon'
import { Breadcrumb } from '.'

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['navigation'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/0QchRdipAVuvVoDfTjLrgQ/Component-Specs-of-Spark?node-id=51823-4175&t=RvxIc25Ub8xTcBFf-4',
      allowFullscreen: true,
    },
  },
}

export default meta

export const Default: StoryFn = _args => (
  <Breadcrumb aria-label="Breadcrumb">
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
    </Breadcrumb.Item>

    <Breadcrumb.Separator />

    <Breadcrumb.Item>
      <Breadcrumb.Link href="/?path=/docs/experimental-breadcrumb--docs">
        Components
      </Breadcrumb.Link>
    </Breadcrumb.Item>

    <Breadcrumb.Separator />

    <Breadcrumb.Item>
      <Breadcrumb.CurrentPage>Breadcrumb</Breadcrumb.CurrentPage>
    </Breadcrumb.Item>
  </Breadcrumb>
)

export const CustomSeparator: StoryFn = _args => (
  <Breadcrumb aria-label="Breadcrumb">
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
    </Breadcrumb.Item>

    <Breadcrumb.Separator>
      <Icon>
        <ArrowRight />
      </Icon>
    </Breadcrumb.Separator>

    <Breadcrumb.Item>
      <Breadcrumb.Link href="/?path=/docs/experimental-breadcrumb--docs">
        Components
      </Breadcrumb.Link>
    </Breadcrumb.Item>

    <Breadcrumb.Separator>
      <Icon>
        <ArrowRight />
      </Icon>
    </Breadcrumb.Separator>

    <Breadcrumb.Item>
      <Breadcrumb.CurrentPage>Breadcrumb</Breadcrumb.CurrentPage>
    </Breadcrumb.Item>
  </Breadcrumb>
)

export const Truncate: StoryFn = _args => (
  <Breadcrumb aria-label="Breadcrumb">
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
    </Breadcrumb.Item>

    <Breadcrumb.Separator />

    <Breadcrumb.Item>
      <Breadcrumb.Link href="/?path=/docs/experimental-breadcrumb--docs" className="max-w-[100px]">
        Components list - Feel free to use them
      </Breadcrumb.Link>
    </Breadcrumb.Item>

    <Breadcrumb.Separator />

    <Breadcrumb.Item>
      <Breadcrumb.CurrentPage>Breadcrumb</Breadcrumb.CurrentPage>
    </Breadcrumb.Item>
  </Breadcrumb>
)
