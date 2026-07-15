import { ArrowRight } from '@spark-ui/icons/ArrowRight'
import { Meta, StoryFn } from '@storybook/react-vite'

import { Breadcrumb } from '.'
import { Icon } from '../icon'
import { CurrentPage } from './BreadcrumbCurrentPage'
import { Item } from './BreadcrumbItem'
import { Link } from './BreadcrumbLink'
import { Separator } from './BreadcrumbSeparator'

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  subcomponents: {
    'Breadcrumb.Item': Item,
    'Breadcrumb.Link': Link,
    'Breadcrumb.CurrentPage': CurrentPage,
    'Breadcrumb.Separator': Separator,
  },
  tags: ['navigation'],
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
