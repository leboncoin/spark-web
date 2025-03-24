import React from 'react'

import { IconProps } from '../Types'

export const PrintOutline = ({
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
    data-title="PrintOutline"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="m21.3,8.25c-.44-.44-1.04-.69-1.67-.69h-1.8v-3.89c0-.44-.17-.87-.49-1.18-.32-.32-.74-.49-1.18-.49H7.84c-.44,0-.87.17-1.18.49-.32.32-.49.74-.49,1.18v3.88h-1.8c-.62,0-1.22.25-1.67.69-.44.44-.69,1.04-.69,1.67v6.24c0,.62.25,1.22.69,1.67.44.45,1.04.69,1.67.69h1.8v1.8c0,.44.17.87.49,1.18.32.32.74.49,1.18.49h8.33c.44,0,.87-.17,1.18-.49s.49-.74.49-1.18v-1.8h1.8c.62,0,1.22-.25,1.67-.69.44-.44.69-1.04.69-1.67v-6.24c0-.62-.25-1.22-.69-1.67h0ZM8.12,3.96h7.76v3.6h-7.76v-3.6Zm0,16.09v-3.6h7.76v3.6h-7.76Zm11.92-3.88c0,.11-.04.22-.12.29-.08.08-.18.12-.29.12h-1.8v-1.11c0-.54-.43-.97-.97-.97H7.15c-.54,0-.97.43-.97.97v1.11h-1.8c-.11,0-.22-.04-.29-.12-.07-.07-.12-.18-.12-.29v-6.24c0-.11.04-.22.12-.29.07-.07.18-.12.29-.12h15.26c.11,0,.22.04.29.12.07.08.12.18.12.29v6.24h0Z"/><path fill-rule="evenodd" d="m17.55,11.03h-1.39c-.54,0-.97.43-.97.97s.43.97.97.97h1.39c.54,0,.97-.43.97-.97s-.43-.97-.97-.97Z"/>',
    }}
  />
)

PrintOutline.displayName = 'PrintOutline'

export const tags = ['PrintOutline', '']
