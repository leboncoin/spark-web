import { NumberField } from '@base-ui-components/react/number-field'
import { Minus } from '@spark-ui/icons/Minus'
import { Plus } from '@spark-ui/icons/Plus'
import { cva } from 'class-variance-authority'
import { ComponentProps, ReactNode } from 'react'

import { Icon } from '../icon'
import { useRenderSlot } from './useRenderSlot'

const styles = cva(
  [
    // Base styles
    'border-outline border-sm min-w-sz-44 text-on-surface flex cursor-pointer items-center justify-center bg-clip-padding select-none',
    'hover:bg-neutral/dim-5',
    // Disabled and ReadOnly styles
    'disabled:bg-on-surface/dim-5 disabled:text-on-surface/dim-3 disabled:cursor-not-allowed',
    'data-[disabled]:bg-on-surface/dim-5 data-[disabled]:text-on-surface/dim-3 data-[disabled]:cursor-not-allowed',
    'data-[readonly]:bg-on-surface/dim-5 data-[readonly]:text-on-surface/dim-3 data-[readonly]:cursor-not-allowed',
    // State styles
    'group-data-[field-state=error]:border-error',
    'group-data-[field-state=alert]:border-alert',
    'group-data-[field-state=success]:border-success',
  ],
  {
    variants: {
      placement: {
        left: 'rounded-l-lg',
        right: 'rounded-r-lg',
      },
    },
  }
)

interface DecrementProps extends Omit<ComponentProps<typeof NumberField.Decrement>, 'render'> {
  children?: ReactNode
  asChild?: boolean
}

interface IncrementProps extends Omit<ComponentProps<typeof NumberField.Increment>, 'render'> {
  children?: ReactNode
  asChild?: boolean
}

export const Decrement = ({ children, className, asChild = false, ...props }: DecrementProps) => {
  const render = useRenderSlot(asChild, 'div')

  return (
    <NumberField.Decrement
      data-spark-component="stepper-decrement-button"
      className={styles({
        placement: 'left',
        className,
      })}
      render={render}
      {...props}
    >
      {children || (
        <Icon>
          <Minus />
        </Icon>
      )}
    </NumberField.Decrement>
  )
}

export const Increment = ({ children, className, asChild = false, ...props }: IncrementProps) => {
  const render = useRenderSlot(asChild, 'div')

  return (
    <NumberField.Increment
      data-spark-component="stepper-increment-button"
      className={styles({
        placement: 'right',
        className,
      })}
      render={render}
      {...props}
    >
      {children || (
        <Icon>
          <Plus />
        </Icon>
      )}
    </NumberField.Increment>
  )
}

Decrement.displayName = 'Stepper.DecrementButton'
Increment.displayName = 'Stepper.IncrementButton'
