import React from 'react'

import { IconProps } from '../Types'

export const AllDirection = ({
  title,
  fill = 'currentColor',
  stroke = 'none',
  ref,
  ...props
}: IconProps) => (
  <svg
    ref={ref}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    data-title="AllDirection"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="m11.29,2.29c.39-.39,1.02-.39,1.41,0l2.77,2.77c.39.39.39,1.02,0,1.41-.39.39-1.02.39-1.41,0l-1.06-1.06v5.59h5.59l-1.06-1.06c-.39-.39-.39-1.02,0-1.41.39-.39,1.02-.39,1.41,0l2.77,2.77c.39.39.39,1.02,0,1.41l-2.77,2.77c-.39.39-1.02.39-1.41,0-.39-.39-.39-1.02,0-1.41l1.06-1.06h-5.59v5.59l1.06-1.06c.39-.39,1.02-.39,1.41,0,.39.39.39,1.02,0,1.41l-2.77,2.77c-.39.39-1.02.39-1.41,0l-2.77-2.77c-.39-.39-.39-1.02,0-1.41.39-.39,1.02-.39,1.41,0l1.06,1.06v-5.59h-5.59l1.06,1.06c.39.39.39,1.02,0,1.41-.39.39-1.02.39-1.41,0l-2.77-2.77c-.39-.39-.39-1.02,0-1.41l2.77-2.77c.39-.39,1.02-.39,1.41,0,.39.39.39,1.02,0,1.41l-1.06,1.06h5.59v-5.59l-1.06,1.06c-.39.39-1.02.39-1.41,0-.39-.39-.39-1.02,0-1.41l2.77-2.77Z"/>',
    }}
  />
)

AllDirection.displayName = 'AllDirection'

export const tags = ['AllDirection', '']
