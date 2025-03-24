import React from 'react'

import { IconProps } from '../Types'

export const BookmarkFill = ({
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
    data-title="BookmarkFill"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path d="m4.5,5.48v15.52c0,.41.25.75.58.91.33.17.74.08,1.07-.17l5.85-4.98,5.85,4.98c.33.25.66.33,1.07.17.33-.17.58-.5.58-.91V5.48c-.08-1.91-1.65-3.48-3.46-3.48H7.88c-1.9,0-3.38,1.58-3.38,3.48Z"/>',
    }}
  />
)

BookmarkFill.displayName = 'BookmarkFill'

export const tags = ['BookmarkFill', '']
