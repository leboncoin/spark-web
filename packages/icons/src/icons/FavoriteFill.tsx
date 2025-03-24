import React from 'react'

import { IconProps } from '../Types'

export const FavoriteFill = ({
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
    data-title="FavoriteFill"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="m8.28,20.41c.48.23,1.01.34,1.55.34h7.69c1.77,0,3.28-1.26,3.55-2.98l.9-5.65c.27-1.71-1.08-3.26-2.84-3.26h-4.72v-3.32c0-1.27-1.05-2.29-2.34-2.29-.85,0-1.63.45-2.04,1.17l-2.99,5.23c-.18.32-.28.67-.28,1.03v7.68c0,.82.48,1.56,1.23,1.91l.29.13ZM3.43,9.91c-.38,0-.74.15-1.01.41-.27.26-.42.62-.42.99v7.21c0,.37.15.73.42.99.27.26.63.41,1.01.41h.71c.4,0,.72-.32.72-.71v-8.61c0-.19-.08-.37-.21-.5-.13-.13-.32-.21-.51-.21h-.71Z"/>',
    }}
  />
)

FavoriteFill.displayName = 'FavoriteFill'

export const tags = ['FavoriteFill', '']
