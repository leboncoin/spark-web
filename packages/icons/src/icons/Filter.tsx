import React from 'react'

import { IconProps } from '../Types'

export const Filter = ({
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
    data-title="Filter"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="m3,7.94h9.31c.45,1.48,1.82,2.56,3.43,2.56s2.98-1.08,3.43-2.56h1.83c.55,0,1-.45,1-1.01s-.45-1.01-1-1.01h-1.79c-.41-1.54-1.81-2.67-3.46-2.67s-3.05,1.13-3.46,2.67H3c-.55,0-1,.45-1,1.01s.45,1.01,1,1.01Zm12.74-2.67c-.88,0-1.59.72-1.59,1.6s.71,1.6,1.59,1.6,1.59-.72,1.59-1.6-.71-1.6-1.59-1.6Zm5.26,10.78h-9.31c-.45-1.48-1.82-2.56-3.43-2.56s-2.98,1.08-3.43,2.56h-1.83c-.55,0-1,.45-1,1.01s.45,1.01,1,1.01h1.79c.41,1.54,1.81,2.67,3.46,2.67s3.05-1.13,3.46-2.67h9.28c.55,0,1-.45,1-1.01s-.45-1.01-1-1.01Zm-12.74,2.67c.88,0,1.59-.72,1.59-1.6s-.71-1.6-1.59-1.6-1.59.72-1.59,1.6.71,1.6,1.59,1.6Z"/>',
    }}
  />
)

Filter.displayName = 'Filter'

export const tags = ['Filter', '']
