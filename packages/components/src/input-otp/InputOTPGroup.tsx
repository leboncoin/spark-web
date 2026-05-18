import { ComponentPropsWithoutRef } from 'react'

export interface InputOTPGroupProps extends ComponentPropsWithoutRef<'div'> {}

/**
 * Container for a group of OTP input slots. Renders a <div> element.
 */
export const InputOTPGroup = ({ children, className, ...props }: InputOTPGroupProps) => {
  return (
    <div className={`gap-md flex ${className}`} {...props}>
      {children}
    </div>
  )
}

InputOTPGroup.displayName = 'InputOTP.Group'
