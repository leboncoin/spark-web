import React from 'react'

import { IconProps } from '../Types'

export const NotificationFill = ({
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
    data-title="NotificationFill"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="m7.29,4.45c-.18-1.12.56-2.19,1.68-2.41,1.13-.22,2.22.48,2.48,1.58,1.11.12,2.18.51,3.12,1.14,1.55,1.03,2.62,2.63,2.99,4.45.55,2.76,1.33,4.19,1.99,4.98.53.63.89,1.46.73,2.31-.18.94-.94,1.52-1.87,1.71l-5.05,1c-.04.41-.14.89-.43,1.33-.2.3-.44.56-.73.79-.56.43-1.26.67-1.97.67s-1.4-.23-1.97-.67c-.34-.26-.62-.58-.83-.94l-.96.19c-.94.19-1.86-.07-2.39-.86-.48-.72-.46-1.62-.22-2.4.31-.98.47-2.6-.09-5.36-.37-1.82,0-3.71,1.04-5.25.63-.94,1.47-1.71,2.45-2.24Z"/>',
    }}
  />
)

NotificationFill.displayName = 'NotificationFill'

export const tags = ['NotificationFill', '']
