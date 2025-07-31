import { cx } from 'class-variance-authority'
import { ReactNode } from 'react'

import { Slot } from '../slot'

export interface LinkBoxRaisedProps {
  className?: string
  children: ReactNode
}

export const LinkBoxRaised = ({ className, ...props }: LinkBoxRaisedProps) => {
  return <Slot className={cx('default:z-raised default:relative', className)} {...props} />
}

LinkBoxRaised.displayName = 'LinkBox.Raised'
