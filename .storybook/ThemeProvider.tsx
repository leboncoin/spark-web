import React, { ReactNode, useEffect, useState } from 'react'

export const ThemeProvider = ({
  children,
  colorScheme,
  highContrast,
}: {
  children: ReactNode
  colorScheme: string
  highContrast: string
}) => {
  const [systemColorScheme, setSystemColorScheme] = useState(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  )
  const [systemHighContrast, setSystemHighContrast] = useState(
    () => window.matchMedia('(prefers-contrast: more)').matches
  )

  useEffect(() => {
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const contrastQuery = window.matchMedia('(prefers-contrast: more)')

    const updateColorScheme = (e: MediaQueryListEvent) => {
      setSystemColorScheme(e.matches ? 'dark' : 'light')
    }

    const updateHighContrast = (e: MediaQueryListEvent) => {
      setSystemHighContrast(e.matches)
    }

    colorSchemeQuery.addEventListener('change', updateColorScheme)
    contrastQuery.addEventListener('change', updateHighContrast)

    return () => {
      colorSchemeQuery.removeEventListener('change', updateColorScheme)
      contrastQuery.removeEventListener('change', updateHighContrast)
    }
  }, [])

  const finalColorScheme = colorScheme === 'system' ? systemColorScheme : colorScheme
  const finalHighContrast = highContrast === 'system' ? systemHighContrast : highContrast === 'true'
  const finalThemeKey = `${finalColorScheme}${finalHighContrast ? '-more-contrast' : ''}`

  useEffect(() => {
    const htmlElement = document.querySelector('html')
    if (htmlElement) {
      htmlElement.setAttribute('data-theme', finalThemeKey)
    }
  }, [finalThemeKey])

  return <>{children}</>
}
