import React from 'react'

import { IconProps } from '../Types'

export const MegaphoneFill = ({
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
    data-title="MegaphoneFill"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="m22,4.47c0-.26-.07-.52-.19-.75-.12-.23-.29-.43-.51-.58-.22-.15-.46-.25-.72-.29-.26-.04-.53-.02-.78.07L3.58,8.51c-.45.16-.85.44-1.14.82-.29.39-.44.86-.44,1.34v1.52c.02.47.18.92.46,1.29.28.38.68.66,1.12.82l1.88.65v1.52c0,.89.27,1.77.76,2.52.49.75,1.19,1.35,2.01,1.73.83.38,1.74.52,2.65.4.9-.12,1.75-.48,2.45-1.06.63-.52,1.11-1.19,1.39-1.95l5.06,1.74c.25.08.52.11.78.07.26-.04.51-.14.72-.29.22-.15.39-.35.51-.58.13-.23.19-.49.19-.75V4.48h0Zm-9.92,14.12c-.41.34-.92.56-1.45.63-.53.07-1.08-.01-1.57-.24-.49-.22-.9-.58-1.19-1.03-.29-.45-.44-.97-.44-1.5v-.82l5.47,1.88c-.18.42-.45.79-.81,1.07Z"/>',
    }}
  />
)

MegaphoneFill.displayName = 'MegaphoneFill'

export const tags = ['MegaphoneFill', '']
