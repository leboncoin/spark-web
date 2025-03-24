import React from 'react'

import { IconProps } from '../Types'

export const Directory = ({
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
    data-title="Directory"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path d="M9.8 6.5h11.12c.6 0 1.08-.48 1.08-1.08s-.48-1.08-1.08-1.08h-11.12c-.6 0-1.08.48-1.08 1.08s.48 1.08 1.08 1.08ZM3.92 16.65c-1.06 0-1.92.86-1.92 1.92s.86 1.92 1.92 1.92 1.92-.86 1.92-1.92-.86-1.92-1.92-1.92ZM20.92 10.91h-11.12c-.6 0-1.08.48-1.08 1.08s.48 1.08 1.08 1.08h11.12c.6 0 1.08-.48 1.08-1.08s-.48-1.08-1.08-1.08ZM20.92 17.5h-11.12c-.6 0-1.08.48-1.08 1.08s.48 1.08 1.08 1.08h11.12c.6 0 1.08-.48 1.08-1.08s-.48-1.08-1.08-1.08ZM3.92 3.5c-1.06 0-1.92.86-1.92 1.92s.86 1.92 1.92 1.92 1.92-.86 1.92-1.92-.86-1.92-1.92-1.92ZM3.92 10.07c-1.06 0-1.92.86-1.92 1.92s.86 1.92 1.92 1.92 1.92-.86 1.92-1.92-.86-1.92-1.92-1.92Z"/>',
    }}
  />
)

Directory.displayName = 'Directory'

export const tags = ['Directory', '']
