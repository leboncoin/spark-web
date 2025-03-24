import React from 'react'

import { IconProps } from '../Types'

export const QuestionFill = ({
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
    data-title="QuestionFill"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="m12,2C6.48,2,2,6.48,2,12s4.48,10,10,10,10-4.48,10-10S17.52,2,12,2Zm.21,6.87c-.21-.04-.43-.02-.62.06-.2.08-.36.22-.48.4-.12.18-.18.39-.18.6,0,.55-.45,1-1,1s-1-.45-1-1c0-.61.18-1.2.52-1.71.34-.51.82-.9,1.38-1.13.56-.23,1.18-.29,1.78-.18.6.12,1.15.41,1.58.84.43.43.72.98.84,1.58.12.6.06,1.22-.18,1.78-.23.56-.63,1.04-1.13,1.38-.22.15-.46.27-.71.35v.55c0,.55-.45,1-1,1s-1-.45-1-1v-1.38c0-.55.45-1,1-1,.21,0,.42-.06.6-.18.18-.12.32-.29.4-.48s.1-.41.06-.62c-.04-.21-.14-.4-.29-.55-.15-.15-.34-.25-.55-.29Zm-.8,6.77c.17-.12.38-.18.59-.18.28,0,.55.12.75.32.2.2.31.47.32.75,0,.21-.06.42-.18.59-.12.17-.28.31-.48.39-.19.08-.41.1-.61.06-.21-.04-.4-.14-.54-.29-.15-.15-.25-.34-.29-.54-.04-.21-.02-.42.06-.61.08-.19.22-.36.39-.48Z"/>',
    }}
  />
)

QuestionFill.displayName = 'QuestionFill'

export const tags = ['QuestionFill', '']
