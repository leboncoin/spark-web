import { Tag } from '@spark-ui/components/tag'
import React from 'react'

export const A11yTag = () => (
  <section>
    <div className="gap-md flex flex-row">
      <Tag design="filled">Filled tag</Tag>
      <Tag design="outlined">Outlined tag</Tag>
      <Tag design="tinted">Tinted tag</Tag>
    </div>
  </section>
)
