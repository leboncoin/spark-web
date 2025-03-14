import React from 'react'

import { IconProps } from '../Types'

export const ArrowVerticalLeft = ({
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
    data-title="ArrowVerticalLeft"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="m16.7,2.28c.38.38.4,1.02.03,1.41l-7.69,8.31,7.69,8.31c.37.4.36,1.03-.03,1.41-.38.38-.99.37-1.36-.03l-7.87-8.51c-.15-.16-.27-.34-.35-.54-.08-.21-.12-.43-.12-.65s.04-.44.12-.65c.08-.2.2-.38.35-.54L15.34,2.31c.37-.4.98-.41,1.36-.03Z"/>',
    }}
  />
)

ArrowVerticalLeft.displayName = 'ArrowVerticalLeft'

export const tags = ['ArrowVerticalLeft', '']
