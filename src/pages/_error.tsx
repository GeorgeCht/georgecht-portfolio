'use client'

import TransitionPane from '@/components/transition/pane'
import Page from '@/components/ui/page'
import Head from 'next/head'
import TextRevealByChar from '@/components/ui/text-reveal-char'
import TextReveal from '@/components/ui/text-reveal'

import * as Sentry from '@sentry/nextjs'
import type { NextPageContext } from 'next'

import React, { useRef } from 'react'

export default function Error() {
  const paneRef = useRef<HTMLDivElement>(null)
  const page = useRef<HTMLElement>(null)

  return (
    <React.Fragment>
      <Head>
        <title>Error | GeorgeCht</title>
        <meta name={'description'} content={'Unexpected error'} />
        <meta
          name={'viewport'}
          content={'width=device-width, initial-scale=1'}
        />
        <link rel={'icon'} href={'/favicon.ico'} />
      </Head>

      <TransitionPane ref={paneRef}>
        <Page className={'justify-start'} ref={page}>
          <div
            className={
              'md:absolute flex flex-col left-0 -top-3 transition-opacity mt-14 md:mt-0'
            }
          >
            <TextRevealByChar
              as={'h2'}
              lineHeight={'1.195em'}
              delay={0}
              enterY={'22.125%'}
              className={'-ml-0 md:ml-0 pl-6'}
              typeClass={'typography-display-intro'}
              text={`↙`}
            />
            <TextRevealByChar
              as={'h1'}
              lineHeight={'1.195em'}
              delay={0.125}
              enterY={'22.125%'}
              className={'ml-2 pl-6 -mt-[2.375vw]'}
              typeClass={'typography-display-intro'}
              text={'Error'}
            />
            <TextReveal
              as={'span'}
              lineHeight={'0.9em'}
              enterY={'10%'}
              className={'-mb-3.5 pb-0 ml-2'}
              typeClass={'typography-caps-sm mr-0.5'}
              text={'An unexpected error occured'}
            />
            <TextReveal
              as={'span'}
              lineHeight={'0.9em'}
              enterY={'10%'}
              className={'-mb-3.5 pb-0 ml-2'}
              typeClass={'typography-caps-sm mr-0.5'}
              text={'if you see this, send help'}
            />
          </div>
        </Page>
      </TransitionPane>
    </React.Fragment>
  )
}

Error.getInitialProps = async (contextData: NextPageContext) => {
  await Sentry.captureUnderscoreErrorException(contextData)
}
