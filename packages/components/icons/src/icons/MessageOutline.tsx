import { IconProps } from '../Types'

export const MessageOutline = ({
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
        '<path fill-rule="evenodd" clip-rule="evenodd" d="M2.00215 7.1766C2.00836 4.84123 3.90176 3 6.21568 3H17.7173C20.082 3 22 4.91533 22 7.28117V21.9844C22 22.3687 21.7831 22.72 21.4396 22.8923C21.0961 23.0645 20.6847 23.0281 20.3768 22.7982L16.7128 20.0628H6.29652C3.94283 20.0628 2.02704 18.1657 2.01701 15.8073C2.00628 13.2824 1.99524 9.77972 2.00215 7.1766ZM6.21568 5.03121C4.99994 5.03121 4.03653 5.98772 4.03336 7.182C4.02646 9.77752 4.03747 13.2741 4.04821 15.7987C4.05346 17.0339 5.05648 18.0315 6.29652 18.0315H17.0501C17.2691 18.0315 17.4822 18.1023 17.6577 18.2333L19.9688 19.9587V7.28117C19.9688 6.03834 18.9614 5.03121 17.7173 5.03121H6.21568ZM16.9006 9.19668L7.09942 9.1967C6.53852 9.1967 6.08382 8.742 6.08382 8.1811C6.08381 7.6202 6.53852 7.16549 7.09942 7.16549L16.9006 7.16547C17.4615 7.16547 17.9162 7.62017 17.9162 8.18107C17.9162 8.74198 17.4615 9.19668 16.9006 9.19668ZM16.9006 12.3821L7.09942 12.3821C6.53852 12.3821 6.08382 11.9274 6.08382 11.3665C6.08381 10.8056 6.53852 10.3509 7.09942 10.3509L16.9006 10.3509C17.4615 10.3509 17.9162 10.8056 17.9162 11.3665C17.9162 11.9274 17.4615 12.3821 16.9006 12.3821ZM6.08382 14.6335C6.08382 14.0726 6.53852 13.6179 7.09942 13.6179H13.6335C14.1944 13.6179 14.6491 14.0726 14.6491 14.6335C14.6491 15.1944 14.1944 15.6491 13.6335 15.6491H7.09942C6.53852 15.6491 6.08382 15.1944 6.08382 14.6335Z"/>',
    }}
  />
)

export const tags = ['message-outline', 'contact']
