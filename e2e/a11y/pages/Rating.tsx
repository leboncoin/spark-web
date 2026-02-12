import { Rating } from '@spark-ui/components/rating'
import React from 'react'

export const A11yRating = () => (
  <section>
    <Rating defaultValue={3} aria-label="User score of 3 out of 5" />
    <Rating defaultValue={3} aria-label="User score of 3 out of 5" disabled />
    <Rating defaultValue={3} aria-label="User score of 3 out of 5" readOnly />
  </section>
)
