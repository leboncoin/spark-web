import { ArrowVerticalRight } from '@spark-ui/icons/ArrowVerticalRight'

import { Icon } from '../icon'
import { IconButton, IconButtonProps } from '../icon-button'
import { useCarouselContext } from './Carousel'

export const CarouselNextButton = ({
  'aria-label': ariaLabel,
  ...buttonProps
}: IconButtonProps) => {
  const ctx = useCarouselContext()

  return (
    <IconButton
      {...ctx.getNextTriggerProps()}
      intent="surface"
      design="filled"
      className="pointer-events-auto cursor-pointer shadow-sm disabled:invisible"
      aria-label={ariaLabel}
      {...buttonProps}
    >
      <Icon>
        <ArrowVerticalRight />
      </Icon>
    </IconButton>
  )
}

CarouselNextButton.displayName = 'Carousel.NextButton'
