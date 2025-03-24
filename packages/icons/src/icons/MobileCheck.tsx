import React from 'react'

import { IconProps } from '../Types'

export const MobileCheck = ({
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
    data-title="MobileCheck"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path d="m9.98,19.86h-3.23c-.31,0-.56-.26-.56-.57v-.57h3.79c.58,0,1.05-.47,1.05-1.06s-.47-1.06-1.05-1.06h-3.79V7.36h9.2v7.06c0,.58.47,1.06,1.05,1.06s1.05-.47,1.05-1.06V4.68c0-1.48-1.19-2.68-2.67-2.68H6.75c-1.47,0-2.67,1.2-2.67,2.68v14.61c0,1.48,1.19,2.68,2.67,2.68h3.23c.58,0,1.05-.47,1.05-1.06s-.47-1.06-1.05-1.06Zm5.41-14.61H6.19v-.57c0-.32.26-.57.56-.57h8.08c.31,0,.56.26.56.57v.57Z"/><path d="m19.61,15.74l-.17-.17-.02.02c-.41-.25-.94-.2-1.29.16l-3.69,3.71-1.18-1.18c-.41-.42-1.08-.42-1.48,0-.41.42-.41,1.08,0,1.49l1.92,1.93s.11.1.17.13c.41.27.96.22,1.32-.13h0s4.41-4.45,4.41-4.45c.41-.42.41-1.08,0-1.49v-.02Z"/>',
    }}
  />
)

MobileCheck.displayName = 'MobileCheck'

export const tags = ['MobileCheck', '']
