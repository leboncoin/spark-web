import React from 'react'

import { IconProps } from '../Types'

export const ArrowDoubleRight = ({
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
    data-title="ArrowDoubleRight"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="m10.54,2.29c-.39.39-.39,1.02,0,1.41l8.31,8.29-8.31,8.29c-.39.39-.39,1.02,0,1.41.39.39,1.03.39,1.42,0l8.53-8.51c.16-.15.29-.34.38-.54.09-.21.14-.43.14-.66s-.05-.45-.14-.66c-.09-.2-.22-.39-.38-.54L11.96,2.29c-.39-.39-1.03-.39-1.42,0Zm-7.24,0c-.39.39-.39,1.02,0,1.41l8.33,8.29L3.29,20.29c-.39.39-.39,1.02,0,1.41.39.39,1.03.39,1.42,0l8.56-8.52c.31-.32.49-.74.49-1.18s-.17-.87-.49-1.18h0S4.71,2.29,4.71,2.29c-.39-.39-1.03-.39-1.42,0Z"/>',
    }}
  />
)

ArrowDoubleRight.displayName = 'ArrowDoubleRight'

export const tags = ['ArrowDoubleRight', '']
