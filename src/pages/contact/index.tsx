'use client'

import Footer from '@/components/layout/footer'
import TransitionPane from '@/components/transition/pane'
import Magnetic from '@/components/ui/magnetic'
import Marquee from '@/components/ui/marquee'
import Page from '@/components/ui/page'
import Section from '@/components/ui/section'
import TextReveal from '@/components/ui/text-reveal'
import TextRevealByChar from '@/components/ui/text-reveal-char'
import VelocityMarquee from '@/components/ui/velocity-marquee'
import data from '@/lib/staticData.json'

import TextRevealFlip from '@/components/ui/text-reveal-flip'
import PageHead from '@/components/misc/page-head'
import Image from 'next/image'
import Link from 'next/link'

import { motion as Motion } from 'framer-motion'
import { useScrollToTop } from '@/lib/hooks'
import React, { useRef } from 'react'

export default function About() {
  const paneRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const animation = {
    initial: { maskSize: '100% 0%' },
    enter: {
      maskSize: '100% 100%',
      transition: {
        duration: 1.675,
        ease: [1, 0, 0.01, 1],
        delay: 0.825,
      },
    },
    exit: {
      maskSize: '100% 0%',
      transition: {
        duration: 0.625,
        ease: [1, 0, 0.01, 1],
        delay: 0,
      },
    },
  }
  useScrollToTop()

  return (
    <React.Fragment>
      <PageHead title={'Contact'} />
      <TransitionPane ref={paneRef}>
        <Page className={'flex flex-col justify-between'}>
          <VelocityMarquee className={'cursor-default'} direction={1}>
            <Marquee className={'pt-0'} text={'Contact↙Contact↙'}>
              <TextRevealByChar
                as={'h1'}
                lineHeight={'1.195em'}
                delay={0}
                enterY={'22.125%'}
                id={'hero-entry'}
                className={'ml-2 pl-6'}
                typeClass={'typography-display'}
                text={'Contact↙Contact↙'}
              />
            </Marquee>
          </VelocityMarquee>
          <Section
            withPadding
            withGap
            className={'sm:flex-row pt-4 sm:pt-2 gap-2.5 w-full'}
          >
            <div className={'w-1/6 flex flex-col'}>
              <TextReveal
                as={'h5'}
                lineHeight={'0.9em'}
                enterY={'10%'}
                className={'mb-0 sm:mb-6'}
                typeClass={'typography-caps-sm'}
                text={'Email'}
              />
              <div className={'w-fit hover:cursor-pointer'}>
                <Magnetic className={'-mb-1.5'}>
                  <TextRevealFlip
                    as={'p'}
                    lineHeight={'0.95em'}
                    enterY={'0%'}
                    className={'typography-sm'}
                    text={data.email}
                    delay={0}
                  />
                </Magnetic>
              </div>
            </div>
            <div className={'w-full flex flex-col sm:w-1/2 lg:w-1/3'}>
              <TextReveal
                as={'h5'}
                lineHeight={'0.9em'}
                enterY={'10%'}
                className={'mb-0 sm:mb-6'}
                typeClass={'typography-caps-sm'}
                text={'Social'}
                delay={0.275}
              />
              <ul>
                {data.social.map((item, index) => (
                  <li className={'sm:mb-0 -mb-2.5'} key={index}>
                    <Link
                      className={'block w-fit'}
                      href={item.url}
                      scroll={false}
                    >
                      <Magnetic className={'-mb-1.5'}>
                        <TextRevealFlip
                          as={'p'}
                          lineHeight={'0.95em'}
                          enterY={'0%'}
                          className={'typography-sm'}
                          text={`${item.title}↗`}
                          delay={0.275 + index * 0.175}
                        />
                      </Magnetic>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div
              ref={wrapperRef}
              className={'relative w-full sm:w-1/2 lg:w-1/3 overflow-hidden'}
            >
              <Motion.div
                className={'inset-0 z-[1]'}
                variants={animation}
                initial={'initial'}
                animate={'enter'}
                exit={'exit'}
                style={{
                  maskImage: 'linear-gradient(to bottom, #000, #000)',
                  maskRepeat: 'no-repeat',
                }}
              >
                <Image
                  src={data.info.about.image.src}
                  alt={data.info.about.image.alt}
                  width={data.info.about.image.width}
                  height={data.info.about.image.height}
                />
              </Motion.div>
            </div>
            <div className={'w-1/6 hidden lg:flex'} />
          </Section>
          <Footer />
        </Page>
      </TransitionPane>
    </React.Fragment>
  )
}
