import { Spinner } from '@spark-ui/components/spinner'
import { Tag } from '@spark-ui/components/tag'
import { AccountOutline } from '@spark-ui/icons/AccountOutline'
import { ShareOutline } from '@spark-ui/icons/ShareOutline'
import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite'
import { useEffect, useState } from 'react'

import { Button } from '../button'
import { Icon } from '../icon'
import { Avatar } from '.'
import avatarImg from './avatar.png'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['data-display'],
}

export default meta

type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  args: {
    size: 'xl',
    isOnline: true,
    username: 'John Doe',
    onlineText: 'Online',
  },
  render: args => (
    <Avatar {...args}>
      <Avatar.User>
        <Avatar.Placeholder />
        <Avatar.Image src={avatarImg} />
      </Avatar.User>

      <Avatar.OnlineBadge />
    </Avatar>
  ),
}

export const WithOnlineStatus: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="xl" isOnline username="John Doe" onlineText="Online">
        <Avatar.User>
          <Avatar.Placeholder />
          <Avatar.Image src={avatarImg} />
        </Avatar.User>
        <Avatar.OnlineBadge />
      </Avatar>
    </div>
  ),
}

export const Actions: StoryFn = () => {
  return (
    <div>
      <div className="gap-xl flex flex-wrap items-end">
        <Avatar size="xl" username="John Doe">
          <Avatar.User>
            <Avatar.Placeholder />
            <Avatar.Image src={avatarImg} />
          </Avatar.User>
          <Avatar.Action ariaLabel="Edit account" />
        </Avatar>

        <Avatar size="xl" username="John Doe">
          <Avatar.User>
            <Avatar.Placeholder />
            <Avatar.Image src={avatarImg} />
          </Avatar.User>
          <Avatar.Action ariaLabel="Share account">
            <Icon>
              <ShareOutline />
            </Icon>
          </Avatar.Action>
        </Avatar>

        <Avatar size="xl" username="John Doe">
          <Avatar.User>
            <Avatar.Placeholder />
            <Avatar.Image src={avatarImg} />
          </Avatar.User>
          <Avatar.Action ariaLabel="Edit account" asChild>
            <Button size="sm" intent="info" design="outlined" className="bg-surface!">
              Edit
            </Button>
          </Avatar.Action>
        </Avatar>
      </div>
    </div>
  )
}

export const AsLink: StoryFn = () => {
  return (
    <div className="gap-xl flex">
      <div className="gap-md flex flex-col">
        <Tag className="flex">Link</Tag>
        <Avatar size="xl" username="John Doe">
          <Avatar.User asChild>
            <a
              href="/iframe.html?id=components-avatar--as-link&viewMode=story"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Avatar.Placeholder />
              <Avatar.Image src={avatarImg} />
            </a>
          </Avatar.User>
        </Avatar>
      </div>

      <div className="gap-md flex flex-col">
        <Tag className="flex">Button</Tag>
        <Avatar size="xl" username="John Doe">
          <Avatar.User asChild>
            <button type="button" onClick={() => alert('clicked')}>
              <Avatar.Placeholder />
              <Avatar.Image src={avatarImg} />
            </button>
          </Avatar.User>
        </Avatar>
      </div>
    </div>
  )
}

export const CustomBorder: StoryFn = () => {
  return (
    <div className="gap-3xl from-main to-support p-xl flex bg-gradient-to-br">
      <Avatar design="circle" username="John Doe" isOnline onlineText="Online">
        <Avatar.User className="border-lg border-surface">
          <Avatar.Placeholder />
          <Avatar.Image src={avatarImg} />
        </Avatar.User>
        <Avatar.OnlineBadge />
      </Avatar>
      <Avatar design="circle" username="John Doe" isOnline onlineText="Online">
        <Avatar.User className="border-lg border-outline">
          <Avatar.Placeholder />
          <Avatar.Image src={avatarImg} />
        </Avatar.User>
        <Avatar.OnlineBadge />
      </Avatar>
    </div>
  )
}

