import React from 'react'

import { IconProps } from '../Types'

export const PenFill = ({
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
    data-title="PenFill"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="m21.83,5.91c-.08-.25-.25-.5-.5-.67l-2.5-2.5c-.17-.17-.42-.33-.67-.5-.33-.17-.58-.25-.83-.25s-.58.08-.83.17c-.25.08-.5.25-.67.5L4.11,14.31c-.08.08-.17.17-.17.33l-1.91,6.41c-.08.25,0,.5.17.75.25.17.5.25.75.17l6.41-1.83c.08,0,.25-.08.33-.17l11.65-11.73c.17-.17.33-.42.5-.67.08-.33.17-.58.17-.83s-.08-.58-.17-.83Z"/>',
    }}
  />
)

PenFill.displayName = 'PenFill'

export const tags = ['PenFill', '']
