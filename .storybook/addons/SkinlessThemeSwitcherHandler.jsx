import { memo, useEffect, useSyncExternalStore, useRef } from 'react'

/*
  1. Refer to this issue for the context behind this:
     https://github.com/leboncoin/spark-web/pull/2497
*/

import { useGlobals } from '@storybook/manager-api'

function useUrlChange() {
  /* 1 */
  return useSyncExternalStore(
    callback => {
      window.addEventListener('popstate', callback)

      return () => {
        window.removeEventListener('popstate', callback)
      }
    },
    () => window.location.href
  )
}

export const SkinlessThemeSwitcherHandler = memo(function SkinlessThemeSwitcherHandler() {
  const [globals] = useGlobals()

  const theme = globals?.theme
  const url = useUrlChange()
  const initialUrlHashRef = useRef('')
  const initialUrlSearchRef = useRef('')

  useEffect(() => {
    /* 1 */
    initialUrlHashRef.current = window.location.hash
    initialUrlSearchRef.current = window.location.search
  }, [])

  useEffect(() => {
    /* 1 */
    const isNotInitialPage = initialUrlSearchRef.current !== window.location.search
    const isNotInitialHash =
      window.location.hash.length && window.location.hash !== initialUrlHashRef.current

    if (isNotInitialPage || isNotInitialHash) return

    const newUrl = new URL(window.location)
    newUrl.hash = initialUrlHashRef.current
    window.history.replaceState(null, '', newUrl)
  }, [url])

  useEffect(() => {
    if (!theme) return

    const htmlElement = document.querySelector('html')
    if (htmlElement) {
      htmlElement.setAttribute('data-theme', theme)
    }
    const iframe = document.querySelector('#storybook-preview-iframe')
    if (iframe) {
      const iframeHtmlElement = iframe.contentDocument?.documentElement
      iframeHtmlElement.setAttribute('data-theme', theme)
    }
  }, [theme])

  return null
})
