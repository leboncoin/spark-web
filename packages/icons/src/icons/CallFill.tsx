import React from 'react'

import { IconProps } from '../Types'

export const CallFill = ({
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
    data-title="CallFill"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path d="m16.21,2h2.59c1.77,0,3.21,1.4,3.21,3.19v1.37c0,1.8-1.48,3.24-3.27,3.24h-3.13l-1.45,1.08c-.23.17-.53.19-.79.07-.26-.13-.42-.38-.42-.67v-5.02c0-1.8,1.47-3.26,3.27-3.26ZM3.85,5.87c.41-.41.97-.64,1.55-.64s1.14.23,1.55.64h0s2.13,2.17,2.13,2.17c.4.42.62.97.62,1.55s-.22,1.13-.62,1.55h-.01s-.03.05-.04.08c-.01.03-.02.05-.02.08s0,.06.02.08c.01.03.03.05.04.07h0s3.35,3.4,3.35,3.4c.04.04.08.05.13.05s.09-.02.13-.06c.41-.41.97-.64,1.55-.64s1.14.23,1.55.64h0s2.13,2.15,2.13,2.15h.01c.4.43.62.99.62,1.56s-.22,1.13-.62,1.55c0,0-.01.01-.02.02l-.5.49c-.74.75-1.71,1.23-2.75,1.35-1.05.12-2.1-.14-2.99-.72h-.02c-3.52-2.42-6.55-5.5-8.94-9.07,0,0,0-.01-.01-.02-.57-.89-.81-1.95-.7-3,.11-1.05.58-2.03,1.32-2.77l.49-.5s.01-.01.02-.02Z"/>',
    }}
  />
)

CallFill.displayName = 'CallFill'

export const tags = ['CallFill', '']
