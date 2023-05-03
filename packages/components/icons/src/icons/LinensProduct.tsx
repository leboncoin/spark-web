import React, { type Ref } from 'react'

import { IconProps } from '../Types'

export const LinensProduct = React.forwardRef(
  (
    { title, fill = 'currentColor', stroke = 'none', ...props }: IconProps,
    ref: Ref<SVGSVGElement>
  ) => (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
      dangerouslySetInnerHTML={{
        __html:
          (title === undefined ? '' : `<title>${title}</title>`) +
          '<path fill-rule="evenodd" clip-rule="evenodd" d="M17 5.19995C17.8284 5.19995 18.5 5.85974 18.5 6.67364H19.625C19.8321 6.67364 20 6.83858 20 7.04206C20 7.22292 19.8673 7.37335 19.6924 7.40454L19.625 7.41048H18.5V18.8315C18.5 19.0124 18.3673 19.1628 18.1924 19.194L18.125 19.2H9.125C8.91789 19.2 8.75 19.035 8.75 18.8315V12.5684H6.125C5.94091 12.5684 5.78779 12.438 5.75604 12.2662L5.75 12.2V7.40974L5.375 7.41048C5.16789 7.41048 5 7.24553 5 7.04206C5 6.86119 5.13266 6.71077 5.30759 6.67957L5.375 6.67364L5.78675 6.6729L5.81613 6.55537C6.03339 5.77417 6.76094 5.19995 7.625 5.19995H17ZM17 5.93679L9.12522 5.9369C9.28903 6.15119 9.40638 6.40172 9.46258 6.67406L9.5 6.67364V18.4631H10.25V18.0947C10.25 17.8912 10.4179 17.7263 10.625 17.7263C10.8091 17.7263 10.9622 17.8566 10.994 18.0285L11 18.0947V18.4631H11.75V18.0947C11.75 17.8912 11.9179 17.7263 12.125 17.7263C12.3091 17.7263 12.4622 17.8566 12.494 18.0285L12.5 18.0947V18.4631H13.25V18.0947C13.25 17.8912 13.4179 17.7263 13.625 17.7263C13.8091 17.7263 13.9622 17.8566 13.994 18.0285L14 18.0947V18.4631H14.75V18.0947C14.75 17.8912 14.9179 17.7263 15.125 17.7263C15.3091 17.7263 15.4622 17.8566 15.494 18.0285L15.5 18.0947V18.4631H16.25V18.0947C16.25 17.8912 16.4179 17.7263 16.625 17.7263C16.8091 17.7263 16.9622 17.8566 16.994 18.0285L17 18.0947V18.4631H17.75V6.67364C17.75 6.29576 17.4605 5.98431 17.0875 5.94175L17 5.93679ZM8.75 7.40974H6.5V11.8315H7.25V11.4631C7.25 11.2596 7.41789 11.0947 7.625 11.0947C7.80909 11.0947 7.96221 11.225 7.99396 11.3969L8 11.4631V11.8315H8.75V7.40974ZM7.625 5.93679C7.13537 5.93679 6.7188 6.2441 6.56421 6.6731L8.6855 6.6729L8.64587 6.57701C8.46713 6.19894 8.07723 5.93679 7.625 5.93679Z"/>',
      }}
    />
  )
)

LinensProduct.displayName = 'LinensProduct'

export const tags = ['linens_product', 'criteria', 'house']
