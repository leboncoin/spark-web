import { FavoriteOutline } from '@spark-ui/icons/FavoriteOutline'
import { Icon } from '@spark-ui/components/icon'
import { IconButton } from '@spark-ui/components/icon-button'
import { LinkBox } from '@spark-ui/components/link-box'
import { TextLink } from '@spark-ui/components/text-link'
import React from 'react'

export const A11yLinkBox = () => (
  <section>
    <div>
      <LinkBox asChild>
        <article className="space-y-md">
          <div className="bg-neutral relative aspect-square w-full overflow-hidden rounded-md shadow-md">
            <img className="size-full" src="https://picsum.photos/200/200" alt="Card image" />

            <LinkBox.Raised>
              <IconButton shape="pill" aria-label="Like" className="bottom-md right-md !absolute">
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
  </section>
)
