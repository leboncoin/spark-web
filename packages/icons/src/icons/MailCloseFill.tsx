import React from 'react'

import { IconProps } from '../Types'

export const MailCloseFill = ({
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
    data-title="MailCloseFill"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path d="m7.74,17.33v-8.44c0-1.42-1.2-2.58-2.59-2.76h-.19c-1.67,0-2.96,1.24-2.96,2.76v8.44c0,.27.28.53.56.53h4.63c.37,0,.56-.27.56-.53Zm-1.48-7.38h-2.78c-.37,0-.65-.27-.65-.62s.28-.62.65-.62h2.78c.37,0,.65.27.65.62s-.28.62-.65.62Z"/><path d="m16.44,4H5.15c1.11.09,2.13.44,2.96,1.07.37.27.74.62,1.02,1.07.56.8.93,1.78.93,2.76v8.44c0,.18,0,.36-.09.53-.09.36-.28.71-.56,1.07-.46.62-1.3,1.07-2.22,1.07h12.04c1.57,0,2.78-1.16,2.78-2.67v-8c0-2.93-2.41-5.33-5.56-5.33Zm-3.7,9.07c-.65,0-1.11-.44-1.11-1.07s.46-1.07,1.11-1.07h5.28v3.29c0,.62-.46,1.07-1.11,1.07s-1.11-.44-1.11-1.07v-1.16h-3.06Z"/>',
    }}
  />
)

MailCloseFill.displayName = 'MailCloseFill'

export const tags = ['MailCloseFill', '']
