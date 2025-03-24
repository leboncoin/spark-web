import React from 'react'

import { IconProps } from '../Types'

export const CopyOutline = ({
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
    data-title="CopyOutline"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="m9.26,3.95c-.11,0-.21.04-.29.12-.08.08-.12.18-.12.29v11.8c0,.11.04.21.12.29.08.08.18.12.29.12h8.91c.11,0,.21-.04.29-.12.08-.08.12-.18.12-.29V7.54l-3.55-3.59h-5.77Zm-1.65-1.26c.44-.44,1.03-.69,1.65-.69h6.17c.26,0,.5.1.68.29l4.11,4.17c.18.18.28.43.28.69v9.02c0,.63-.25,1.23-.68,1.67-.44.44-1.03.69-1.65.69h-8.91c-.62,0-1.21-.25-1.65-.69-.44-.44-.68-1.04-.68-1.67V4.36c0-.63.25-1.23.68-1.67Z"/><path fill-rule="evenodd" d="m4.46,6.17c.53,0,.96.44.96.98v12.5c0,.11.04.21.12.29.08.08.18.12.29.12h9.59c.53,0,.96.44.96.98s-.43.98-.96.98H5.83c-.62,0-1.21-.25-1.65-.69-.44-.44-.68-1.04-.68-1.67V7.14c0-.54.43-.98.96-.98Z"/>',
    }}
  />
)

CopyOutline.displayName = 'CopyOutline'

export const tags = ['CopyOutline', '']
