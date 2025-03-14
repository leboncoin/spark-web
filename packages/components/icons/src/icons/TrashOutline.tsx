import React from 'react'

import { IconProps } from '../Types'

export const TrashOutline = ({
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
    data-title="TrashOutline"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="m19.94,6.17h-3.83c-.08-1.08-.49-2.08-1.22-2.83-.81-.83-1.87-1.33-3.01-1.33s-2.12.5-2.93,1.33c-.73.75-1.14,1.75-1.22,2.83h-3.75c-.57,0-.98.42-.98,1,0,.5.41,1,.98,1h1.06v11.5c0,.67.24,1.25.65,1.67.41.42.98.67,1.63.67h9.37c.57,0,1.22-.25,1.63-.67.41-.42.65-1.08.65-1.67v-11.58h1.06c.49,0,.98-.42.98-1-.08-.5-.49-.92-1.06-.92Zm-9.69-1.5c.49-.5,1.06-.75,1.71-.75s1.22.25,1.71.75c.41.42.65.92.65,1.5h-4.72c.08-.58.24-1.08.65-1.5Zm6.76,15c0,.08-.08.25-.08.33-.08.08-.16.08-.24.08H7.32c-.08,0-.24-.08-.24-.08-.08-.08-.08-.17-.08-.33v-11.58h10.1v11.58h-.08Z"/>',
    }}
  />
)

TrashOutline.displayName = 'TrashOutline'

export const tags = ['TrashOutline', '']
