import { DocsContainer, DocsContainerProps } from '@storybook/addon-docs/blocks'
import { useDarkMode } from '@vueless/storybook-dark-mode'
import { Icon } from '@spark-ui/components/icon'
import { WarningOutline } from '@spark-ui/icons/WarningOutline'
import React, { ReactNode, useEffect, useLayoutEffect, useState } from 'react'
import { INITIAL_VIEWPORTS } from 'storybook/viewport'
import themes from './themes'

import '../src/tailwind.css'
import { cx } from 'class-variance-authority'

/**
 * Wraps stories and syncs Spark theme (data-theme) with Storybook dark mode.
 * - Reads dark/light from the addon's class on <html> (classTarget: 'html') so it works in story view.
 * - Sets data-theme on <html> so Spark CSS variables apply to the whole iframe document.
 */
function ThemeWrapper({ children, viewMode }: { children: ReactNode; viewMode: string }) {
  const isDarkMode = useDarkMode()
  const theme = isDarkMode ? 'dark' : 'light'

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    return () => document.documentElement.removeAttribute('data-theme')
  }, [theme])

  return (
    <div
      data-theme={theme}
      className={cx('bg-background text-on-background w-min-content relative overflow-x-auto', {
        'p-lg': viewMode === 'docs',
      })}
    >
      {children}
    </div>
  )
}

interface Props extends DocsContainerProps {
  children: ReactNode
}

const ExampleContainer = ({ children, ...props }: Props) => {
  const isDarkMode = useDarkMode()
  const [shouldDisplayExperimentalBanner, setShouldDisplayExperimentalBanner] = useState(false)
  const [shouldDisplaydeprecatedBanner, setShouldDisplayDeprecatedBanner] = useState(false)

  useEffect(() => {
    const primaryStoryTitle = props.context.componentStories()[0]?.title

    setShouldDisplayExperimentalBanner(primaryStoryTitle?.startsWith('Experimental') || false)
    setShouldDisplayDeprecatedBanner(primaryStoryTitle?.startsWith('Deprecated') || false)
  }, [props.context?.channel])

  return (
    <DocsContainer
      {...props}
      theme={isDarkMode ? themes.dark : themes.light}
      data-theme={isDarkMode ? 'dark' : 'light'}
    >
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
  globalTypes: {},
  initialGlobals: {
    a11y: {
      // Optional flag to prevent the automatic check
      manual: true,
    },
  },

  parameters: {
    darkMode: {
      classTarget: 'html',
      stylePreview: true,
      dark: themes.dark,
      light: themes.light,
    },
    viewport: {
      options: INITIAL_VIEWPORTS,
    },
    docs: {
      container: ExampleContainer,
      codePanel: true,
      toc: {
        headingSelector: 'h2, h3',
      },
      canvas: {
        withToolbar: true,
        sourceState: 'hidden',
        layout: 'fullscreen',
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
    (storyFn: () => ReactNode, { id, viewMode, ...rest }: { id: string; viewMode: string }) => {
      const params = new URLSearchParams(window.top?.location.search)
      params.set('id', id)
      params.delete('path')

      return <ThemeWrapper viewMode={viewMode}>{storyFn()}</ThemeWrapper>
    },
  ],
}

export default preview
