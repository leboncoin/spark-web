/**
 * A raised link that appears above other content. Renders an <a> element.
 */

import { cx } from 'class-variance-authority'
/**
 * A raised link that appears above other content. Renders an <a> element.
 */
import { ReactNode } from 'react'
/**
 * A raised link that appears above other content. Renders an <a> element.
 */
/**
 * A raised link that appears above other content. Renders an <a> element.
 */

import { Slot } from '../slot'
/**
 * A raised link that appears above other content. Renders an <a> element.
 */

/**
 * A raised link that appears above other content. Renders an <a> element.
 */

export interface LinkBoxRaisedProps {
  /**
   * A raised link that appears above other content. Renders an <a> element.
   */

  className?: string
  /**
   * A raised link that appears above other content. Renders an <a> element.
   */

  children: ReactNode
  /**
   * A raised link that appears above other content. Renders an <a> element.
   */
}
/**
 * A raised link that appears above other content. Renders an <a> element.
 */

/**
 * A raised link that appears above other content. Renders an <a> element.
 */

export const LinkBoxRaised = ({ className, ...props }: LinkBoxRaisedProps) => {
  /**
   * A raised link that appears above other content. Renders an <a> element.
   */

  return <Slot className={cx('default:z-raised default:relative', className)} {...props} />
  /**
   * A raised link that appears above other content. Renders an <a> element.
   */
}
/**
 * A raised link that appears above other content. Renders an <a> element.
 */

/**
 * A raised link that appears above other content. Renders an <a> element.
 */

LinkBoxRaised.displayName = 'LinkBox.Raised'
