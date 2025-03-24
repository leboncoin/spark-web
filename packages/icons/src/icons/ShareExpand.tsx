import React from 'react'

import { IconProps } from '../Types'

export const ShareExpand = ({
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
    data-title="ShareExpand"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="m21,12.39c-.55,0-1,.45-1,1v6.23c0,.1-.04.2-.12.27s-.17.12-.28.12H4.38c-.1,0-.2-.04-.28-.12-.07-.07-.12-.17-.12-.27V4.39c0-.1.04-.2.12-.28s.17-.12.28-.12h6.23c.55,0,1-.45,1-1s-.45-1-1-1h-6.23c-.63,0-1.24.25-1.68.7-.45.45-.7,1.05-.7,1.68v15.23c0,.63.25,1.24.7,1.68.45.45,1.05.7,1.68.7h15.23c.63,0,1.24-.25,1.68-.7.45-.45.7-1.05.7-1.68v-6.23c0-.55-.45-1-1-1h0Z"/><path fill-rule="evenodd" d="m21.92,2.62c-.1-.24-.3-.44-.54-.54-.12-.05-.25-.07-.38-.07h-4.85c-.55,0-1,.45-1,1s.45,1,1,1h2.43l-7.29,7.29c-.39.39-.39,1.02,0,1.42.39.39,1.02.39,1.42,0l7.29-7.29v2.43c0,.55.45,1,1,1s1-.45,1-1V3.01c0-.13-.02-.26-.08-.38Z"/>',
    }}
  />
)

ShareExpand.displayName = 'ShareExpand'

export const tags = ['ShareExpand', '']
