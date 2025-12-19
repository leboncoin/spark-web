import { DocsContainer, DocsContainerProps } from '@storybook/addon-docs/blocks'
import { Icon } from '@spark-ui/components/icon'
import { ShareExpand } from '@spark-ui/icons/ShareExpand'
import { WarningOutline } from '@spark-ui/icons/WarningOutline'
import React, { ReactNode, useEffect, useState } from 'react'
import { INITIAL_VIEWPORTS } from 'storybook/viewport'

import '../src/tailwind.css'
import './sb-theming.css'

import { ThemeProvider } from './ThemeProvider'

interface Props extends DocsContainerProps {
  children: ReactNode
}

const ExampleContainer = ({ children, ...props }: Props) => {
  const [shouldDisplayExperimentalBanner, setShouldDisplayExperimentalBanner] = useState(false)
  const [shouldDisplaydeprecatedBanner, setShouldDisplayDeprecatedBanner] = useState(false)

  useEffect(() => {
    const primaryStoryTitle = props.context.componentStories()[0]?.title

    setShouldDisplayExperimentalBanner(primaryStoryTitle?.startsWith('Experimental') || false)
    setShouldDisplayDeprecatedBanner(primaryStoryTitle?.startsWith('Deprecated') || false)
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

        {shouldDisplaydeprecatedBanner && (
          <p className="gap-md py-sm px-lg z-sticky bg-alert-container text-on-alert-container border-l-alert sticky top-0 flex items-center border-l-[4px] font-bold">
            <Icon size="lg" label="warning" intent="alert">
              <WarningOutline />
            </Icon>
            This component is deprecated. Avoid usage in production features
          </p>
        )}

        {children}
      </div>
    </DocsContainer>
  )
}

const preview = {
  globalTypes: {
    colorScheme: {
      name: 'Color scheme',
      description: 'Set the color scheme',
      defaultValue: 'light',
      toolbar: {
        dynamicTitle: false,
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
      defaultValue: 'false',
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
    a11y: {
      // Optional flag to prevent the automatic check
      manual: true,
    },
    viewport: { value: 'ipad', isRotated: false },
    colorScheme: 'light',
    highContrast: 'false',
  },

  parameters: {
    viewport: {
      options: INITIAL_VIEWPORTS,
    },
    docs: {
      container: ExampleContainer,
      codePanel: true,
      toc: {
        headingSelector: 'h2, h3',
      },
    },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Setup',
          'Components list',
          'Accessibility',
          'Styling',
          [
            'Overview',
            'Design Tokens',
            'Themes', // + custom themes
            'Themes - Contrast check',
            'Animations',
            // 'Theme provider', // TODO
          ],
          'Components Principles',
          [
            'Compound pattern',
            'Composition',
            'Polymorphism',
            // 'Controlled/Uncontrolled', // TODO
            'Third-party libraries',
            'Identifying Spark components',
          ],
          'Components',
          'Hooks',
          'utils',
          'Contributing',
          [
            'Contributing',
            'Project architecture',
            'Component checklist',
            'Documentation',
            'Testing',
            'Commit Strategy',
            'Naming things',
            'GitHub Actions Documentation',
            'Maintainers',
            'Contributors',
            'Code of Conduct',
            'Multiple Github Accounts',
          ],
          'F.A.Q',
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
}

export default preview
