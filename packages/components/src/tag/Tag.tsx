import { ButtonHTMLAttributes, type PropsWithChildren, Ref } from 'react'

import { Slot } from '../slot'
import { tagStyles, type TagStylesProps } from './Tag.styles'

interface BaseTagProps
  extends PropsWithChildren<ButtonHTMLAttributes<HTMLSpanElement>>,
    TagStylesProps {
  /**
   * Change the component to the HTML tag or custom component of the only child.
   */
  asChild?: boolean
}

interface FilteredDesignIntent<
  Design extends TagProps['design'],
  K extends TagStylesProps['intent'] | never = never,
> {
  design?: Design
  intent?: Exclude<TagStylesProps['intent'], K>
  ref?: Ref<HTMLButtonElement>
}

export type ValidTagDesignIntent =
  | FilteredDesignIntent<'tinted', 'surface'>
  | FilteredDesignIntent<'outlined', 'surface'>
  | FilteredDesignIntent<'filled'>

export type TagProps = BaseTagProps & ValidTagDesignIntent

export const Tag = ({
  design = 'filled',
  intent = 'basic',
  asChild,
  className,
  ref,
  ...others
}: TagProps) => {
  const Component = asChild ? Slot : 'span'

  return (
    <Component
      data-spark-component="tag"
      ref={ref}
      className={tagStyles({
        className,
        design,
        intent,
      })}
      {...others}
    />
  )
}
