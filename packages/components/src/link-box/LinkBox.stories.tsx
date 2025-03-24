import { FavoriteOutline } from '@spark-ui/icons/FavoriteOutline'
import { Meta, StoryFn } from '@storybook/react'

import { Icon } from '../icon'
import { IconButton } from '../icon-button'
import { TextLink } from '../text-link'
import { LinkBox } from '.'

const meta: Meta<typeof LinkBox> = {
  title: 'Components/LinkBox',
  component: LinkBox,
  tags: ['others'],
}

export default meta

export const Default: StoryFn = _args => (
  <div className="max-w-sz-256">
    <LinkBox className="space-y-md" asChild>
      <article>
        <div className="bg-neutral relative aspect-square w-full overflow-hidden rounded-md shadow-md">
          <img className="size-full" src="https://picsum.photos/200/200" alt="" />
        </div>

        <div className="space-y-0">
          <h2>
            <LinkBox.Link className="text-headline-2 line-clamp-1" href="#">
              Title
            </LinkBox.Link>
          </h2>

          <p className="text-body-1 line-clamp-2">Description</p>
        </div>
      </article>
    </LinkBox>
  </div>
)

export const Nesting: StoryFn = _args => (
  <div className="max-w-sz-256">
    <LinkBox asChild>
      <article className="space-y-md">
        <div className="bg-neutral relative aspect-square w-full overflow-hidden rounded-md shadow-md">
          <img className="size-full" src="https://picsum.photos/200/200" alt="Card image" />

          <LinkBox.Raised>
            <IconButton shape="pill" aria-label="Like" className="bottom-md right-md absolute!">
              <Icon>
                <FavoriteOutline />
              </Icon>
            </IconButton>
          </LinkBox.Raised>
        </div>

        <div className="space-y-0">
          <h2>
            <LinkBox.Link className="text-headline-2 line-clamp-1" href="#">
              Title
            </LinkBox.Link>
          </h2>

          <p className="text-body-1">
            <span>Read about </span>
            <LinkBox.Raised>
              <TextLink href="https://en.wikipedia.org/wiki/Kitten" target="_blank">
                kittens
              </TextLink>
            </LinkBox.Raised>
            <span> and </span>
            <LinkBox.Raised>
              <TextLink href="https://en.wikipedia.org/wiki/Puppy" target="_blank">
                puppies
              </TextLink>
            </LinkBox.Raised>
            <span>. </span>
          </p>
        </div>
      </article>
    </LinkBox>
  </div>
)
