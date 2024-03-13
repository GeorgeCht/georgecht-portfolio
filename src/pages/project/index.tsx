'use client'

import Footer from '@/components/new/footer'
import Reveal from '@/components/new/reveal'
import Table from '@/components/new/table'
import TransitionPane from '@/components/transition/pane'
import AspectRatioImage from '@/components/ui/aspect-ratio-image'
import Page from '@/components/ui/page'
import Section from '@/components/ui/section'
import Head from 'next/head'
import React, { useRef } from 'react'
import { useScrollToTop } from '@/lib/hooks'
import Pill from '@/components/new/button-pill'
import VelocityMarquee from '@/components/ui/velocity-marquee'
import Marquee from '@/components/ui/marquee'
import TextRevealByChar from '@/components/ui/text-reveal-char'
import Link from 'next/link'

export default function About() {
  const paneRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const headerRef = useRef<HTMLParagraphElement>(null)
  useScrollToTop()

  return (
    <React.Fragment>
      <Head>
        <title>SVG App</title>
        <meta name={'description'} content={'Generated by create next app'} />
        <meta
          name={'viewport'}
          content={'width=device-width, initial-scale=1'}
        />
        <link rel={'icon'} href={'/favicon.ico'} />
      </Head>

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
                text={'AnassaGeneral↙'}
              />
            </Marquee>
          </VelocityMarquee>
          <Section
            withPadding
            withGap
            className={'pt-0 sm:pt-0 sm:flex-row gap-2.5 w-full'}
          >
            <div className={'w-1/6'}>
              <Reveal opacity childrenRef={headerRef} duration={1}>
                <p
                  className={
                    'typography-lg w-full md:max-w-[49vw] scale-x-[-1]'
                  }
                  ref={headerRef}
                >
                  ↙
                </p>
              </Reveal>
            </div>
            <div className={'w-1/3'}>
              <Reveal opacity childrenRef={headerRef} duration={1}>
                <h1
                  className={'typography-lg w-full md:max-w-[49vw]'}
                  ref={headerRef}
                >
                  Air Company, a carbon technology company that is creating
                  products from CO2 to extend life on Earth.
                </h1>
              </Reveal>
              <Reveal
                opacity
                childrenRef={textRef}
                duration={1}
                delay={0.175}
                className={'pt-1.5'}
              >
                <p
                  className={'typography-base w-full md:max-w-[49vw]'}
                  ref={textRef}
                >
                  Designed to save time while maintaining a strong visual
                  presence on various social media channels, these templates
                  feature a perfect blend of classic and contemporary styles.
                  Designed to save time while maintaining a strong visual
                  presence on various social media channels, these templates
                  feature a perfect blend of classic and contemporary styles.
                </p>
              </Reveal>
              <div className={'mt-4 pb-4'}></div>
            </div>
            <div className={'w-1/3'} />
            <div className={'w-1/6 pt-4'}>
              <Reveal
                y={false}
                className={'h-[42px]'}
                height={42}
                childrenRef={buttonRef}
                opacity
                delay={0.175}
              >
                <div className={'block relative pt-2'} ref={buttonRef}>
                  <Pill.ButtonFlip
                    innerText={'Visit ↗'}
                    href={'/archive'}
                    scroll={false}
                    reversed
                  />
                </div>
              </Reveal>
              <Reveal
                y={false}
                className={'h-[42px]'}
                height={42}
                childrenRef={buttonRef}
                opacity
                delay={0.175}
              >
                <div className={'block relative pt-2'} ref={buttonRef}>
                  <Pill.ButtonFlip
                    innerText={'Share'}
                    href={'/archive'}
                    scroll={false}
                  />
                </div>
              </Reveal>
            </div>
          </Section>
          <Table.Project
            project={{
              year: 2024,
              title: 'C2 Montreal',
              client: 'Self-initiated',
              role: 'Typeface Design',
              image: '/12.png',
              color: '#000000',
            }}
          />
          <Section withPadding withGap className={'sm:pt-1.5'}>
            <AspectRatioImage
              src={'/12.png'}
              ratio={16 / 9}
              responsiveRatio={1 / 1.1}
              distance={125}
              delay={0.575}
              className={'mb-2'}
            />
          </Section>
          <Section withPadding withGap className={'sm:pt-1.5'}>
            <AspectRatioImage
              src={'/13.png'}
              ratio={16 / 9}
              responsiveRatio={1 / 1.1}
              distance={125}
              className={'mb-2'}
            />
          </Section>
          <Section
            withPadding
            withGap
            className={'flex-col md:flex-row sm:pt-1.5'}
          >
            <div className={'md:w-1/2 w-full'} />
            <div className={'md:w-1/2 w-full'}>
              <AspectRatioImage
                src={'/12.png'}
                ratio={1 / 1.1}
                responsiveRatio={1 / 1.1}
                distance={125}
                className={'mb-2'}
              />
            </div>
          </Section>
          <Section
            withPadding
            withGap
            className={'flex-col md:flex-row sm:pt-1.5'}
          >
            <div className={'md:w-1/2 w-full'}>
              <AspectRatioImage
                src={'/12.png'}
                ratio={1 / 1.1}
                responsiveRatio={1 / 1.1}
                distance={125}
                className={'mb-2'}
              />
            </div>
            <div className={'md:w-1/2 w-full'} />
          </Section>
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
                text={'More↙More↙'}
              />
            </Marquee>
          </VelocityMarquee>
          <Table.Preview />
          <Footer />
        </Page>
      </TransitionPane>
    </React.Fragment>
  )
}
