import { Icon } from '@spark-ui/components/icon'
import { IconButton } from '@spark-ui/components/icon-button'
import { LinkBox } from '@spark-ui/components/link-box'
import { Switch } from '@spark-ui/components/switch'
import { Tag } from '@spark-ui/components/tag'
import { TextLink } from '@spark-ui/components/text-link'
import { BookmarkFill, BookmarkOutline } from '@spark-ui/icons'
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite'
import { cx } from 'class-variance-authority'
import { type ComponentProps, useState } from 'react'

import { Card } from '.'
import pandaImg from './docAssets/panda.jpg'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['action', 'data-display'],
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
  'success',
  'alert',
  'danger',
  'info',
  'neutral',
]
const designs: CardProps['design'][] = ['outlined', 'tinted']

export const Default: StoryObj = {
  render: _args => {
    return (
      <Card className="max-w-sz-320">
        <Card.Type>Featured</Card.Type>
        <Card.Content className="gap-md flex flex-col items-start">
          <div className="h-sz-144 relative w-full">
            <img
              src={pandaImg}
              alt="Panda"
              className="relative size-full rounded-lg object-cover"
            />
          </div>
          <div>
            <p className="text-headline-2">All about pandas</p>
            <p>Read about Panda and Red Panda</p>
          </div>
        </Card.Content>
      </Card>
    )
  },
}

export const Type: StoryFn = _args => {
  return (
    <div className="gap-lg flex flex-wrap">
      <Card className="min-w-sz-208">
        <Card.Type>Best seller</Card.Type>
        <Card.Content className="gap-md flex flex-col items-start">
          <div className="h-sz-80 relative w-full">
            <img
              src={pandaImg}
              alt="Panda"
              className="relative size-full rounded-lg object-cover"
            />
          </div>
          <div>
            <p className="text-headline-2">Premium Product</p>
            <p>Top rated by customers</p>
          </div>
        </Card.Content>
      </Card>

      <Card className="min-w-sz-208">
        <Card.Type intent="success">New product</Card.Type>
        <Card.Content className="gap-md flex flex-col items-start">
          <div className="h-sz-80 relative w-full">
            <img
              src={pandaImg}
              alt="Panda"
              className="relative size-full rounded-lg object-cover"
            />
          </div>
          <div>
            <p className="text-headline-2">Latest Release</p>
            <p>Just arrived in store</p>
          </div>
        </Card.Content>
      </Card>

      <Card className="min-w-sz-208">
        <Card.Type intent="alert">Limited edition</Card.Type>
        <Card.Content className="gap-md flex flex-col items-start">
          <div className="h-sz-80 relative w-full">
            <img
              src={pandaImg}
              alt="Panda"
              className="relative size-full rounded-lg object-cover"
            />
          </div>
          <div>
            <p className="text-headline-2">Exclusive Item</p>
            <p>Only 5 left in stock</p>
          </div>
        </Card.Content>
      </Card>
    </div>
  )
}

export const DesignAndIntentTable: StoryFn = _args => {
  const [disabled, setDisabled] = useState(false)

  return (
    <div className="gap-lg flex flex-col">
      <div className="gap-lg flex flex-wrap">
        <Switch checked={disabled} onCheckedChange={setDisabled}>
          Disabled
        </Switch>
      </div>

      <table className="border-collapse">
        <thead>
          <tr>
            <th className="p-md border-sm border-outline text-left">Intent</th>
            {designs.map(design => (
              <th key={design} className="p-md border-sm border-outline text-center">
                {design}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {intents.map(intent => (
            <tr key={intent}>
              <td className="p-md border-sm border-outline align-middle">
                <Tag>{intent}</Tag>
              </td>
              {designs.map(design => (
                <td
                  key={`${intent}-${design}`}
                  className="p-md border-sm border-outline text-center align-top"
                >
                  <div className="gap-md flex items-center">
                    <Card intent={intent} design={design} className={cx('w-sz-208')} asChild>
                      <button type="button" className="text-left" disabled={disabled}>
                        <Card.Content className="gap-md flex flex-col items-start">
                          <div className="h-sz-80 relative w-full">
                            <img
                              src={pandaImg}
                              alt="Panda"
                              className="relative size-full rounded-lg object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-headline-2">All about pandas</p>
                            <p>Read about Panda and Red Panda</p>
                          </div>
                        </Card.Content>
                      </button>
                    </Card>
                    <Card intent={intent} design={design} className={cx('w-sz-208')} asChild>
                      <button type="button" className="text-left" disabled={disabled}>
                        <Card.Type>Featured</Card.Type>
                        <Card.Content className="gap-md flex flex-col items-start">
                          <div className="h-sz-80 relative w-full">
                            <img
                              src={pandaImg}
                              alt="Panda"
                              className="relative size-full rounded-lg object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-headline-2">All about pandas</p>
                            <p>Read about Panda and Red Panda</p>
                          </div>
                        </Card.Content>
                      </button>
                    </Card>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export const InsetContent: StoryFn = _args => (
  <div className="gap-md flex flex-wrap">
    <Card className="min-w-sz-160">
      <Card.Content inset className="flex flex-col items-start">
        <div className="h-sz-144 relative w-full">
          <img
            src={pandaImg}
            alt="Panda"
            className="h-sz-144 relative w-full rounded-t-lg object-cover"
          />
        </div>

        <div className="p-lg">
          <p className="text-headline-2">All about pandas</p>
          <p>Read about Panda and Red Panda</p>
        </div>
      </Card.Content>
    </Card>
  </div>
)

export const Link: StoryFn = _args => (
  <div className="gap-md flex flex-wrap">
    <Card asChild className="min-w-sz-160">
      <a href="/">
        <Card.Content className="gap-md flex flex-col items-start">
          <div className="h-sz-144 relative w-full">
            <img
              src={pandaImg}
              alt="Panda"
              className="h-sz-144 relative w-full rounded-lg object-cover"
            />
          </div>

          <LinkBox.Link href="/">
            <p className="text-headline-2">All about pandas</p>
          </LinkBox.Link>

          <p>Read about Panda and Red Panda</p>
        </Card.Content>
      </a>
    </Card>
  </div>
)

export const WithLinkBox: StoryFn = _args => {
  const [isBookmarked, setIsBookmarked] = useState(false)

  return (
    <div className="gap-md flex flex-wrap">
      <LinkBox>
        <Card className="min-w-sz-160">
          <Card.Content className="gap-md flex flex-col items-start">
            <div className="h-sz-144 relative w-full">
              <img src={pandaImg} alt="Panda" className="size-full rounded-lg object-cover" />
              <LinkBox.Raised>
                <IconButton
                  intent="surface"
                  aria-label={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
                  size="sm"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className="top-md right-md absolute"
                >
                  <Icon>{isBookmarked ? <BookmarkFill /> : <BookmarkOutline />}</Icon>
                </IconButton>
              </LinkBox.Raised>
            </div>
            <LinkBox.Link href="/">
              <p className="text-headline-2">All about pandas</p>
            </LinkBox.Link>

            <p>
              Read about{' '}
              <LinkBox.Raised>
                <TextLink href="https://en.wikipedia.org/wiki/Giant_panda">Panda</TextLink>
              </LinkBox.Raised>{' '}
              and{' '}
              <LinkBox.Raised>
                <TextLink href="https://en.wikipedia.org/wiki/Red_panda">Red Panda</TextLink>
              </LinkBox.Raised>
            </p>
          </Card.Content>
        </Card>
      </LinkBox>
    </div>
  )
}
