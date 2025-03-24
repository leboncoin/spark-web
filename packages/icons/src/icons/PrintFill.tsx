import React from 'react'

import { IconProps } from '../Types'

export const PrintFill = ({
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
    data-title="PrintFill"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path d="m21.61,8.83c-.27-.25-.72-.42-1.08-.42H3.54c-.45,0-.81.17-1.08.42-.27.25-.45.67-.45,1v6.42c0,.42.18.75.45,1,.27.25.72.42,1.08.42h2.26v2.83c0,.42.18.75.45,1,.36.33.72.5,1.18.5h9.22c.45,0,.81-.17,1.08-.42s.45-.67.45-1v-2.83h2.26c.45,0,.81-.17,1.08-.42.27-.25.45-.67.45-1v-6.5c.09-.33-.09-.67-.36-1Zm-4.97,11.67H7.42v-2.83h9.22v2.83Zm1.54-7.75h-1.54c-.45,0-.81-.33-.81-.75s.36-.75.81-.75h1.54c.45,0,.81.33.81.75s-.36.75-.81.75Zm.09-10.17c0-.17-.09-.33-.27-.42-.18-.08-.36-.17-.63-.17H6.7c-.27,0-.45.08-.63.17-.18.17-.27.25-.27.42v4.33h12.47V2.58Z"/>',
    }}
  />
)

PrintFill.displayName = 'PrintFill'

export const tags = ['PrintFill', '']
