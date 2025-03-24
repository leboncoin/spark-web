import React from 'react'

import { IconProps } from '../Types'

export const EyeOffFill = ({
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
    data-title="EyeOffFill"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path d="M21.04 10.57c-.32-.42-.8-.93-1.36-1.44-.24-.25-.72-.25-.96 0l-8.08 8.16c-.32.25-.32.76 0 1.1.16.17.4.25.64.25h.72c2.08 0 4-.85 5.52-1.95 1.52-1.02 2.8-2.29 3.52-3.14.32-.42.56-.93.56-1.44 0-.61-.16-1.2-.56-1.54ZM20 3.51c-.32-.34-.72-.34-1.04 0l-2.8 3.06c-1.28-.68-2.72-1.1-4.16-1.1-2.08 0-4 .85-5.52 1.95-1.52 1.02-2.8 2.29-3.52 3.14-.32.43-.56.94-.56 1.45s.16 1.1.56 1.44c1.04 1.27 2.32 2.29 3.6 3.23l-2.56 2.72c-.32.34-.32.76 0 1.1.32.34.72.34 1.04 0l14.96-15.97c.32-.25.32-.76 0-1.02Zm-10.4 9.94c-.24-.42-.4-.93-.4-1.44 0-.76.32-1.53.8-2.04.48-.51 1.2-.85 1.92-.85.48 0 .96.17 1.36.42l-3.68 3.91Z"/>',
    }}
  />
)

EyeOffFill.displayName = 'EyeOffFill'

export const tags = ['EyeOffFill', '']