export const Placeholder: StoryFn = () => {
  return (
    <div>
      <div className="gap-xl flex flex-wrap items-start">
        <div className="gap-md flex flex-col">
          <Tag className="flex">Default</Tag>
          <Avatar username="John Doe">
            <Avatar.User>
              <Avatar.Placeholder />
            </Avatar.User>
          </Avatar>
        </div>
        <div className="gap-md flex flex-col">
          <Tag className="flex">Custom - icon</Tag>
          <Avatar username="John Doe">
            <Avatar.User>
              <Avatar.Placeholder className="bg-neutral-container text-on-neutral-container">
                <Icon>
                  <AccountOutline />
                </Icon>
              </Avatar.Placeholder>
            </Avatar.User>
          </Avatar>
        </div>
      </div>
    </div>
  )
}

export const Shapes: StoryFn = () => {
  return (
    <div>
      <div className="gap-xl flex flex-wrap items-start">
        <Avatar design="circle" username="John Doe" isOnline onlineText="Online">
          <Avatar.User>
            <Avatar.Placeholder />
            <Avatar.Image src={avatarImg} />
          </Avatar.User>
          <Avatar.Action ariaLabel="Edit account" />
          <Avatar.OnlineBadge />
        </Avatar>
        <Avatar design="square" username="John Doe" isOnline onlineText="Online">
          <Avatar.User>
            <Avatar.Placeholder />
            <Avatar.Image src={avatarImg} />
          </Avatar.User>
          <Avatar.Action ariaLabel="Edit account" />
          <Avatar.OnlineBadge />
        </Avatar>
      </div>
    </div>
  )
}

export const Sizes: StoryFn = () => {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const

  return (
    <div>
      <div className="gap-xl flex flex-wrap items-start">
        {sizes.map(size => (
          <div key={size} className="gap-lg flex flex-col">
            <Tag className="flex">{size}</Tag>
            <Avatar size={size} username="John Doe" isOnline onlineText="Online">
              <Avatar.User>
                <Avatar.Placeholder />
                <Avatar.Image src={avatarImg} />
              </Avatar.User>
              <Avatar.OnlineBadge />
            </Avatar>
            <Avatar size={size} username="John Doe" isOnline onlineText="Online">
              <Avatar.User>
                <Avatar.Placeholder />
              </Avatar.User>
              <Avatar.OnlineBadge />
            </Avatar>
          </div>
        ))}
      </div>
    </div>
  )
}

export const CustomAction: StoryFn = () => {
  return (
    <div className="gap-xl flex flex-wrap items-end">
      <Avatar size="xl" username="John Doe">
        <Avatar.User>
          <Avatar.Placeholder />
          <Avatar.Image src={avatarImg} />
        </Avatar.User>
        <Avatar.Action ariaLabel="Edit account" asChild>
          <Button size="sm" intent="info" design="outlined" className="bg-surface!">
            Edit
          </Button>
        </Avatar.Action>
      </Avatar>
    </div>
  )
}

export const AlternatingImage: StoryFn = () => {
  const [currentImage, setCurrentImage] = useState<string | undefined>(
    'https://picsum.photos/200?random=1'
  )
  const [isLoading, setIsLoading] = useState(!!currentImage)

  useEffect(() => {
    if (currentImage) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [currentImage])

  const handleLoadNewImage = () => {
    setCurrentImage(`https://picsum.photos/200?random=${Date.now()}`)
  }

  const handleNoImage = () => {
    setCurrentImage(undefined)
  }

  return (
    <div className="gap-xl flex flex-col items-start">
      <div className="gap-md flex">
        <Button onClick={handleLoadNewImage}>Load new image</Button>
        <Button onClick={handleNoImage} design="outlined">
          No image
        </Button>
      </div>
      <Avatar size="xl" username="John Doe">
        <Avatar.User>
          <Avatar.Placeholder>{isLoading ? <Spinner size="sm" /> : null}</Avatar.Placeholder>
          <Avatar.Image
            src={currentImage}
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
          />
        </Avatar.User>
      </Avatar>
    </div>
  )
}
