import { DocsContainer, DocsContainerProps } from '@storybook/blocks'
import { Icon } from '@spark-ui/components/icon'
import { ShareExpand } from '@spark-ui/icons/ShareExpand'
import { WarningOutline } from '@spark-ui/icons/WarningOutline'

import '../src/tailwind.css'
import './sb-theming.css'

import { ToC } from '@docs/helpers/ToC'
import { ReactNode, useEffect, useState } from 'react'

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
      description: 'Set the color scheme',
      defaultValue: 'system',
      toolbar: {
        title: 'Color Scheme',
        // show the theme name once selected in the toolbar
        dynamicTitle: false,
        items: [
          { value: 'system', title: 'System' },
          { value: 'light', right: '⚪️', title: 'Light' },
          { value: 'dark', right: '⚫️', title: 'Dark' },
        ],
      },
    },
  },
  initialGlobals: {
    theme: 'light',
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
    // custom theme decorator, see https://yannbraga.dev/blog/multi-theme-decorator
    (storyFn: () => ReactNode, { globals }: { globals: { colorScheme: string } }) => {
      const colorSchemeKey = globals.colorScheme

      const htmlElement = document.querySelector('html')

      if (!htmlElement) return

      if (colorSchemeKey === 'system') {
        htmlElement.removeAttribute('data-color-scheme')
      } else {
        htmlElement.setAttribute('data-color-scheme', colorSchemeKey)
      }

      return storyFn()
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
