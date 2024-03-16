import '@/styles/globals.css'
import { AnimatePresence } from 'framer-motion'
import { NextUIProvider } from '@nextui-org/react'
import localFont from 'next/font/local'
import type { AppProps } from 'next/app'
import LenisProvider from '@/components/providers/lenis'
import Header from '@/components/layout/header'
import React from 'react'

import { PrismicPreview } from '@prismicio/next'
import { repositoryName } from '@/prismicio'

// fix: useLayoutEffect suppress error
React.useLayoutEffect = React.useEffect

const ccneue = localFont({
  src: '/assets/ccneue.ttf',
  display: 'swap',
  variable: '--cc-neue',
})

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <LenisProvider>
      <NextUIProvider>
        <Header className={ccneue.className} />
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
