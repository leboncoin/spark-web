import React from 'react'

import { IconProps } from '../Types'

export const Block = ({
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
    data-title="Block"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="m4.84,18.98s.05.07.08.1.06.06.1.08c1.8,1.76,4.26,2.84,6.98,2.84,5.52,0,10-4.48,10-10,0-2.71-1.08-5.18-2.84-6.98-.03-.03-.06-.07-.09-.1-.03-.03-.06-.06-.1-.09-1.8-1.76-4.26-2.84-6.98-2.84C6.48,2,2,6.48,2,12c0,2.72,1.08,5.18,2.84,6.98Zm-.84-6.98c0-4.42,3.58-8,8-8,1.85,0,3.55.63,4.91,1.68l-11.23,11.23c-1.05-1.35-1.68-3.06-1.68-4.91Zm14.32-4.91c1.05,1.35,1.68,3.06,1.68,4.91,0,4.42-3.58,8-8,8-1.85,0-3.55-.63-4.91-1.68l11.23-11.23Z"/>',
    }}
  />
)

Block.displayName = 'Block'

export const tags = ['Block', '']
