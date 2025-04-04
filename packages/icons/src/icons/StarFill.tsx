import React from 'react'

import { IconProps } from '../Types'

export const StarFill = ({
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
    data-title="StarFill"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path d="m11.04,2.25c-.25.17-.5.42-.67.75l-2.08,4.58-4.74.67c-.33,0-.58.17-.91.33-.25.25-.5.5-.58.83-.08.42-.08.75,0,1.08.08.33.25.67.5.92l3.49,3.49-.83,4.99c-.08.33,0,.67.08,1,.08.33.33.58.58.75.25.17.58.33.91.33s.67-.08.91-.17l4.32-2.33,4.32,2.33c.25.17.58.25.91.17.33,0,.67-.17.91-.33.25-.17.5-.5.58-.75.08-.33.17-.67.08-1l-.83-4.99,3.41-3.58c.25-.25.42-.5.5-.83.08-.33.08-.67,0-1-.08-.33-.25-.58-.5-.83-.25-.25-.58-.33-.83-.42l-4.74-.75-2.16-4.49c-.17-.33-.33-.58-.67-.75-.25-.17-.5-.25-.75-.25h-.33c-.42.08-.67.17-.91.25Z"/>',
    }}
  />
)

StarFill.displayName = 'StarFill'

export const tags = ['StarFill', '']
