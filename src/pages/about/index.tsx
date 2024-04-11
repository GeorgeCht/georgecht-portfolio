'use client'

import React, { useRef } from 'react'
import { useScrollToTop } from '@/lib/hooks'
import { motion as Motion, Variants } from 'framer-motion'

import Signature from '@/components/misc/signature'
import Footer from '@/components/layout/footer'
import Reveal from '@/components/new/reveal'
import TransitionPane from '@/components/transition/pane'
import Marquee from '@/components/ui/marquee'
import Page from '@/components/ui/page'
import Section from '@/components/ui/section'
import TextReveal from '@/components/ui/text-reveal'
import TextRevealByChar from '@/components/ui/text-reveal-char'
import VelocityMarquee from '@/components/ui/velocity-marquee'
import data from '@/lib/staticData.json'
import PageHead from '@/components/misc/page-head'

export default function About() {
  const paneRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const variants: Variants = {
    initial: { width: '0%' },
    enter: {
      width: '100%',
      transition: {
        duration: 1.675,
        ease: [1, 0, 0.01, 1],
        delay: 0.666,
      },
    },
    exit: {
      width: '0%',
      transition: {
        duration: 1,
        ease: [1, 0, 0.01, 1],
        delay: 0.666 / 4,
      },
    },
  }

  useScrollToTop()

  return (
    <React.Fragment>
      <PageHead title={'About'} />
      <TransitionPane ref={paneRef}>
        <Page className={'flex flex-col justify-between'}>
          <section>
            <VelocityMarquee className={'cursor-default'} direction={1}>
              <Marquee className={'pt-0'} text={'About↙About↙'}>
                <TextRevealByChar
                  as={'h1'}
                  lineHeight={'1.195em'}
                  delay={0}
                  enterY={'22.125%'}
                  className={'ml-2 pl-6'}
                  typeClass={'typography-display'}
                  text={'About↙About↙'}
                />
              </Marquee>
            </VelocityMarquee>
            <Section
              withPadding
              withGap
              className={'sm:flex-row pt-4 sm:pt-2 gap-2.5 w-full'}
            >
              <div className={'w-1/6 hidden lg:flex flex-col'}>
                <TextReveal
                  as={'h5'}
                  lineHeight={'0.9em'}
                  enterY={'10%'}
                  className={'mb-6 sm:mb-6'}
                  typeClass={'typography-caps-sm'}
                  text={'Location'}
                />
                <TextReveal
                  as={'p'}
                  lineHeight={'1em'}
                  enterY={'0%'}
                  typeClass={'typography-sm'}
                  className={'-mb-2 sm:-mb-2'}
                  text={data.info.location.split(' ')[0]}
                  delay={0}
                />
                <TextReveal
                  as={'p'}
                  lineHeight={'1em'}
                  enterY={'0%'}
                  typeClass={'typography-sm'}
                  className={'-mb-2 sm:-mb-2'}
                  text={data.info.location.split(' ')[1]}
                  delay={0.25}
                />
              </div>
              <div
                className={
                  'w-full flex flex-col sm:w-1/2 lg:w-1/3 pb-2.5 sm:pb-0'
                }
              >
                <TextReveal
                  as={'h5'}
                  lineHeight={'0.9em'}
                  enterY={'10%'}
                  className={'mb-0 sm:mb-6'}
                  typeClass={'typography-caps-sm'}
                  text={'Skillset'}
                  delay={0.275}
                />
                {data.info.skillset.map((skill, index) => (
                  <TextReveal
                    key={index}
                    as={'p'}
                    lineHeight={'1em'}
                    enterY={'0%'}
                    typeClass={'typography-sm mr-1'}
                    className={'-mb-2 sm:-mb-2'}
                    text={skill}
                    delay={0.275 + index * 0.175}
                  />
                ))}
              </div>
              <div className={'w-full sm:w-1/2 lg:w-1/3'}>
                <TextReveal
                  as={'h5'}
                  lineHeight={'0.9em'}
                  enterY={'10%'}
                  className={'mb-4 sm:mb-8'}
                  typeClass={'typography-caps-sm'}
                  text={'About'}
                  delay={1.275}
                />
                <TextReveal
                  as={'h2'}
                  lineHeight={'1em'}
                  enterY={'-7%'}
                  className={'mb-4 sm:mb-8'}
                  typeClass={'typography-lg'}
                  text={data.info.about.title}
                  delay={0}
                />
                <Reveal
                  opacity
                  childrenRef={textRef}
                  duration={1}
                  delay={1.675}
                >
                  <p className={'typography-base max-w-[620px]'} ref={textRef}>
                    {data.info.about.paragraph}
                  </p>
                </Reveal>
              </div>
              <div className={'w-1/6 hidden lg:flex'} />
            </Section>
          </section>
          <Section
            withPadding
            withGap
            ref={sectionRef}
            className={'sm:flex-row gap-2.5 w-full'}
          >
            <div className={'w-1/2 hidden sm:flex'} />
            <div className={'w-full sm:w-1/2 flex flex-col'}>
              <Signature className={'max-w-[432px] z-10 mt-6'} />
              <Motion.hr
                variants={variants}
                initial={'initial'}
                animate={'enter'}
                exit={'exit'}
                className={'-mt-3.5 pb-8 z-0 inline-block border-black/15'}
              />
            </div>
          </Section>
          <Footer />
        </Page>
      </TransitionPane>
    </React.Fragment>
  )
}
