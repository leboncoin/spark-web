import { ComponentPropsWithoutRef } from 'react'

export interface InputOTPGroupProps extends ComponentPropsWithoutRef<'div'> {}

export const InputOTPGroup = ({ children, className, ...props }: InputOTPGroupProps) => {
  return (
    <div className={`gap-md flex ${className}`} {...props}>
      {children}
    </div>
  )
}

InputOTPGroup.displayName = 'InputOTP.Group'
