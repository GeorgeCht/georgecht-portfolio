'use client'

import Footer from '@/components/layout/footer'
import IntroStripe from '@/components/new/intro-stripe'
import Reveal from '@/components/new/reveal'
import TransitionPane from '@/components/transition/pane'
import Marquee from '@/components/ui/marquee'
import Page from '@/components/ui/page'
import Section from '@/components/ui/section'
import TextRevealByChar from '@/components/ui/text-reveal-char'
import VelocityMarquee from '@/components/ui/velocity-marquee'
import ArchiveList from '@/components/table/archive-list'
import Parallax from '@/components/ui/parallax'

import React, { useEffect, useRef } from 'react'
import data from '@/lib/staticData.json'
import {
  AnimatePresence,
  motion as Motion,
  Variants,
  inView,
  useScroll,
  useTransform,
} from 'framer-motion'
import { createClient } from '@prismicio/client'
import { repositoryName } from '@/prismicio'
import { useScrollToTop } from '@/lib/hooks'
import { getYear, setBodyBg } from '@/lib/utils'
import { InferGetStaticPropsType } from 'next'
import PageHead from '@/components/misc/page-head'

const Home = ({
  archiveData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const paneRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const page = useRef<HTMLElement>(null)
  useScrollToTop()

  const { scrollYProgress } = useScroll()
  const offsetTop = useTransform(scrollYProgress, [0, 0.215], ['-200vh', '0vh'])
  const offsetRound = useTransform(scrollYProgress, [0, 0.195], ['100%', '0%'])

  useEffect(() => {
    inView('#trigger-dark', () => {
      setBodyBg('#000')
    })
  }, [])

  const variants: Variants = {
    initial: { opacity: 0 },
    enter: {
      opacity: 1,
      transition: {
        duration: 1,
        ease: [1, 0, 0.01, 1],
        delay: 0,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.675,
        ease: [1, 0, 0.01, 1],
        delay: 0,
      },
    },
  }

  return (
    <React.Fragment>
      <PageHead />
      <TransitionPane ref={paneRef}>
        <Page ref={page}>
          <AnimatePresence mode={'wait'}>
            <Motion.div
              key={9999}
              custom={9999}
              variants={variants}
              initial={'initial'}
              animate={'enter'}
              exit={'exit'}
              className={
                'flex flex-col items-center justify-center fixed inset-0'
              }
              style={{
                top: offsetTop,
              }}
            >
              <Motion.div className={'bg-black relative w-full h-[50vh]'} />
              <Motion.div
                className={
                  'bg-black relative w-[125vw] h-[calc(50vh+1px)] -mt-[1px]'
                }
                style={{
                  borderBottomLeftRadius: offsetRound,
                  borderBottomRightRadius: offsetRound,
                }}
              />
            </Motion.div>
          </AnimatePresence>
          <VelocityMarquee
            className={'cursor-default mix-blend-difference'}
            direction={1}
          >
            <Marquee className={'pt-0'}>
              <TextRevealByChar
                as={'h1'}
                lineHeight={'1.195em'}
                delay={0}
                enterY={'22.125%'}
                className={'ml-2 pl-6 text-white'}
                typeClass={'typography-display'}
                text={`GeorgeCht©${getYear()}`}
              />
            </Marquee>
          </VelocityMarquee>
          <IntroStripe id={'trigger-light'} />
          <Section withPadding withGap className={'sm:pt-1.5'}>
            <Parallax.Image.Next
              src={'/10.png'}
              alt={'Project image'}
              ratio={16 / 9}
              responsiveRatio={1 / 1.1}
              distance={125}
              delay={0.575}
              className={'mb-2'}
            />
          </Section>
          <Section withPadding withGap className={'sm:pt-1.5'}>
            <Parallax.Video
              src={
                'dqoxwlhrv/video/upload/f_auto:video,w_1920,q_auto:best/xx36shsmwnxo8doholak'
              }
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
              <Parallax.Image.Next
                src={'/12.png'}
                alt={'Project image'}
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
            id={'trigger-dark'}
          >
            <div className={'md:w-1/2 w-full'}>
              <Parallax.Image.Next
                src={'/12.png'}
                alt={'Project image'}
                ratio={1 / 1.1}
                responsiveRatio={1 / 1.1}
                distance={125}
                className={'mb-2'}
              />
            </div>
            <div className={'md:w-1/2 w-full'} />
          </Section>
          <Section
            withPadding
            withGap
            className={'flex-col md:flex-row sm:pt-1.5'}
          >
            <div className={'w-1/6 hidden lg:flex'} />
            <div className={'md:w-1/2 w-full'}>
              <Parallax.Image.Next
                src={'/12.png'}
                alt={'Project image'}
                ratio={1 / 1.1}
                responsiveRatio={1 / 1.1}
                distance={125}
                className={'mb-2'}
              />
            </div>
            <div className={'w-4/12 hidden lg:flex'} />
          </Section>

          <Section
            withPadding
            withGap
            className={'sm:flex-row pt-0 sm:pt-48 gap-2.5 w-full'}
          >
            <div className={'w-1/6 hidden lg:flex'} />
            <div className={'w-full sm:w-1/2 lg:w-1/3'}>
              <Reveal opacity childrenRef={textRef} duration={1}>
                <p
                  className={'typography-base max-w-[620px] text-white'}
                  ref={textRef}
                >
                  {data.info.archive.text[0]}
                </p>
              </Reveal>
            </div>
            <div className={'w-full sm:w-1/2 lg:w-1/3'}>
              <Reveal opacity childrenRef={textRef} duration={1} delay={0.275}>
                <p
                  className={'typography-base max-w-[620px] text-white'}
                  ref={textRef}
                >
                  {data.info.archive.text[1]}
                </p>
              </Reveal>
            </div>
            <div className={'w-1/6 hidden lg:flex'} />
          </Section>
          <ArchiveList preview theme={'light'} archiveData={archiveData} />
          <Footer theme={'light'} />
        </Page>
      </TransitionPane>
    </React.Fragment>
  )
}

export async function getStaticProps() {
  const client = createClient(repositoryName)
  const data = await client.getAllByType('archive', {
    pageSize: 10,
  })
  return {
    props: { archiveData: data },
  }
}

export default Home
