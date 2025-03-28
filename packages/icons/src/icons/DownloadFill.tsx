import React from 'react'

import { IconProps } from '../Types'

export const DownloadFill = ({
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
    data-title="DownloadFill"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="m20.73,9.86c0-.11-.03-.22-.07-.32-.05-.13-.13-.24-.23-.33l-7-6.91c-.1-.09-.21-.17-.34-.22-.12-.05-.25-.08-.39-.08h-7.02c-.65,0-1.27.26-1.73.7-.46.45-.71,1.06-.71,1.7v15.2c0,.64.26,1.25.71,1.7.46.45,1.08.7,1.73.7h12.62c.65,0,1.27-.26,1.73-.7.46-.45.71-1.06.71-1.7v-9.67s0-.04-.02-.07Zm-5.86,6.66l-2.17,2.14c-.1.09-.22.17-.34.22-.12.05-.25.08-.38.08-.27,0-.51-.1-.69-.26,0,0-.02-.02-.03-.03l-2.17-2.14c-.4-.39-.4-1.03,0-1.42.4-.39,1.04-.39,1.44,0l.43.43v-3.63c0-.56.45-1,1.02-1s1.02.44,1.02,1v3.63l.43-.43c.4-.39,1.04-.39,1.44,0,.4.39.4,1.03,0,1.42h0Zm-1.15-7.62v-3.4l3.45,3.4h-3.45Z"/>',
    }}
  />
)

DownloadFill.displayName = 'DownloadFill'

export const tags = ['DownloadFill', '']
