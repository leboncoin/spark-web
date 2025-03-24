import React from 'react'

import { IconProps } from '../Types'

export const ForwardFill = ({
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
    data-title="ForwardFill"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path d="m14.78,3.55c-.29-.29-.72-.38-1.09-.22-.37.16-.62.53-.62.94v3.2h-.38c-3.89,0-6.26,2.02-7.77,4.53-1.18,1.94-1.89,4.27-2.47,6.14-.14.46-.27.88-.4,1.28-.14.43.02.91.39,1.16.37.26.86.23,1.21-.07.61-.52,1.14-.99,1.61-1.4,1.16-1.02,1.98-1.75,2.81-2.28,1.06-.68,2.11-1,3.93-1h1.08v3.2c0,.42.25.8.64.95.39.15.82.05,1.1-.26l6.92-7.73c.36-.4.34-1.02-.03-1.4l-6.92-7.03Z"/>',
    }}
  />
)

ForwardFill.displayName = 'ForwardFill'

export const tags = ['ForwardFill', '']
