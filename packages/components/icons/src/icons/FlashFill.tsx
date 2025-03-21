import React from 'react'

import { IconProps } from '../Types'

export const FlashFill = ({
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
    data-title="FlashFill"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path d="m12.65,2.58l-7.84,10.42c-.74.92-.08,2.33,1.06,2.33h3.51l-.57,5.09c-.16,1.42,1.63,2.17,2.45,1l7.92-10.5c.74-.92.08-2.25-1.06-2.25h-3.51l.57-5.09c.08-.83-.49-1.42-1.23-1.58h-.41c-.33.08-.65.25-.9.58Z"/>',
    }}
  />
)

FlashFill.displayName = 'FlashFill'

export const tags = ['FlashFill', '']
