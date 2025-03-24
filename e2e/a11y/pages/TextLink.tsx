import { Link as LinkSVG } from '@spark-ui/icons/Link'
import { Icon } from '@spark-ui/components/icon'
import { TextLink } from '@spark-ui/components/text-link'
import React from 'react'

export const A11yTextLink = () => (
  <section>
    <p>
      You should learn more about{' '}
      <TextLink href="https://en.wikipedia.org/wiki/Kitten" target="_blank">
        kitten
      </TextLink>{' '}
      and{' '}
      <TextLink href="https://en.wikipedia.org/wiki/Puppy" target="_blank">
        puppies
      </TextLink>
      .
    </p>

    <p>
      External{' '}
      <TextLink href="https://en.wikipedia.org/wiki/Kitten" target="_blank" className="gap-sm">
        link
        <Icon>
          <LinkSVG />
        </Icon>
      </TextLink>
      .
    </p>
  </section>
)
