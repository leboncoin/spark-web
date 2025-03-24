import { DeleteOutline } from '@spark-ui/icons/DeleteOutline'
import { cx } from 'class-variance-authority'
import { FocusEvent } from 'react'

import { Icon } from '../icon'
import { useComboboxContext } from './ComboboxContext'
import { ComboboxItem } from './types'

const SelectedItem = ({ item: selectedItem, index }: { item: ComboboxItem; index: number }) => {
  const ctx = useComboboxContext()

  const isCleanable = !ctx.disabled && !ctx.readOnly

  const handleFocus = (e: FocusEvent<HTMLSpanElement>) => {
    const element = e.target as HTMLSpanElement
    if (ctx.lastInteractionType === 'keyboard') {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      })
    }
  }

  const { disabled, ...selectedItemProps } = ctx.getSelectedItemProps({
    disabled: ctx.disabled || ctx.readOnly,
    selectedItem,
    index,
  })

  const Element = disabled ? 'button' : 'span'

  return (
    <Element
      role="presentation"
      data-spark-component="combobox-selected-item"
      key={`selected-item-${index}`}
      className={cx(
        'h-sz-28 bg-neutral-container flex items-center rounded-md align-middle',
        'text-body-2 text-on-neutral-container',
        'disabled:opacity-dim-3 disabled:cursor-not-allowed',
        'focus-visible:u-outline-inset outline-hidden',
        { 'px-md': !isCleanable, 'pl-md': isCleanable }
      )}
      {...selectedItemProps}
      tabIndex={-1}
      {...(disabled && { disabled: true })}
      onFocus={handleFocus}
    >
      <span
        className={cx('line-clamp-1 overflow-x-hidden leading-normal break-all text-ellipsis', {
          'w-max': !ctx.wrap,
        })}
      >
        {selectedItem.text}
      </span>
      {ctx.disabled}
      {isCleanable && (
        <button
          type="button"
          tabIndex={-1}
          aria-hidden
          className="px-md h-full cursor-pointer"
          onClick={e => {
            e.stopPropagation()

            const updatedSelectedItems = ctx.selectedItems.filter(
              item => item.value !== selectedItem.value
            )

            ctx.setSelectedItems(updatedSelectedItems)

            if (ctx.innerInputRef.current) {
              ctx.innerInputRef.current.focus({ preventScroll: true })
            }
          }}
        >
          <Icon size="sm">
            <DeleteOutline />
          </Icon>
        </button>
      )}
    </Element>
  )
}

export const SelectedItems = () => {
  const ctx = useComboboxContext()

  return ctx.multiple && ctx.selectedItems.length ? (
    <>
      {ctx.selectedItems.map((item, index) => (
        <SelectedItem key={item.value} item={item} index={index} />
      ))}
    </>
  ) : null
}

SelectedItems.displayName = 'Combobox.SelectedItems'
