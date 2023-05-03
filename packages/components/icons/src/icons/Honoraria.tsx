import React, { type Ref } from 'react'

import { IconProps } from '../Types'

export const Honoraria = React.forwardRef(
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
          '<path fill-rule="evenodd" clip-rule="evenodd" d="M17.2978 5.19995C17.4842 5.19995 17.6393 5.33028 17.6714 5.50215L17.6775 5.56837V10.9676C17.6775 11.1711 17.5075 11.336 17.2978 11.336C17.1114 11.336 16.9564 11.2057 16.9242 11.0338L16.9181 10.9676V5.93679H7.8052V18.4631H16.9181V16.9025C16.9181 16.7216 17.0524 16.5712 17.2296 16.54L17.2978 16.5341C17.4842 16.5341 17.6393 16.6644 17.6714 16.8363L17.6775 16.9025V18.8315C17.6775 19.0124 17.5432 19.1628 17.3661 19.194L17.2978 19.2H7.42549C7.23909 19.2 7.08406 19.0696 7.05191 18.8978L7.04579 18.8315L7.04523 16.512L7.034 16.489L4.023 8.46222C3.95925 8.29226 4.03244 8.10633 4.1879 8.01823L4.24994 7.99001L7.04523 7.00227L7.04579 5.56837C7.04579 5.38751 7.18011 5.23708 7.35724 5.20589L7.42549 5.19995H17.2978ZM18.9278 9.43952C19.1345 9.09211 19.5966 8.97542 19.9598 9.1789L20.6174 9.54732C20.9807 9.75079 21.1075 10.1974 20.9008 10.5448L17.7632 15.8178C17.705 15.9155 17.6238 15.9985 17.526 16.0603C16.4677 16.7285 16.2106 16.8632 15.922 16.7015C15.6728 16.5619 15.6326 16.3315 15.6696 15.4835L15.6924 15.0336C15.6985 14.9203 15.732 14.8103 15.7903 14.7123L18.9278 9.43952ZM19.5855 9.80794L16.448 15.0807L16.4321 15.411C16.43 15.4619 16.4283 15.5107 16.4268 15.5575L16.4207 15.862L16.5729 15.7753C16.6856 15.7092 16.8138 15.6314 16.9572 15.5422L17.1057 15.4491L20.2431 10.1764L19.5855 9.80794ZM7.04523 7.78627L4.86578 8.55665L7.04523 14.3663V7.78627ZM15.0196 13.3052C15.2293 13.3052 15.3993 13.4702 15.3993 13.6736C15.3993 13.8545 15.265 14.0049 15.0878 14.0361L15.0196 14.0421H9.70372C9.49402 14.0421 9.32402 13.8771 9.32402 13.6736C9.32402 13.4928 9.45834 13.3423 9.63547 13.3112L9.70372 13.3052H15.0196ZM15.0196 11.0947C15.2293 11.0947 15.3993 11.2596 15.3993 11.4631C15.3993 11.644 15.265 11.7944 15.0878 11.8256L15.0196 11.8315H9.70372C9.49402 11.8315 9.32402 11.6666 9.32402 11.4631C9.32402 11.2822 9.45834 11.1318 9.63547 11.1006L9.70372 11.0947H15.0196ZM11.982 7.41048C12.1917 7.41048 12.3617 7.57543 12.3617 7.7789C12.3617 7.95976 12.2273 8.11019 12.0502 8.14138L11.982 8.14732H9.70372C9.49402 8.14732 9.32402 7.98237 9.32402 7.7789C9.32402 7.59803 9.45834 7.44761 9.63547 7.41641L9.70372 7.41048H11.982Z"/>',
      }}
    />
  )
)

Honoraria.displayName = 'Honoraria'

export const tags = ['honoraria', 'criteria', 'immobilier']
