import React from 'react'

import { IconProps } from '../Types'

export const SendFill = ({
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
    data-title="SendFill"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path d="M5.53 11.17h16.47c-.08-.17-.17-.33-.25-.5-.25-.42-.59-.67-1.01-.92L4.86 2.33c-.25-.17-.67-.33-1.09-.33s-.92.17-1.26.5c-.34.33-.5.75-.5 1.25 0 .33.17.75.42 1l3.11 6.42ZM2.42 19.25c-.25.33-.34.67-.34 1.08s.17.92.5 1.25c.34.25.76.42 1.26.42.42 0 .76-.17 1.09-.33l15.8-7.5c.42-.17.76-.5 1.01-.92.08-.17.17-.25.25-.42H5.53l-3.11 6.42Z"/>',
    }}
  />
)

SendFill.displayName = 'SendFill'

export const tags = ['SendFill', '']
