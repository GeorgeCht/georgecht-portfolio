'use client'

import React, { useRef } from 'react'
import { useScrollToTop } from '@/lib/hooks'
import { repositoryName } from '@/prismicio'
import { createClient } from '@prismicio/client'
import { InferGetStaticPropsType } from 'next'

import Footer from '@/components/layout/footer'
import Reveal from '@/components/new/reveal'
import ArchiveList from '@/components/table/archive-list'
import TransitionPane from '@/components/transition/pane'
import Marquee from '@/components/ui/marquee'
import Page from '@/components/ui/page'
import Section from '@/components/ui/section'
import TextRevealByChar from '@/components/ui/text-reveal-char'
import VelocityMarquee from '@/components/ui/velocity-marquee'
import PageHead from '@/components/misc/page-head'
import data from '@/lib/staticData.json'
import mixpanel from 'mixpanel-browser'

const Archive = ({
  archiveData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const paneRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  useScrollToTop()

  mixpanel.track('PageView', {
    Page: 'Archive',
  })

  return (
    <React.Fragment>
      <PageHead title={'Archive'} />
      <TransitionPane ref={paneRef}>
        <Page>
          <VelocityMarquee className={'cursor-default'} direction={1}>
            <Marquee className={'pt-0'}>
              <TextRevealByChar
                as={'h1'}
                lineHeight={'1.195em'}
                delay={0}
                enterY={'22.125%'}
                id={'hero-entry'}
                className={'ml-2 pl-6'}
                typeClass={'typography-display'}
                text={'Archive↙Archive↙'}
              />
            </Marquee>
          </VelocityMarquee>
          <Section
            withPadding
            withGap
            className={'sm:flex-row pt-16 sm:pt-48 gap-2.5 w-full'}
          >
            <div className={'w-1/6 hidden lg:flex'} />
            <div className={'w-full sm:w-1/2 lg:w-1/3'}>
              <Reveal opacity childrenRef={textRef} duration={1}>
                <p className={'typography-base max-w-[620px]'} ref={textRef}>
                  {data.info.archive.text[0]}
                </p>
              </Reveal>
            </div>
            <div className={'w-full sm:w-1/2 lg:w-1/3'}>
              <Reveal opacity childrenRef={textRef} duration={1} delay={0.275}>
                <p className={'typography-base max-w-[620px]'} ref={textRef}>
                  {data.info.archive.text[1]}
                </p>
              </Reveal>
            </div>
            <div className={'w-1/6 hidden lg:flex'} />
          </Section>
          <ArchiveList archiveData={archiveData} />
          <Footer />
        </Page>
      </TransitionPane>
    </React.Fragment>
  )
}

export async function getStaticProps() {
  const client = createClient(repositoryName)
  const data = await client.getAllByType('archive')
  return {
    props: { archiveData: data },
  }
}

export default Archive
