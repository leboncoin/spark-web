import React from 'react'

import { IconProps } from '../Types'

export const ShareFill = ({
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
    data-title="ShareFill"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path d="m18.23,2c-2.08,0-3.77,1.69-3.77,3.77v.03s-6.92,2.87-6.92,2.87c-.53-.28-1.13-.44-1.78-.44-2.08,0-3.77,1.69-3.77,3.77s1.69,3.77,3.77,3.77c.64,0,1.25-.16,1.78-.44l6.92,2.87s0,.02,0,.03c0,2.08,1.69,3.77,3.77,3.77s3.77-1.69,3.77-3.77-1.69-3.77-3.77-3.77c-1.36,0-2.55.72-3.22,1.8l-5.93-2.46c.29-.53.46-1.15.46-1.8s-.17-1.26-.46-1.8l5.93-2.46c.66,1.08,1.86,1.8,3.22,1.8,2.08,0,3.77-1.69,3.77-3.77s-1.69-3.77-3.77-3.77Z"/>',
    }}
  />
)

ShareFill.displayName = 'ShareFill'

export const tags = ['ShareFill', '']
