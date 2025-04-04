import React from 'react'

import { IconProps } from '../Types'

export const MegaphoneMuteOutline = ({
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
    data-title="MegaphoneMuteOutline"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="M20.5 6.06c0-.26-.08-.43-.17-.68-.08-.09-.17-.26-.25-.34l-1.28 1.88v10.48l-5.86-2.05-1.02 1.45.85.26c-.17.34-.34.68-.68.94-.43.34-.85.51-1.36.51l-1.11 1.62c.26.09.43.09.68.09 1.02.09 2.04-.26 2.89-.94.51-.43.94-1.02 1.19-1.62l4.25 1.45c.26.09.43.09.68.09s.43-.09.6-.26.34-.34.42-.51c.09-.17.17-.43.17-.68V6.06ZM11.06 16.55l1.02-1.45 5.87-8.35 1.45-2.05.85-1.28c.17-.26.17-.6.08-.85-.08-.17-.17-.34-.34-.43-.42-.26-1.02-.17-1.27.26l-2.12 3.07-11.74 3.92c-.43.17-.77.43-1.02.77-.17.34-.34.68-.34 1.1v1.28c0 .43.17.77.43 1.11.25.34.59.6.93.68l1.61.51v1.28c0 .85.34 1.7.85 2.39l-1.36 1.87c-.26.43-.17 1.02.25 1.28.18.34.35.34.52.34h.09c.26 0 .51-.17.68-.43l1.28-1.79 1.02-1.45 1.26-1.78Zm-5.61-3.75c-.09 0-.09-.09-.17-.09q-.08-.08-.08-.17v-1.28c0-.09 0-.17.09-.17 0-.09.09-.09.17-.09l9.44-3.24-4.68 6.73-4.77-1.69Zm2.73 3.41v-.68l1.1.34-.85 1.28c-.25-.26-.25-.6-.25-.94Z"/>',
    }}
  />
)

MegaphoneMuteOutline.displayName = 'MegaphoneMuteOutline'

export const tags = ['MegaphoneMuteOutline', '']
