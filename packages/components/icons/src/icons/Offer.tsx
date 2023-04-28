import React, { type Ref } from 'react'

import { IconProps } from '../Types'

export const Offer = React.forwardRef(
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
          '<path fill-rule="evenodd" clip-rule="evenodd" d="M11.7003 14.5484C11.8933 14.6857 12.1007 14.8306 12.3152 14.9678C13.3544 15.6533 15.0646 15.7253 16.009 15.7308L16.3175 15.7306L16.3607 15.7186C16.4099 15.71 16.4604 15.7116 16.509 15.7235L16.4555 15.7305C16.8202 15.7305 17.7355 14.8229 18.3647 13.9993C18.432 13.9174 18.5274 13.8679 18.6293 13.862C19.0912 13.8126 19.5438 14.0236 19.8235 14.4187C20.0588 14.7332 20.0588 15.1796 19.8235 15.4941L16.9632 19.3835C16.5742 19.9023 15.9842 20.2029 15.3614 20.1995H11.736C11.359 20.2082 10.9906 20.079 10.692 19.8335C9.05451 18.4455 5.37905 18.3082 5.3433 18.3082C5.15145 18.3 5.00003 18.1317 5.00003 17.9269V14.4187C4.99796 14.2575 5.0931 14.113 5.23604 14.0603C6.11592 13.7751 7.01468 13.561 7.9247 13.4197C9.65517 13.107 10.6491 13.801 11.7003 14.5484ZM8.04626 14.1747C7.26142 14.3017 6.48332 14.4722 5.71514 14.6857V17.5913C6.71623 17.6523 9.61941 17.9498 11.1425 19.2386C11.3129 19.376 11.5226 19.4461 11.736 19.4369H15.3614C15.767 19.4376 16.15 19.2376 16.3983 18.8954L19.2585 15.006C19.2867 14.9738 19.2867 14.9238 19.2585 14.8916C19.2401 14.8691 19.2256 14.8432 19.2156 14.8153C19.1062 14.6952 18.9578 14.6242 18.8009 14.617C18.5022 14.9851 17.8287 15.7765 17.1841 16.199C17.4009 16.4981 17.4867 16.89 17.3886 17.275C17.1409 18.0233 15.4966 18.1531 14.3778 18.1531H12.4482C12.3795 18.1546 12.3117 18.1361 12.253 18.0997L9.92547 16.71C9.79489 16.65 9.70929 16.5196 9.70485 16.3739C9.7004 16.2282 9.77788 16.0927 9.90455 16.0246C10.0312 15.9564 10.185 15.9676 10.3009 16.0533L12.5533 17.3896H14.055C15.2788 17.3896 16.5252 17.2292 16.6904 17.0078C16.8253 16.8268 16.4641 16.5694 16.3233 16.4813C15.4322 16.5028 13.2726 16.4946 11.9291 15.6161C11.7074 15.4712 11.5 15.3263 11.2998 15.1814C10.2916 14.4721 9.49785 13.923 8.04626 14.1747ZM16.2941 4.56699L16.2919 4.63165L15.9209 7.9704C16.1323 8.44728 16.25 8.97632 16.25 9.53328C16.25 11.6372 14.5711 13.3428 12.5 13.3428C10.4289 13.3428 8.75 11.6372 8.75 9.53328C8.75 8.9461 8.88077 8.38994 9.11435 7.89322L8.75261 4.63165C8.71828 4.32259 9.02918 4.10963 9.28609 4.23797L9.34017 4.27078L11.5322 5.85183C11.841 5.76829 12.1654 5.72376 12.5 5.72376C12.8464 5.72376 13.1818 5.77146 13.5002 5.86075L15.7043 4.27078L15.7584 4.23797C15.997 4.11879 16.2821 4.2939 16.2941 4.56699ZM12.5 6.48567C10.8431 6.48567 9.5 7.85013 9.5 9.53328H9.49925H11C11.2071 9.53328 11.375 9.70384 11.375 9.91424C11.375 10.1013 11.2423 10.2568 11.0674 10.2891L11 10.2952L9.59466 10.2958C9.66323 10.5662 9.76741 10.8221 9.90183 11.0579L10.625 11.0571C10.8321 11.0571 11 11.2277 11 11.438C11 11.6251 10.8673 11.7806 10.6924 11.8129L10.625 11.819L10.5164 11.8197C11.0452 12.2935 11.7396 12.5809 12.5 12.5809C13.2604 12.5809 13.9548 12.2935 14.4836 11.8197L14.375 11.819C14.1679 11.819 14 11.6484 14 11.438C14 11.251 14.1327 11.0955 14.3076 11.0632L14.375 11.0571L15.0982 11.0579C15.2326 10.8221 15.3368 10.5662 15.4053 10.2958L14 10.2952C13.7929 10.2952 13.625 10.1246 13.625 9.91424C13.625 9.72722 13.7577 9.57168 13.9326 9.53942L14 9.53328L15.5 9.53405C15.5 9.53379 15.5 9.53354 15.5 9.53328C15.5 7.85013 14.1569 6.48567 12.5 6.48567ZM15.4528 5.39574L14.3293 6.20696C14.6852 6.40943 15.0054 6.66916 15.2776 6.97388L15.4528 5.39574ZM9.59168 5.39574L9.76246 6.9297C10.0323 6.63699 10.3472 6.38758 10.6958 6.19285L9.59168 5.39574Z"/>',
      }}
    />
  )
)

export const tags = ['offer', 'criteria', 'animals']
