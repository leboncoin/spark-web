import { Breadcrumb } from '@spark-ui/components/breadcrumb'
import React from 'react'

export const A11yBreadcrumb = () => (
  <section>
    <Breadcrumb aria-label="Breadcrumb">
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
      </Breadcrumb.Item>

      <Breadcrumb.Separator />

      <Breadcrumb.Item>
        <Breadcrumb.Link href="/">Components</Breadcrumb.Link>
      </Breadcrumb.Item>

      <Breadcrumb.Separator />

      <Breadcrumb.Item>
        <Breadcrumb.CurrentPage>Breadcrumb</Breadcrumb.CurrentPage>
      </Breadcrumb.Item>
    </Breadcrumb>
  </section>
)
