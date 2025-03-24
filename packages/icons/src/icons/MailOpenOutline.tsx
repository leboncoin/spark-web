import React from 'react'

import { IconProps } from '../Types'

export const MailOpenOutline = ({
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
    data-title="MailOpenOutline"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="m17,4H7c-.07,0-.14,0-.21,0-.07,0-.14,0-.21,0-2.53,0-4.58,2.19-4.58,4.89v8.44c0,1.48,1.12,2.67,2.5,2.67h15c1.38,0,2.5-1.19,2.5-2.67v-8c0-2.94-2.24-5.33-5-5.33Zm-7.83,13.33c0,.29-.22.53-.5.53h-4.17c-.28,0-.5-.24-.5-.53v-8c0-1.69,1.23-3.06,2.79-3.17,1.32.12,2.38,1.29,2.38,2.73v8.44Zm10.83,0c0,.29-.23.53-.5.53h-8.38c.03-.17.05-.35.05-.53v-8.44c0-1.02-.29-1.97-.8-2.76h6.63c1.66,0,3,1.43,3,3.2v8Z"/><path fill-rule="evenodd" d="m5.33,8.27c-.55,0-1,.48-1,1.07s.45,1.07,1,1.07h2.5c.55,0,1-.48,1-1.07s-.45-1.07-1-1.07h-2.5Zm7.33,3.73c0,.59.45,1.07,1,1.07h2.75v1.16c0,.59.45,1.07,1,1.07s1-.48,1-1.07v-3.29h-4.75c-.55,0-1,.48-1,1.07Z"/>',
    }}
  />
)

MailOpenOutline.displayName = 'MailOpenOutline'

export const tags = ['MailOpenOutline', '']
