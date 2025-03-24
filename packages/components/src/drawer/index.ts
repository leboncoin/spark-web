import { Drawer as Root } from './Drawer'
import { DrawerBody } from './DrawerBody'
import { DrawerCloseButton } from './DrawerCloseButton'
import { DrawerContent } from './DrawerContent'
import { DrawerDescription } from './DrawerDescription' // aria-describedby
import { DrawerFooter } from './DrawerFooter'
import { DrawerHeader } from './DrawerHeader'
import { DrawerOverlay } from './DrawerOverlay'
import { DrawerPortal } from './DrawerPortal'
import { DrawerTitle } from './DrawerTitle'
import { DrawerTrigger } from './DrawerTrigger'

export const Drawer: typeof Root & {
  Trigger: typeof DrawerTrigger
  Portal: typeof DrawerPortal
  Overlay: typeof DrawerOverlay
  Content: typeof DrawerContent
  Header: typeof DrawerHeader
  Body: typeof DrawerBody
  Footer: typeof DrawerFooter
  CloseButton: typeof DrawerCloseButton
  Title: typeof DrawerTitle
  Description: typeof DrawerDescription
} = Object.assign(Root, {
  Trigger: DrawerTrigger,
  Portal: DrawerPortal,
  Overlay: DrawerOverlay,
  Content: DrawerContent,
  Header: DrawerHeader,
  Body: DrawerBody,
  Footer: DrawerFooter,
  CloseButton: DrawerCloseButton,
  Title: DrawerTitle,
  Description: DrawerDescription,
})

Drawer.displayName = 'Drawer'
DrawerTrigger.displayName = 'Drawer.Trigger'
DrawerPortal.displayName = 'Drawer.Portal'
DrawerOverlay.displayName = 'Drawer.Overlay'
DrawerContent.displayName = 'Drawer.Content'
DrawerHeader.displayName = 'Drawer.Header'
DrawerBody.displayName = 'Drawer.Body'
DrawerFooter.displayName = 'Drawer.Footer'
DrawerCloseButton.displayName = 'Drawer.CloseButton'
DrawerTitle.displayName = 'Drawer.Title'
DrawerDescription.displayName = 'Drawer.Description'

export { type DrawerProps } from './Drawer'
export { type DrawerContentProps } from './DrawerContent'
export { type DrawerHeaderProps } from './DrawerHeader'
export { type DrawerBodyProps } from './DrawerBody'
export { type DrawerFooterProps } from './DrawerFooter'
export { type DrawerTriggerProps } from './DrawerTrigger'
export { type DrawerOverlayProps } from './DrawerOverlay'
export { type DrawerPortalProps } from './DrawerPortal'
export { type DrawerTitleProps } from './DrawerTitle'
export { type DrawerDescriptionProps } from './DrawerDescription'
export { type DrawerCloseProps } from './DrawerClose'
export { type DrawerCloseButtonProps } from './DrawerCloseButton'
