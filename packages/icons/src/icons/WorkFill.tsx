import React from 'react'

import { IconProps } from '../Types'

export const WorkFill = ({
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
    data-title="WorkFill"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="m15.53,4.17v2.08h1.49v.75c-.08.42-.41.75-.83.75H7.73c-.41,0-.75-.33-.75-.75v-.75h1.41v-2.08c0-.25.08-.42.25-.5.08-.17.25-.25.5-.25h5.64c.25,0,.41.08.5.25.17.17.25.33.25.5Zm-8.55,2.08v-2.08c0-.58.25-1.08.66-1.5.33-.42.91-.67,1.49-.67h5.73c.58,0,1.08.25,1.49.67.41.42.66.92.66,1.5v2.08h2.74c1.16,0,2.16,1,2.24,2.17v11.42c0,1.17-1,2.17-2.16,2.17H4.16c-1.16,0-2.16-1-2.16-2.17v-11.42c0-1.17,1-2.17,2.16-2.17h2.82Zm0,10.75h9.96c.41,0,.75-.33.75-.75s-.33-.75-.75-.75H6.98c-.41,0-.75.33-.75.75s.33.75.75.75Zm0-4.25h9.96c.41,0,.75-.33.75-.75s-.33-.75-.75-.75H6.98c-.41,0-.75.33-.75.75s.33.75.75.75Z"/><path d="m7.73,7.75h8.46c.41,0,.75-.33.83-.75v-.75H6.98v.75c0,.42.33.75.75.75Z"/>',
    }}
  />
)

WorkFill.displayName = 'WorkFill'

export const tags = ['WorkFill', '']
