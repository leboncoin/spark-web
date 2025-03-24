import { Close } from '@spark-ui/icons/Close'
import { MapExpand } from '@spark-ui/icons/MapExpand'
import { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'

import { Icon } from '../icon'
import { IconButton } from '../icon-button'
import { Collapsible } from '.'

const meta: Meta<typeof Collapsible> = {
  title: 'Components/Collapsible',
  component: Collapsible,
  tags: ['data-display'],
}

export default meta

export const Default: StoryFn = () => {
  const [open, setOpen] = useState(false)

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="mb-lg gap-md flex items-center">
        <p className="font-bold">Terms and conditions</p>
        <Collapsible.Trigger asChild>
          <IconButton
            size="sm"
            aria-label={open ? 'Collapse terms and conditions' : 'Expand terms and conditions'}
          >
            <Icon>{open ? <Close /> : <MapExpand />}</Icon>
          </IconButton>
        </Collapsible.Trigger>
      </div>

      <Collapsible.Content className="gap-md flex flex-col">
        <p>
          By accessing or using our services, you agree to comply with the following terms and
          conditions. These terms govern your use of our website, mobile applications, and other
          services provided by our company. You are responsible for ensuring that anyone using our
          services through your account complies with these terms. You agree not to use our services
          for any unlawful purpose or in any way that could harm our company, our services, or any
          third party. We reserve the right to modify these terms at any time without prior notice,
          and your continued use of our services constitutes your acceptance of any changes. All
          content on our website is for informational purposes only and should not be considered
          professional advice. We make no warranties regarding the accuracy, completeness, or
          reliability of any content on our site. We are not liable for any damages arising from
          your use of our services, including direct, indirect, incidental, punitive, and
          consequential damages. You agree to indemnify and hold us harmless from any claims arising
          out of your use of our services. Any disputes arising from these terms or your use of our
          services will be governed by the laws of the jurisdiction in which our company is based.
          If any provision of these terms is found to be invalid, the remaining provisions will
          remain in full force and effect. These terms constitute the entire agreement between you
          and our company regarding your use of our services and supersede any prior agreements. Our
          failure to enforce any right or provision of these terms will not be considered a waiver
          of those rights. If you have any questions about these terms, please contact us. Your use
          of our services is at your sole risk, and we disclaim all liability for any loss or damage
          arising from your use of our services.
        </p>
      </Collapsible.Content>
    </Collapsible>
  )
}
