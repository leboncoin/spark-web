import { useFormFieldControl } from '@spark-ui/components/form-field'
import { useMergeRefs } from '@spark-ui/hooks/use-merge-refs'
import { cx } from 'class-variance-authority'
import { ReactNode, Ref, useEffect, useId, useRef } from 'react'

import { FormFieldRequiredIndicator } from '../form-field/FormFieldRequiredIndicator'
import { Label, LabelProps } from '../label'
import { Slottable } from '../slot'
import { useSliderContext } from './SliderContext'

const ID_PREFIX = ':slider-label'

export interface SliderLabelProps extends LabelProps {
  /**
   * Element shown when the input is required inside the label.
   */
  requiredIndicator?: ReactNode
  ref?: Ref<HTMLLabelElement>
}

export const SliderLabel = ({
  htmlFor: htmlForProp,
  id: idProp,
  className,
  children,
  requiredIndicator = <FormFieldRequiredIndicator />,
  asChild,
  ref,
  ...others
}: SliderLabelProps) => {
  const field = useFormFieldControl()
  const { fieldLabelId, fieldId, onLabelId } = useSliderContext()

  // Generate an id if not provided and no FormField labelId is available
  const internalId = useId()
  const generatedId = `${ID_PREFIX}-${internalId}`
  const labelId = idProp || fieldLabelId || field.labelId || generatedId

  // Use FormField id for htmlFor if present, otherwise use fieldId from context, or the prop
  const htmlFor = asChild ? undefined : htmlForProp || fieldId || field.id

  // Get disabled and required state from FormField if present
  const disabled = field.disabled
  const isRequired = field.isRequired

  // Notify SliderContext of the label id if no FormField is present
  const labelRef = useRef<HTMLLabelElement>(null)
  const mergedRef = useMergeRefs(ref, labelRef)

  useEffect(() => {
    if (onLabelId && !fieldLabelId && !field.labelId) {
      onLabelId(labelId)
    }
  }, [onLabelId, fieldLabelId, field.labelId, labelId])

  return (
    <Label
      ref={mergedRef}
      id={labelId}
      data-spark-component="slider-label"
      htmlFor={htmlFor}
      className={cx(disabled ? 'text-on-surface/dim-3 pointer-events-none' : undefined, className)}
      asChild={asChild}
      {...others}
    >
      <>
        <Slottable>{children}</Slottable>
        {isRequired && requiredIndicator}
      </>
    </Label>
  )
}

SliderLabel.displayName = 'Slider.Label'
