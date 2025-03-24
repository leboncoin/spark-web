import { Accordion as Root } from './Accordion'
import { Item } from './AccordionItem'
import { ItemContent } from './AccordionItemContent'
import { ItemHeader } from './AccordionItemHeader'
import { ItemTrigger } from './AccordionItemTrigger'

export const Accordion: typeof Root & {
  Item: typeof Item
  ItemHeader: typeof ItemHeader
  ItemTrigger: typeof ItemTrigger
  ItemContent: typeof ItemContent
} = Object.assign(Root, {
  Item,
  ItemHeader,
  ItemTrigger,
  ItemContent,
})

Accordion.displayName = 'Accordion'
Item.displayName = 'Item'
ItemHeader.displayName = 'ItemHeader'
ItemTrigger.displayName = 'Accordion.Trigger'
ItemContent.displayName = 'Accordion.Content'

export { type AccordionProps } from './Accordion'
export { type AccordionItemHeaderProps } from './AccordionItemHeader'
export { type AccordionItemContentProps } from './AccordionItemContent'
export { type AccordionItemTriggerProps } from './AccordionItemTrigger'
