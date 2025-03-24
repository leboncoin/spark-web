import React from 'react'

import { IconProps } from '../Types'

export const MegaphoneMuteFill = ({
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
    data-title="MegaphoneMuteFill"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="M20.16 5.38c-.08-.17-.25-.34-.42-.51-.08-.09-.17-.09-.25-.17l-8.16 11.93 1.43.51c-.17.34-.42.68-.67.94-.34.26-.76.51-1.26.51h-.76l-1.01 1.45c.59.26 1.35.34 2.02.26.76-.09 1.51-.43 2.1-.94.51-.43.93-1.02 1.18-1.7l4.29 1.45c.25.09.42.09.67.09s.42-.09.59-.26c.17-.09.34-.26.42-.51.08-.17.17-.43.17-.6V5.98c-.17-.17-.25-.43-.34-.6ZM10.4 16.38l8-11.68.93-1.28c.17-.26.17-.6.08-.85-.08-.17-.17-.34-.34-.43-.42-.26-1.01-.17-1.26.26l-2.36 3.41-10.6 3.66c-.42.17-.76.34-.93.68-.25.35-.42.77-.42 1.11v1.36c0 .43.17.77.42 1.11s.59.6.93.68l1.6.51v1.28c0 .68.17 1.36.5 1.96l-1.68 2.39c-.25.43-.17 1.02.25 1.28.17.17.34.17.5.17h.08c.25 0 .5-.17.67-.43l1.43-2.05.93-1.36 1.27-1.78Zm-2.36-.17v-.68l.59.17-.5.77c-.09-.09-.09-.18-.09-.26Z"/>',
    }}
  />
)

MegaphoneMuteFill.displayName = 'MegaphoneMuteFill'

export const tags = ['MegaphoneMuteFill', '']
