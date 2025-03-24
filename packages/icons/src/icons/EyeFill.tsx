import React from 'react'

import { IconProps } from '../Types'

export const EyeFill = ({
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
    data-title="EyeFill"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="m22,12c0-.39-.14-.76-.4-1.05-1.62-1.77-5.3-5.2-9.6-5.2s-7.98,3.44-9.6,5.2c-.26.29-.4.66-.4,1.05s.14.76.4,1.05c1.62,1.77,5.3,5.2,9.6,5.2s7.98-3.44,9.6-5.2c.26-.29.4-.66.4-1.05Zm-12.31,0c0-1.29,1.04-2.34,2.31-2.34s2.31,1.05,2.31,2.34-1.04,2.34-2.31,2.34-2.31-1.05-2.31-2.34Zm2.31-3.91c-2.13,0-3.85,1.75-3.85,3.91s1.73,3.91,3.85,3.91,3.85-1.75,3.85-3.91-1.73-3.91-3.85-3.91Z"/>',
    }}
  />
)

EyeFill.displayName = 'EyeFill'

export const tags = ['EyeFill', '']
