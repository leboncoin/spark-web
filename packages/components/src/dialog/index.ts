import { Dialog as Root } from './Dialog'
import { Body } from './DialogBody'
import { Close } from './DialogClose'
import { CloseButton } from './DialogCloseButton'
import { Content } from './DialogContent'
import { Description } from './DialogDescription' // aria-describedby
import { Footer } from './DialogFooter'
import { Header } from './DialogHeader'
import { Overlay } from './DialogOverlay'
import { Portal } from './DialogPortal'
import { Title } from './DialogTitle' // aria-labelledby
import { Trigger } from './DialogTrigger'

export const Dialog: typeof Root & {
  Trigger: typeof Trigger
  Portal: typeof Portal
  Overlay: typeof Overlay
  Content: typeof Content
  Header: typeof Header
  Body: typeof Body
  Footer: typeof Footer
  Close: typeof Close
  CloseButton: typeof CloseButton
  Title: typeof Title
  Description: typeof Description
} = Object.assign(Root, {
  Trigger,
  Portal,
  Overlay,
  Content,
  Header,
  Body,
  Footer,
  Close,
  CloseButton,
  Title,
  Description,
})

Dialog.displayName = 'Dialog'
Dialog.Trigger.displayName = 'Dialog.Trigger'
Trigger.displayName = 'Dialog.Trigger'
Portal.displayName = 'Dialog.Portal'
Overlay.displayName = 'Dialog.Overlay'
Content.displayName = 'Dialog.Content'
Header.displayName = 'Dialog.Header'
Body.displayName = 'Dialog.Body'
Footer.displayName = 'Dialog.Footer'
CloseButton.displayName = 'Dialog.CloseButton'
Title.displayName = 'Dialog.Title'
Description.displayName = 'Dialog.Description'

export { type DialogProps } from './Dialog'
export { type ContentProps as DialogContentProps } from './DialogContent'
export { type HeaderProps as DialogHeaderProps } from './DialogHeader'
export { type BodyProps as DialogBodyProps } from './DialogBody'
export { type FooterProps as DialogFooterProps } from './DialogFooter'
export { type TriggerProps as DialogTriggerProps } from './DialogTrigger'
export { type OverlayProps as DialogOverlayProps } from './DialogOverlay'
export { type PortalProps as DialogPortalProps } from './DialogPortal'
export { type TitleProps as DialogTitleProps } from './DialogTitle'
export { type DescriptionProps as DialogDescriptionProps } from './DialogDescription'
export { type CloseProps as DialogCloseProps } from './DialogClose'
export { type CloseButtonProps as DialogCloseButtonProps } from './DialogCloseButton'
