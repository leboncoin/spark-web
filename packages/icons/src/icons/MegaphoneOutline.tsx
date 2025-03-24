import React from 'react'

import { IconProps } from '../Types'

export const MegaphoneOutline = ({
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
    data-title="MegaphoneOutline"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="m20.55,2.85c-.26-.04-.54-.01-.79.07L3.6,8.45c-.47.16-.87.46-1.15.85-.29.39-.44.87-.44,1.35v1.49s0,.02,0,.03c.02.47.18.93.46,1.31.29.38.68.67,1.13.82l1.86.64v1.5s0,0,0,0c0,1.2.48,2.36,1.32,3.23.84.87,1.99,1.4,3.21,1.47,1.22.07,2.42-.32,3.36-1.09.63-.52,1.11-1.18,1.4-1.92l5,1.72h0c.25.09.52.11.79.07.26-.04.52-.14.73-.29.22-.15.4-.35.52-.59.12-.23.19-.49.19-.76V4.49h0c0-.27-.07-.53-.19-.76-.12-.23-.3-.44-.52-.59-.22-.15-.47-.25-.73-.29Zm-7.69,14.64l-5.4-1.85v.81c0,.7.28,1.38.77,1.89.49.51,1.16.82,1.87.86.71.04,1.42-.19,1.96-.64.35-.29.62-.65.79-1.06Zm7.14.36V4.92l-15.74,5.39c-.07.03-.14.07-.19.14-.05.06-.07.14-.07.22v1.46c0,.07.03.14.07.2.05.06.11.11.18.13l15.74,5.4Z"/>',
    }}
  />
)

MegaphoneOutline.displayName = 'MegaphoneOutline'

export const tags = ['MegaphoneOutline', '']
