import { ComponentPropsWithoutRef } from 'react'

export interface InputOTPSeparatorProps extends ComponentPropsWithoutRef<'div'> {}

/**
 * A visual separator between OTP input groups. Renders a <div> element.
 */
export const InputOTPSeparator = ({ className, ...props }: InputOTPSeparatorProps) => {
  return (
    <div
      className={`text-on-surface/dim-3 flex items-center justify-center ${className || ''}`}
      {...props}
    >
      <div className="h-sz-4 w-sz-8 bg-outline rounded-full" />
    </div>
  )
}

InputOTPSeparator.displayName = 'InputOTP.Separator'
