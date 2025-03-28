import React from 'react'

import { IconProps } from '../Types'

export const WorkOutline = ({
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
    data-title="WorkOutline"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path d="m16.86,15.21H7.14c-.53,0-.97.44-.97.97s.44.97.97.97h9.72c.53,0,.97-.44.97-.97s-.44-.97-.97-.97Z"/><path d="m19.64,6.17h-2.5v-1.81c0-.62-.25-1.22-.69-1.67-.45-.45-1.05-.69-1.67-.69h-5.56c-.62,0-1.22.25-1.67.69-.45.44-.69,1.05-.69,1.67v1.81h-2.5c-1.3,0-2.36,1.05-2.36,2.36v11.11c0,1.31,1.05,2.36,2.36,2.36h15.28c1.3,0,2.36-1.05,2.36-2.36v-11.11c0-1.31-1.05-2.36-2.36-2.36Zm.41,2.36v11.11c0,.23-.19.41-.41.41H4.36c-.23,0-.41-.19-.41-.41v-11.11c0-.23.19-.41.41-.41h15.28c.23,0,.41.19.41.41Zm-11.25-4.17c0-.11.04-.22.12-.29.08-.07.19-.12.29-.12h5.56c.11,0,.22.04.29.12.08.08.12.19.12.29v1.81h-6.39v-1.81h0Z"/><path d="m16.86,11.03H7.14c-.53,0-.97.44-.97.97s.44.97.97.97h9.72c.53,0,.97-.44.97-.97s-.44-.97-.97-.97Z"/>',
    }}
  />
)

WorkOutline.displayName = 'WorkOutline'

export const tags = ['WorkOutline', '']
