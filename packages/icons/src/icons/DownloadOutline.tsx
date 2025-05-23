import React from 'react'

import { IconProps } from '../Types'

export const DownloadOutline = ({
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
    data-title="DownloadOutline"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path d="m11.36,15.89v-3.55c0-.54.44-.98.99-.98s.99.44.99.98v3.55l.42-.42c.39-.38,1.01-.38,1.4,0,.39.38.39,1,0,1.38l-2.12,2.08c-.1.1-.21.17-.33.21-.12.05-.24.07-.37.07-.26,0-.5-.1-.67-.26-.01,0-.02-.02-.03-.03l-2.11-2.08c-.39-.38-.39-1,0-1.38.39-.38,1.01-.38,1.4,0l.42.42Z"/><path fill-rule="evenodd" d="m13.33,2.22s.05.04.08.07l7.05,6.94s.05.06.08.09c.14.17.21.38.21.6v9.72c0,.63-.25,1.23-.7,1.67-.45.44-1.06.69-1.7.69H5.65c-.64,0-1.25-.25-1.7-.69-.45-.44-.7-1.04-.7-1.67V4.36c0-.63.25-1.23.7-1.67.45-.44,1.06-.69,1.7-.69h7.06c.23,0,.45.08.62.22Zm-7.97,1.86c.08-.08.19-.12.3-.12h6.06v5.97c0,.54.44.98.99.98h6.06v8.74c0,.11-.04.21-.12.29-.08.08-.19.12-.3.12H5.65c-.11,0-.22-.04-.3-.12s-.12-.18-.12-.29V4.36c0-.11.04-.21.12-.29Zm12.01,4.87h-3.67v-3.61l3.67,3.61Z"/>',
    }}
  />
)

DownloadOutline.displayName = 'DownloadOutline'

export const tags = ['DownloadOutline', '']
