import { IconProps } from '../Types'

export const MessageFill = ({
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
        '<path fill-rule="evenodd" clip-rule="evenodd" d="M2.00215 6.97665C2.00836 4.64128 3.90176 2.80005 6.21568 2.80005H17.7173C20.082 2.80005 22 4.71538 22 7.08122V21.7844C22 22.1687 21.7831 22.5201 21.4396 22.6923C21.0961 22.8646 20.6847 22.8282 20.3768 22.5983L16.7128 19.8628H6.29652C3.94283 19.8628 2.02704 17.9658 2.01701 15.6073C2.00628 13.0825 1.99524 9.57977 2.00215 6.97665ZM16.9006 8.99673L7.09942 8.99675C6.53852 8.99675 6.08382 8.54205 6.08382 7.98115C6.08381 7.42024 6.53852 6.96554 7.09942 6.96554L16.9006 6.96552C17.4615 6.96552 17.9162 7.42022 17.9162 7.98112C17.9162 8.54203 17.4615 8.99673 16.9006 8.99673ZM16.9006 12.1821L7.09942 12.1821C6.53852 12.1821 6.08382 11.7274 6.08382 11.1665C6.08381 10.6056 6.53852 10.1509 7.09942 10.1509L16.9006 10.1509C17.4615 10.1509 17.9162 10.6056 17.9162 11.1665C17.9162 11.7274 17.4615 12.1821 16.9006 12.1821ZM6.08382 14.4336C6.08382 13.8727 6.53852 13.418 7.09942 13.418H13.6335C14.1944 13.418 14.6491 13.8727 14.6491 14.4336C14.6491 14.9945 14.1944 15.4492 13.6335 15.4492H7.09942C6.53852 15.4492 6.08382 14.9945 6.08382 14.4336Z"/>',
    }}
  />
)

export const tags = ['message-fill', 'contact']
