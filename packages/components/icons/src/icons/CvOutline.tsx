import React from 'react'

import { IconProps } from '../Types'

export const CvOutline = ({
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
    data-title="CvOutline"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path d="m8.47,9.5h2.82c.54,0,.99-.44.99-.97s-.44-.97-.99-.97h-2.82c-.54,0-.99.44-.99.97s.44.97.99.97Zm0,4.17h7.06c.54,0,.99-.44.99-.97s-.44-.97-.99-.97h-7.06c-.54,0-.99.44-.99.97s.44.97.99.97Z"/><path d="m20.47,9.23l-7.07-6.94c-.18-.19-.44-.28-.7-.28h-7.06c-.63,0-1.24.25-1.7.69-.45.44-.7,1.05-.7,1.67v15.28c0,.62.26,1.22.7,1.67.45.45,1.06.69,1.7.69h12.71c.63,0,1.24-.25,1.7-.69.45-.44.7-1.05.7-1.67v-9.72c0-.26-.11-.5-.29-.69h0ZM5.23,4.36c0-.11.04-.22.12-.29.08-.07.19-.12.3-.12h6.65l6.48,6.38v9.32c0,.11-.04.22-.12.29-.08.07-.19.12-.3.12H5.65c-.12,0-.22-.04-.3-.12-.08-.08-.12-.19-.12-.29V4.36Z"/><path d="m8.47,17.83h7.06c.54,0,.99-.44.99-.97s-.44-.97-.99-.97h-7.06c-.54,0-.99.44-.99.97s.44.97.99.97Z"/>',
    }}
  />
)

CvOutline.displayName = 'CvOutline'

export const tags = ['CvOutline', '']
