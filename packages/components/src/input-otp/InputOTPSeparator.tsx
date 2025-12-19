import { Icon } from '@spark-ui/components/icon'
import { Minus } from '@spark-ui/icons/Minus'
import { ComponentPropsWithoutRef } from 'react'

export interface InputOTPSeparatorProps extends ComponentPropsWithoutRef<'div'> {}

export const InputOTPSeparator = ({ className, ...props }: InputOTPSeparatorProps) => {
  return (
    <div
      className={`text-on-surface flex items-center justify-center ${className || ''}`}
      {...props}
    >
      <Icon size="md">
        <Minus />
      </Icon>
    </div>
  )
}

InputOTPSeparator.displayName = 'InputOTP.Separator'
