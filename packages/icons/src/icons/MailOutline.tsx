import React from 'react'

import { IconProps } from '../Types'

export const MailOutline = ({
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
    data-title="MailOutline"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path d="m21.99,12.74v-5.49c-.1-1.81-1.57-3.25-3.37-3.25H5.38c-1.87,0-3.38,1.54-3.38,3.45v9.11c0,1.9,1.52,3.45,3.38,3.45h13.24c1.87,0,3.38-1.54,3.38-3.45v-3.81h0Zm-2.22-5.87c-.06.22-.22.46-.43.63l-3,2.35c-.61.48-1.9,1.38-3.01,2.16-.79.54-1.82.53-2.6-.04-1.76-1.29-4.38-3.22-6.06-4.48-.22-.17-.38-.4-.44-.62-.06-.21-.02-.4.14-.55.27-.25.62-.39,1.01-.39h13.24c.39,0,.74.15,1.01.4.16.14.19.33.14.55Zm-15.89,2.4c1.69,1.27,4.11,3.05,5.75,4.24,1.42,1.04,3.32,1.07,4.76.07,1.1-.76,2.43-1.7,3.1-2.22l2.62-2.06v7.26c0,.84-.67,1.53-1.5,1.53H5.38c-.82,0-1.5-.68-1.5-1.53v-7.28Z"/>',
    }}
  />
)

MailOutline.displayName = 'MailOutline'

export const tags = ['MailOutline', '']
