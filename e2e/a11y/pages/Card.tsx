import { Card } from '@spark-ui/components/card'
import { LinkBox } from '@spark-ui/components/link-box'
import { TextLink } from '@spark-ui/components/text-link'
import React from 'react'

export const A11yCard = () => (
  <section>
    {/* Card */}
    <Card>
      <Card.Backdrop />
      <Card.Content>
        <p>All about pandas</p>
      </Card.Content>
    </Card>
    {/* Card as a button */}
    <Card render={<button type="button" />}>
      <Card.Backdrop />
      <Card.Content>
        <p>All about pandas</p>
      </Card.Content>
    </Card>
    {/* Card as a link */}
    <Card render={<a href="/" />}>
      <Card.Backdrop />
      <Card.Content>
        <p>All about pandas</p>
      </Card.Content>
    </Card>
    {/* Card as a LinkBox */}
    <LinkBox>
      <Card>
        <Card.Content className="gap-md flex flex-col items-start">
          <LinkBox.Link href="#">All about pandas</LinkBox.Link>

          <p>
            Read about{' '}
            <LinkBox.Raised>
              <TextLink href="https://en.wikipedia.org/wiki/Giant_panda">Panda</TextLink>
            </LinkBox.Raised>
          </p>
        </Card.Content>
      </Card>
    </LinkBox>
  </section>
)
