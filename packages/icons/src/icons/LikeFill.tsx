import React from 'react'

import { IconProps } from '../Types'

export const LikeFill = ({
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
    data-title="LikeFill"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="m7.61,3c-3.14,0-5.61,2.8-5.61,6.16,0,2.76,1.4,4.74,1.97,5.5,1.89,2.51,4.43,4.18,6.78,5.72.25.17.51.33.76.5.25.16.56.17.82.01.22-.13.43-.27.65-.4,2.46-1.52,5.12-3.16,7.07-5.79.65-.87,1.95-2.84,1.95-5.54,0-3.36-2.47-6.15-5.61-6.15-1.79,0-3.37.92-4.39,2.33-1.02-1.41-2.6-2.33-4.39-2.33Z"/>',
    }}
  />
)

LikeFill.displayName = 'LikeFill'

export const tags = ['LikeFill', '']
