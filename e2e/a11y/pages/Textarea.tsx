import { Check } from '@spark-ui/icons/Check'
import { PenOutline } from '@spark-ui/icons/PenOutline'
import { Textarea, TextareaGroup } from '@spark-ui/components/textarea'
import React from 'react'

export const A11yTextarea = () => (
  <section>
    <div>
      <Textarea aria-label="Description" placeholder="Describe what you want to sell" rows={2} />
    </div>

    <div>
      <TextareaGroup>
        <TextareaGroup.LeadingIcon>
          <PenOutline />
        </TextareaGroup.LeadingIcon>

        <Textarea aria-label="Message" rows={2} />

        <TextareaGroup.TrailingIcon>
          <Check />
        </TextareaGroup.TrailingIcon>
      </TextareaGroup>
    </div>
  </section>
)
