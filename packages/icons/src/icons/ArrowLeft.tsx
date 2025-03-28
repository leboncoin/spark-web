import React from 'react'

import { IconProps } from '../Types'

export const ArrowLeft = ({
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
    data-title="ArrowLeft"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="m8.54,6.28c.4.38.41,1.01.03,1.4l-3.22,3.33h15.65c.55,0,1,.44,1,.99s-.45.99-1,.99H5.35l3.22,3.33c.38.4.37,1.02-.03,1.4-.4.38-1.03.37-1.41-.03l-4.85-5.01c-.37-.38-.37-.99,0-1.37l4.85-5.01c.38-.4,1.02-.41,1.41-.03Z"/>',
    }}
  />
)

ArrowLeft.displayName = 'ArrowLeft'

export const tags = ['ArrowLeft', '']
