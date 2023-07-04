import React, { type Ref } from 'react'

import { IconProps } from '../Types'

export const FlagCo = React.forwardRef(
  ({ title, fill = 'none', stroke = 'none', ...props }: IconProps, ref: Ref<SVGSVGElement>) => (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
      dangerouslySetInnerHTML={{
        __html:
          (title === undefined ? '' : `<title>${title}</title>`) +
          '<path fill="#FF4B55" d="M24 16.282H0V19.8c0 .228.185.413.414.413h23.172A.414.414 0 0 0 24 19.8v-3.518Z"/><path fill="#FFE15A" d="M24 12.351H0V4.903c0-.228.185-.414.414-.414h23.172c.229 0 .414.186.414.414v7.448Z"/><path fill="#41479B" d="M0 12.351h24v3.931H0z"/>',
      }}
    />
  )
)

FlagCo.displayName = 'FlagCo'

export const tags = ['FlagCO', '']
