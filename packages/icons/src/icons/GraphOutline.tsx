import React from 'react'

import { IconProps } from '../Types'

export const GraphOutline = ({
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
    data-title="GraphOutline"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path d="m6.46,5.46c-.55,0-1,.45-1,1s.45,1,1,1h2.77c.55,0,1-.45,1-1s-.45-1-1-1h-2.77Zm-1,4.46c0-.55.45-1,1-1h6.23c.55,0,1,.45,1,1s-.45,1-1,1h-6.23c-.55,0-1-.45-1-1Zm13.63.51c.28-.47.13-1.09-.34-1.37-.47-.28-1.09-.13-1.37.34l-3.65,6.08-4-2.28c-.46-.26-1.04-.12-1.33.31l-2.77,4.15c-.31.46-.18,1.08.28,1.39.46.31,1.08.18,1.39-.28l2.25-3.38,4.04,2.31c.47.27,1.07.11,1.35-.35l4.15-6.92Z"/><path fill-rule="evenodd" d="m19.62,22c1.32,0,2.38-1.07,2.38-2.38V4.38c0-1.32-1.07-2.38-2.38-2.38H4.38c-1.32,0-2.38,1.07-2.38,2.38v15.23c0,1.32,1.07,2.38,2.38,2.38h15.23Zm.38-2.38c0,.21-.17.38-.38.38H4.38c-.21,0-.38-.17-.38-.38V4.38c0-.21.17-.38.38-.38h15.23c.21,0,.38.17.38.38v15.23Z"/>',
    }}
  />
)

GraphOutline.displayName = 'GraphOutline'

export const tags = ['GraphOutline', '']
