import React from 'react'

import { IconProps } from '../Types'

export const ValidFill = ({
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
    data-title="ValidFill"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="m22,12c0,5.52-4.48,10-10,10S2,17.52,2,12,6.48,2,12,2s10,4.48,10,10Zm-4.16-2.87c.36-.42.3-1.05-.12-1.41-.42-.36-1.05-.3-1.41.12l-5.64,6.66-2.24-2.55c-.36-.41-1-.46-1.41-.09-.41.36-.46,1-.09,1.41l2.46,2.8c.16.19.36.34.59.44.23.1.47.15.72.15.24,0,.48-.06.7-.16.22-.1.42-.26.58-.44l5.86-6.91Z"/>',
    }}
  />
)

ValidFill.displayName = 'ValidFill'

export const tags = ['ValidFill', '']
