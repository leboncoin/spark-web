import React from 'react'

import { IconProps } from '../Types'

export const KeyFill = ({
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
    data-title="KeyFill"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="m7.45,13.81c-1,0-1.82-.81-1.82-1.81s.82-1.8,1.82-1.8,1.82.81,1.82,1.8-.82,1.81-1.82,1.81Zm5.14-3.61c-.86-2.43-3.41-4.06-6.25-3.5-2.08.41-3.77,2.07-4.21,4.13-.74,3.49,1.93,6.59,5.33,6.59,2.37,0,4.39-1.51,5.14-3.61h3.95v1.8c0,.99.82,1.81,1.82,1.81s1.82-.81,1.82-1.81v-1.8c1,0,1.82-.81,1.82-1.8s-.82-1.8-1.82-1.8h-7.59Z"/>',
    }}
  />
)

KeyFill.displayName = 'KeyFill'

export const tags = ['KeyFill', '']
