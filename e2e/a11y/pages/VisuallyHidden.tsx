import { VisuallyHidden } from '@spark-ui/components/visually-hidden'
import { Check } from '@spark-ui/icons/Check'
import React from 'react'

export const A11yVisuallyHidden = () => (
  <section>
    <div>
      <button style={{ width: 24, height: 24 }}>
        <i className="text-on-surface">
          <Check />
        </i>
        <VisuallyHidden>Checkmark</VisuallyHidden>
      </button>
    </div>
  </section>
)
