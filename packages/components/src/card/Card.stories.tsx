import { Divider } from '@spark-ui/components/divider'
import { Icon } from '@spark-ui/components/icon'
import { IconButton } from '@spark-ui/components/icon-button'
import { LinkBox } from '@spark-ui/components/link-box'
import { Skeleton } from '@spark-ui/components/skeleton'
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
const designs: CardProps['design'][] = ['filled', 'tinted', 'outlined']

export const Default: StoryObj = {
  render: _args => {
    return (
      <Card className="max-w-sz-320">
        <Card.Backdrop />
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

export const Backdrop: StoryFn = _args => {
  return (
    <div className="gap-lg flex flex-wrap">
      <div>
        <Tag className="mb-md">Default</Tag>
        <Card className="min-w-sz-160">
          <Card.Backdrop />
          <Card.Content className="gap-md flex flex-col items-start">
            <Skeleton label="Loading..." className="gap-xl flex w-full flex-col">
              <Skeleton.Line lines={3} />
            </Skeleton>
          </Card.Content>
        </Card>
      </div>
      <div>
        <Tag className="mb-md">Animation: slideRight</Tag>
        <Card className="min-w-sz-160">
          <Card.Backdrop animation="slideRight" />
          <Card.Content className="gap-md flex flex-col items-start">
            <Skeleton label="Loading..." className="gap-xl flex w-full flex-col">
              <Skeleton.Line lines={3} />
            </Skeleton>
          </Card.Content>
        </Card>
      </div>
    </div>
  )
}

export const DesignAndIntentTable: StoryFn = _args => {
  const [withShadows, setWithShadows] = useState(true)
  const [withBackdrop, setWithBackdrop] = useState(true)
  const [disabled, setDisabled] = useState(false)

  return (
    <div className="gap-lg flex flex-col">
      <div className="gap-lg flex flex-wrap">
        <Switch checked={withShadows} onCheckedChange={setWithShadows}>
          With shadow
        </Switch>
        <Divider orientation="vertical" />
        <Switch checked={withBackdrop} onCheckedChange={setWithBackdrop}>
          With backdrop
        </Switch>
        <Divider orientation="vertical" />
        <Switch checked={disabled} onCheckedChange={setDisabled}>
          Disabled (only for button cards)
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
                  <Card
                    intent={intent}
                    design={design}
                    className={cx('w-sz-208', withShadows && 'shadow-md')}
                    asChild
                  >
                    <button type="button" className="text-left" disabled={disabled}>
                      {withBackdrop && <Card.Backdrop intent={intent} />}
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
    <Card className="min-w-sz-160 shadow-md">
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
    <Card asChild className="min-w-sz-160 shadow-md">
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
        <Card className="min-w-sz-160 shadow-md">
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
