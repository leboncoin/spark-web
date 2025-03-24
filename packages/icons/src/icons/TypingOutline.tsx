import React from 'react'

import { IconProps } from '../Types'

export const TypingOutline = ({
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
    data-title="TypingOutline"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path d="m16.68,8.93c.75,0,1.42.66,1.42,1.41s-.67,1.41-1.42,1.41-1.42-.66-1.42-1.41.67-1.41,1.42-1.41Zm-4.63,2.82c.75,0,1.42-.66,1.42-1.41,0-.83-.67-1.41-1.42-1.41s-1.42.66-1.42,1.41.67,1.41,1.42,1.41Zm-4.57,0c.75,0,1.42-.66,1.42-1.41,0-.83-.67-1.41-1.42-1.41s-1.42.66-1.42,1.41.67,1.41,1.42,1.41Z"/><path fill-rule="evenodd" d="m2,6.13c0-2.31,1.88-4.13,4.18-4.13h11.57c2.35,0,4.25,1.89,4.25,4.23v14.77c0,.38-.21.73-.56.89s-.75.13-1.05-.09l-3.67-2.74H6.26c-2.33,0-4.24-1.87-4.25-4.2-.01-2.55-.02-6.1-.01-8.73Zm4.18-2.13c-1.21,0-2.17.95-2.17,2.13,0,2.62,0,6.17.01,8.71,0,1.22,1,2.21,2.24,2.21h10.79c.22,0,.43.07.6.2l2.33,1.74V6.23c0-1.23-1-2.23-2.24-2.23H6.18Z"/>',
    }}
  />
)

TypingOutline.displayName = 'TypingOutline'

export const tags = ['TypingOutline', '']
