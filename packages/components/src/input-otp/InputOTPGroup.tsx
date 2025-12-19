import { ComponentPropsWithoutRef } from 'react'

export interface InputOTPGroupProps extends ComponentPropsWithoutRef<'div'> {}

export const InputOTPGroup = ({ children, className, ...props }: InputOTPGroupProps) => {
  return (
    <div className={`inline-flex [&>*:not(:first-child)]:-ml-px ${className || ''}`} {...props}>
      {children}
    </div>
  )
}

InputOTPGroup.displayName = 'InputOTP.Group'
