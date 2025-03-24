import React from 'react'

import { IconProps } from '../Types'

export const MessageOutline = ({
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
    data-title="MessageOutline"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="m2,6.18c0-2.34,1.9-4.18,4.21-4.18h11.5c2.36,0,4.28,1.92,4.28,4.28v14.7c0,.38-.22.74-.56.91-.34.17-.75.14-1.06-.09l-3.66-2.74H6.3c-2.35,0-4.27-1.9-4.28-4.26-.01-2.52-.02-6.03-.01-8.63Zm4.21-2.15c-1.22,0-2.18.96-2.18,2.15,0,2.6,0,6.09.01,8.62,0,1.24,1.01,2.23,2.25,2.23h10.75c.22,0,.43.07.61.2l2.31,1.73V6.28c0-1.24-1.01-2.25-2.25-2.25H6.22Zm10.68,4.17H7.1c-.56,0-1.02-.45-1.02-1.02,0-.56.45-1.02,1.02-1.02h9.8c.56,0,1.02.45,1.02,1.02s-.45,1.02-1.02,1.02Zm0,3.19H7.1c-.56,0-1.02-.45-1.02-1.02,0-.56.45-1.02,1.02-1.02h9.8c.56,0,1.02.45,1.02,1.02s-.45,1.02-1.02,1.02Zm-10.82,2.25c0-.56.45-1.02,1.02-1.02h6.53c.56,0,1.02.45,1.02,1.02s-.45,1.02-1.02,1.02h-6.53c-.56,0-1.02-.45-1.02-1.02Z"/>',
    }}
  />
)

MessageOutline.displayName = 'MessageOutline'

export const tags = ['MessageOutline', '']
