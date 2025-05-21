import { DocsContainer, DocsContainerProps } from '@storybook/blocks'
import { Icon } from '@spark-ui/components/icon'
import { ShareExpand } from '@spark-ui/icons/ShareExpand'
import { WarningOutline } from '@spark-ui/icons/WarningOutline'
import React, { ReactNode, useEffect, useState } from 'react'

import '../src/tailwind.css'
import './sb-theming.css'

import { ToC } from '@docs/helpers/ToC'

import { ThemeProvider } from './ThemeProvider'

interface Props extends DocsContainerProps {
  children: ReactNode
}

const ExampleContainer = ({ children, ...props }: Props) => {
  const [shouldDisplayExperimentalBanner, setShouldDisplayExperimentalBanner] = useState(false)

  useEffect(() => {
    const primaryStoryTitle = props.context.componentStories()[0]?.title

    setShouldDisplayExperimentalBanner(primaryStoryTitle?.startsWith('Experimental') || false)
  }, [props.context?.channel])

  return (
    <DocsContainer {...props}>
      <div id="spark-doc-container">
        {shouldDisplayExperimentalBanner && (
          <p className="gap-md py-sm px-lg z-sticky bg-alert-container text-on-alert-container border-l-alert sticky top-0 flex items-center border-l-[4px] font-bold">
            <Icon size="lg" label="warning" intent="alert">
              <WarningOutline />
            </Icon>
            This component is still experimental. Avoid usage in production features
          </p>
        )}

        {children}
      </div>

      <ToC />
    </DocsContainer>
  )
}

const preview = {
  globalTypes: {
    colorScheme: {
      name: 'Color scheme',
      description: 'Set the color scheme',
      defaultValue: 'system',
      toolbar: {
        dynamicTitle: true,
        items: [
          { value: 'system', right: '⚙️', title: 'System color scheme' },
          { value: 'light', right: '⚪️', title: 'Light (forced)' },
          { value: 'dark', right: '⚫️', title: 'Dark (forced)' },
        ],
      },
    },
    highContrast: {
      name: 'a11y - High contrast',
      description: 'Toggle high contrast',
      defaultValue: 'system',
      toolbar: {
        dynamicTitle: true,
        items: [
          { value: 'system', right: '⚙️', title: 'System contrast' },
          { value: 'false', title: 'Regular contrast (forced)' },
          { value: 'true', title: 'High contrast (forced)' },
        ],
      },
    },
  },
  initialGlobals: {
    colorScheme: 'system',
    highContrast: 'system',
  },
  parameters: {
    docs: {
      container: ExampleContainer,
    },
    options: {
      storySort: {
        order: [
          'Getting Started',
          'Using Spark',
          [
            'Setup',
            'Styling overview',
            'Handling multiple themes',
            'Migrating from Styled Components',
            'Tailwind config viewer',
            'FAQ',
          ],
          'Components',
          'Utils',
          'Hooks',
          'Contributing',
          '*',
        ],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (
      storyFn: () => ReactNode,
      { globals }: { globals: { colorScheme: string; highContrast: string } }
    ) => {
      const { colorScheme, highContrast } = globals
      return (
        <ThemeProvider colorScheme={colorScheme} highContrast={highContrast}>
          {storyFn()}
        </ThemeProvider>
      )
    },
    (storyFn: () => ReactNode, { id, viewMode }: { id: string; viewMode: string }) => {
      const params = new URLSearchParams(window.top?.location.search)
      params.set('id', id)
      params.delete('path')

      return (
        <div className="relative w-full">
          {viewMode === 'docs' && (
            <div className="-right-lg -top-xl absolute">
              <a
                href={`/iframe.html?${params.toString()}`}
                target="_blank"
                className="text-basic hover:text-basic-hovered focus:text-basic-hovered enabled:active:text-basic-hovered"
              >
                <Icon size="sm" label="expand">
                  <ShareExpand />
                </Icon>
              </a>
            </div>
          )}
          {storyFn()}
        </div>
      )
    },
  ],
  globals: {
    a11y: {
      // Optional flag to prevent the automatic check
      manual: true,
    },
  },
}

export default preview
