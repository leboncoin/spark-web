import React from 'react'

import { IconProps } from '../Types'

export const MoreMenuVertical = ({
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
    data-title="MoreMenuVertical"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path d="m12,6.62c1.24,0,2.25-1.03,2.25-2.31s-1.01-2.31-2.25-2.31-2.25,1.03-2.25,2.31,1.01,2.31,2.25,2.31Zm0,7.69c1.24,0,2.25-1.03,2.25-2.31s-1.01-2.31-2.25-2.31-2.25,1.03-2.25,2.31,1.01,2.31,2.25,2.31Zm0,7.69c1.24,0,2.25-1.03,2.25-2.31s-1.01-2.31-2.25-2.31-2.25,1.03-2.25,2.31,1.01,2.31,2.25,2.31Z"/>',
    }}
  />
)

MoreMenuVertical.displayName = 'MoreMenuVertical'

export const tags = ['MoreMenuVertical', '']
