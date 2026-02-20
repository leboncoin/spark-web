import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cx } from 'class-variance-authority'
import { ComponentPropsWithoutRef, Ref } from 'react'

import { TextLink } from '../text-link'

export interface LinkProps
  extends useRender.ComponentProps<'a'>,
    Omit<ComponentPropsWithoutRef<typeof TextLink>, 'children'> {
  className?: string
  href?: string
  ref?: Ref<HTMLAnchorElement>
}

export const Link = ({
  className,
  render,
  bold = true,
  intent = 'current',
  underline = true,
  href,
  ref,
  ...rest
}: LinkProps) => {
  const defaultProps: Record<string, unknown> = {
    'data-spark-component': 'breadcrumb-link',
    href,
    className: cx('inline! overflow-hidden text-ellipsis whitespace-nowrap', className),
    ...rest,
  }

  const element = useRender({
    defaultTagName: 'a',
    render,
    ref,
    props: mergeProps<'a'>(defaultProps, {}),
  })

  if (!render) {
    return (
      <TextLink
        data-spark-component="breadcrumb-link"
        href={href}
        ref={ref}
        className={cx('inline! overflow-hidden text-ellipsis whitespace-nowrap', className)}
        bold={bold}
        intent={intent}
        underline={underline}
        {...rest}
      />
    )
  }

  return element
}

Link.displayName = 'Breadcrumb.Link'
