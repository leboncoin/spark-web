import React from 'react'

import { IconProps } from '../Types'

export const ClockFill = ({
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
    data-title="ClockFill"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path d="m12,2C6.47,2,2,6.45,2,11.96s4.47,10.04,10,10.04,10-4.45,10-9.96S17.53,2,12,2Zm4.15,14.82c-.16.16-.41.24-.65.24s-.57-.08-.73-.32l-3.58-4.13c-.16-.16-.24-.4-.24-.65v-3.48c0-.57.41-.97.98-.97s.98.4.98.97v3.08l3.33,3.81c.41.49.33,1.13-.08,1.46Z"/>',
    }}
  />
)

ClockFill.displayName = 'ClockFill'

export const tags = ['ClockFill', '']
