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
import PageHead from '@/components/misc/page-head'
import Link from 'next/link'

import React, { useEffect, useRef } from 'react'
import data from '@/lib/staticData.json'
import {
  AnimatePresence,
  motion as Motion,
  type Variants,
  inView,
  useScroll,
  useTransform,
} from 'framer-motion'
import { createClient } from '@prismicio/client'
import { repositoryName } from '@/prismicio'
import { useScrollToTop } from '@/lib/hooks'
import { getYear, setBodyBg } from '@/lib/utils'
import type { InferGetStaticPropsType } from 'next'

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
            <Link href={'/project/anonyma'} scroll={false}>
              <Parallax.Image.Next
                src={
                  'https://images.prismic.io/georgecht-portfolio/Zg2uizskWekewCZF_mockup_ipad_browse_01.webp?auto=format,compress'
                }
                alt={'Anonyma project image'}
                ratio={16 / 9}
                responsiveRatio={1 / 1.1}
                distance={125}
                delay={0.575}
                className={'mb-2'}
              />
            </Link>
          </Section>
          <Section withPadding withGap className={'sm:pt-1.5'}>
            <Link href={'/project/webshark'} scroll={false}>
              <Parallax.Video
                src={
                  'dqoxwlhrv/video/upload/f_auto:video,w_1920,q_auto:best/srldxjezegqclif4mx5r'
                }
                ratio={16 / 9}
                responsiveRatio={1 / 1.1}
                distance={90}
                className={'mb-2'}
              />
            </Link>
          </Section>
          <Section
            withPadding
            withGap
            className={'flex-col md:flex-row sm:pt-1.5'}
          >
            <div className={'md:w-1/2 w-full'}>
              <Link href={'/project/wmovies'} scroll={false}>
                <Parallax.Video
                  src={
                    'dqoxwlhrv/video/upload/f_auto:video,w_1920,q_auto:best/sakbsgxmbmog2lnlssva'
                  }
                  ratio={1 / 1.1}
                  responsiveRatio={1 / 1.1}
                  distance={90}
                  className={'mb-2'}
                />
              </Link>
            </div>
            <div className={'md:w-1/2 w-full'}>
              <Link href={'/project/wmovies'} scroll={false}>
                <Parallax.Video
                  src={
                    'dqoxwlhrv/video/upload/f_auto:video,w_1920,q_auto:best/tbm4xopozonufpxnhdpr.mp4'
                  }
                  ratio={1 / 1.1}
                  responsiveRatio={1 / 1.1}
                  distance={90}
                  delay={0.375}
                  className={'mb-2'}
                />
              </Link>
            </div>
          </Section>
          <Section
            withPadding
            withGap
            className={'flex-col md:flex-row sm:pt-1.5'}
            id={'trigger-dark'}
          >
            <div className={'md:w-1/2 w-full'}>
              <Link href={'/project/craftcom-neue'} scroll={false}>
                <Parallax.Image.Next
                  src={
                    'https://images.prismic.io/georgecht-portfolio/ZikcJfPdc1huKvkr_ccneue_cover_mockup.jpg?auto=format,compress'
                  }
                  alt={'Craftcom Neue project image'}
                  ratio={1 / 1.1}
                  responsiveRatio={1 / 1.1}
                  distance={90}
                  className={'mb-2'}
                />
              </Link>
            </div>
            <div className={'md:w-1/2 w-full'}>
              <Link href={'/project/craftcom-neue'} scroll={false}>
                <Parallax.Video
                  src={
                    'dqoxwlhrv/video/upload/f_auto:video,w_1920,q_auto:best/mxfiwznscss6u27clvts'
                  }
                  ratio={1 / 1.1}
                  responsiveRatio={1 / 1.1}
                  distance={90}
                  delay={0.375}
                  className={'mb-2'}
                />
              </Link>
            </div>
          </Section>
          <Section
            withPadding
            withGap
            className={'flex-col md:flex-row sm:pt-1.5'}
          >
            <div className={'w-1/6 hidden lg:flex'} />
            <div className={'md:w-1/2 w-full'}>
              <Link href={'/project/netactuate'} scroll={false}>
                <Parallax.Video
                  src={
                    'dqoxwlhrv/video/upload/f_auto:video,w_1920,q_auto:best/nvir9xu8sceg9hvrmxds'
                  }
                  ratio={1 / 1.1}
                  responsiveRatio={1 / 1.1}
                  distance={90}
                  className={'mb-2'}
                />
              </Link>
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
