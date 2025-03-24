import React from 'react'

import { IconProps } from '../Types'

export const MailFill = ({
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
    data-title="MailFill"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="m21.99,12.74h0v3.81c0,1.9-1.52,3.45-3.38,3.45H5.38c-1.87,0-3.38-1.54-3.38-3.45V7.45c0-1.9,1.52-3.45,3.38-3.45h13.24c1.8,0,3.27,1.44,3.37,3.25v5.49Zm-11.51,1.3l-6.56-5.17c-.44-.35-.52-.99-.18-1.44.34-.45.97-.53,1.41-.19l6.56,5.17c.07.06.17.1.29.1s.22-.04.29-.1l6.56-5.17c.44-.35,1.07-.26,1.41.19.34.45.26,1.09-.18,1.44l-6.56,5.17c-.44.34-.97.52-1.52.52s-1.08-.18-1.52-.52Z"/>',
    }}
  />
)

MailFill.displayName = 'MailFill'

export const tags = ['MailFill', '']
