import { Rating } from '@spark-ui/components/rating'
import React from 'react'

export const A11yRating = () => (
  <section>
    <div>
      <Rating size="lg" aria-label="Rating control" />
    </div>

    <div>
      <Rating defaultValue={2.24} aria-label="Rating control with rounded value" readOnly />
    </div>
  </section>
)
