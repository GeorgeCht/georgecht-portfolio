'use client'

import TransitionPane from '@/components/transition/pane'
import Page from '@/components/ui/page'
import TextRevealByChar from '@/components/ui/text-reveal-char'
import TextReveal from '@/components/ui/text-reveal'

import React, { useRef } from 'react'
import PageHead from '@/components/misc/page-head'
import mixpanel from 'mixpanel-browser'

export default function NotFoundPage() {
  const paneRef = useRef<HTMLDivElement>(null)
  const page = useRef<HTMLElement>(null)

  mixpanel.track('PageView', {
    Page: '404',
  })

  return (
    <React.Fragment>
      <PageHead title={'Page not Found'} />
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
              text={'↙'}
            />
            <TextRevealByChar
              as={'h1'}
              lineHeight={'1.195em'}
              delay={0.125}
              enterY={'22.125%'}
              className={'ml-2 pl-6 -mt-[2.375vw]'}
              typeClass={'typography-display-intro'}
              text={'404'}
            />
            <TextReveal
              as={'span'}
              lineHeight={'0.9em'}
              enterY={'10%'}
              className={'-mb-3.5 pb-0 ml-2'}
              typeClass={'typography-caps-sm mr-0.5'}
              text={'The page you’ re looking'}
            />
            <TextReveal
              as={'span'}
              lineHeight={'0.9em'}
              enterY={'10%'}
              className={'-mb-3.5 pb-0 ml-2'}
              typeClass={'typography-caps-sm mr-0.5'}
              text={'for cannot be found'}
            />
          </div>
        </Page>
      </TransitionPane>
    </React.Fragment>
  )
}
