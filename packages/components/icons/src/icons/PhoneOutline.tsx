import { IconProps } from '../Types'

export const PhoneOutline = ({
  title,
  fill = 'currentColor',
  stroke = 'currentColor',
  ...props
}: IconProps) => (
  <svg
    viewBox="0 0 24 25"
    xmlns="http://www.w3.org/2000/svg"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" clip-rule="evenodd" d="M4.22152 3.51332C4.68857 3.05607 5.3158 2.80005 5.96898 2.80005C6.62216 2.80005 7.24939 3.05607 7.71644 3.51332L7.72459 3.5213L10.3534 6.15387C10.8103 6.6194 11.0663 7.24603 11.0663 7.89874C11.0663 8.55145 10.8103 9.17805 10.3534 9.64359L10.342 9.65503C10.2991 9.69736 10.265 9.7478 10.2418 9.80343C10.2185 9.85905 10.2066 9.91875 10.2066 9.97906C10.2066 10.0394 10.2185 10.0991 10.2418 10.1547C10.265 10.2103 10.2991 10.2608 10.342 10.3031L10.3473 10.3083L14.4832 14.4499C14.5729 14.5363 14.6925 14.5846 14.8171 14.5846C14.943 14.5846 15.0639 14.5352 15.154 14.4471L15.1521 14.4489C15.617 13.9914 16.2427 13.735 16.8945 13.735C17.5464 13.735 18.1721 13.9914 18.637 14.4489L18.6394 14.4513L21.2759 17.0638L21.2877 17.0757C21.7443 17.5434 22 18.1715 22 18.8256C22 19.4797 21.7443 20.1078 21.2877 20.5755C21.2824 20.5809 21.2771 20.5863 21.2716 20.5916L20.6566 21.1937C19.7841 22.0761 18.6354 22.6318 17.4026 22.7675C16.1666 22.9037 14.9216 22.6095 13.8768 21.9345L13.8594 21.9231C9.53436 19.0006 5.80682 15.2775 2.87724 10.9541C2.87286 10.9476 2.86854 10.9411 2.86431 10.9345C2.19025 9.88824 1.89651 8.64146 2.03246 7.40382C2.16807 6.16933 2.72294 5.01902 3.60407 4.1453L4.20544 3.52942C4.21074 3.52399 4.2161 3.51862 4.22152 3.51332ZM5.63804 4.95241L5.04081 5.56405L5.02807 5.57687C4.47298 6.12536 4.12341 6.84852 4.03814 7.62475C3.95328 8.39732 4.13538 9.17556 4.5539 9.82984C7.33602 13.9329 10.8743 17.4667 14.9789 20.242C15.6325 20.6615 16.4101 20.8441 17.182 20.7591C17.9571 20.6737 18.6793 20.3237 19.227 19.7678L19.2398 19.755L19.8506 19.157C19.9351 19.0675 19.9822 18.9489 19.9822 18.8256C19.9822 18.7015 19.9345 18.5823 19.8491 18.4926L17.2226 15.89L17.2217 15.8891C17.1343 15.8036 17.0169 15.7556 16.8945 15.7556C16.7718 15.7556 16.654 15.8039 16.5664 15.89L16.5646 15.8919C16.0975 16.3491 15.4703 16.6052 14.8171 16.6052C14.1639 16.6052 13.5367 16.3491 13.0696 15.8919L13.0615 15.8839L8.92277 11.7394C8.69074 11.5096 8.50642 11.2362 8.38044 10.9347C8.25394 10.6321 8.18879 10.3072 8.18879 9.97906C8.18879 9.65092 8.25394 9.32606 8.38044 9.02336C8.5055 8.72414 8.68805 8.45247 8.91768 8.22379C9.00157 8.1365 9.04851 8.02002 9.04851 7.89874C9.04851 7.77689 9.00113 7.65987 8.91649 7.57245L6.3029 4.95525C6.21318 4.8689 6.09352 4.82062 5.96898 4.82062C5.84581 4.82062 5.72742 4.86784 5.63804 4.95241Z"/>',
    }}
  />
)

export const tags = ['phone-outline', 'contact']
