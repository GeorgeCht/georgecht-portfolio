import '@/styles/globals.css'
import { AnimatePresence } from 'framer-motion'
import { NextUIProvider } from '@nextui-org/react'
import localFont from 'next/font/local'
import type { AppProps } from 'next/app'
import LenisProvider from '@/components/providers/lenis'
import mixpanel from 'mixpanel-browser'
import React from 'react'

import { PrismicPreview } from '@prismicio/next'
import { repositoryName } from '@/prismicio'
import HeaderAlt from '@/components/layout/header-alt'

// fix: useLayoutEffect suppress error
React.useLayoutEffect = React.useEffect

const ccneue = localFont({
  src: '/assets/ccneue.ttf',
  display: 'swap',
  variable: '--cc-neue',
})

export default function App({ Component, pageProps, router }: AppProps) {
  mixpanel.init('99f8e5ab9a009e3038883de98ddc8770', {
    track_pageview: true,
    persistence: 'localStorage',
  })
  return (
    <LenisProvider>
      <NextUIProvider>
        <HeaderAlt className={ccneue.className} />
        <main className={`relative w-full h-full ${ccneue.className}`}>
          <PrismicPreview repositoryName={repositoryName}>
            <AnimatePresence mode={'wait'}>
              <Component key={router.route} {...pageProps} />
            </AnimatePresence>
          </PrismicPreview>
        </main>
      </NextUIProvider>
    </LenisProvider>
  )
}
