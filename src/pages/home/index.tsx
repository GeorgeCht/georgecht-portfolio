'use client'

import TransitionPane from '@/components/transition/pane'
import Page from '@/components/ui/page'
import Head from 'next/head'

import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  useRef,
  useState,
} from 'react'
import { useScrollToTop } from '@/lib/hooks'
import TextReveal from '@/components/ui/text-reveal'
import { cn, getYear } from '@/lib/utils'
import Barcode from '@/components/misc/barcode'
import TextRevealByChar from '@/components/ui/text-reveal-char'
import Link from 'next/link'
import { ImageFieldImage } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import Magnetic from '@/components/ui/magnetic'

const TextEntry = ({
  leftSide = [],
  rightSide = [],
  leftSideUrl,
  rightSideUrl,
  onLeftSideMouseEnter,
  onRightSideMouseEnter,
  delay = 0,
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  leftSide?: Array<string>
  rightSide?: Array<string>
  leftSideUrl?: string
  rightSideUrl?: string
  onLeftSideMouseEnter?: React.MouseEventHandler<HTMLDivElement> | undefined
  onRightSideMouseEnter?: React.MouseEventHandler<HTMLDivElement> | undefined
  delay?: number
}) => {
  return (
    <div
      className={cn(
        'flex flex-col min-[390px]:flex-row *:w-full relative',
        className,
      )}
      {...props}
    >
      <div onMouseEnter={onLeftSideMouseEnter}>
        {leftSideUrl ? (
          <Link href={leftSideUrl!}>
            <Magnetic>
              {leftSide.map((textEntries, index) => {
                return (
                  <TextReveal
                    key={index}
                    as={'span'}
                    lineHeight={'0.9em'}
                    enterY={'10%'}
                    className={'-mb-3.5 pb-0'}
                    typeClass={'typography-caps-sm mr-0.5'}
                    text={textEntries}
                    delay={delay * index * 0.075}
                  />
                )
              })}
            </Magnetic>
          </Link>
        ) : (
          <React.Fragment>
            {leftSide.map((textEntries, index) => {
              return (
                <TextReveal
                  key={index}
                  as={'span'}
                  lineHeight={'0.9em'}
                  enterY={'10%'}
                  className={'-mb-3.5 pb-0'}
                  typeClass={'typography-caps-sm mr-0.5'}
                  text={textEntries}
                  delay={delay * index * 0.075}
                />
              )
            })}
          </React.Fragment>
        )}
      </div>
      <div onMouseEnter={onRightSideMouseEnter}>
        {rightSideUrl ? (
          <Link href={rightSideUrl!}>
            <Magnetic>
              {rightSide.map((textEntries, index) => {
                return (
                  <TextReveal
                    key={index}
                    as={'span'}
                    lineHeight={'0.9em'}
                    enterY={'10%'}
                    className={'-mb-3.5 pb-0'}
                    typeClass={'typography-caps-sm mr-0.5'}
                    text={textEntries}
                    delay={delay * index * 0.175}
                  />
                )
              })}
            </Magnetic>
          </Link>
        ) : (
          <React.Fragment>
            {rightSide.map((textEntries, index) => {
              return (
                <TextReveal
                  key={index}
                  as={'span'}
                  lineHeight={'0.9em'}
                  enterY={'10%'}
                  className={'-mb-3.5 pb-0'}
                  typeClass={'typography-caps-sm mr-0.5'}
                  text={textEntries}
                  delay={delay * index * 0.175}
                />
              )
            })}
          </React.Fragment>
        )}
      </div>
    </div>
  )
}

const Home = () => {
  const [mouseHover, setMouseHover] = useState(false)
  const [isHoveringProjects, setIsHoveringProjects] = useState(false)
  const [hoverImage, setHoverImage] = useState(0)
  const paneRef = useRef<HTMLDivElement>(null)
  const page = useRef<HTMLElement>(null)
  const pageTitle = `GeorgeCht ©${getYear()}`

  useScrollToTop()

  const onMouseEnter = () => {
    setMouseHover(true)
  }

  const onMouseLeave = () => {
    setMouseHover(false)
  }

  const images: Array<ImageFieldImage | null | undefined> = [
    {
      dimensions: { width: 3124, height: 3124 },
      alt: 'NetActuate by GeorgeCht, design portfolio showcase',
      copyright: null,
      url: 'https://images.prismic.io/georgecht-portfolio/ZhF6tBrFxhpPBWbr_macbook_mockup.jpg?auto=format,compress',
      id: 'ZhF6tBrFxhpPBWbr',
      edit: { x: 0, y: 0, zoom: 1, background: 'transparent' },
    },
    {
      dimensions: { width: 2459, height: 1620 },
      alt: 'ProductEVO by GeorgeCht, design portfolio showcase',
      copyright: null,
      url: 'https://images.prismic.io/georgecht-portfolio/ZhKdxxrFxhpPBWu0_cover_image_evo.jpg?auto=format,compress',
      id: 'ZhKdxxrFxhpPBWu0',
      edit: { x: 0, y: 0, zoom: 1, background: 'transparent' },
    },
    {
      dimensions: { width: 4400, height: 4400 },
      alt: 'Anonyma web app cover image',
      copyright: null,
      url: 'https://images.prismic.io/georgecht-portfolio/Zg2ujTskWekewCZG_mockup_iphone_chat_01.webp?auto=format,compress',
      id: 'Zg2ujTskWekewCZG',
      edit: { x: 0, y: 0, zoom: 1, background: 'transparent' },
    },
    {
      dimensions: { width: 2190, height: 1603 },
      alt: 'Craftcom Neue display poster',
      copyright: null,
      url: 'https://images.prismic.io/georgecht-portfolio/Zgbwy8t2UUcvBR3K_poster-1.jpg?auto=format,compress',
      id: 'Zgbwy8t2UUcvBR3K',
      edit: { x: 0, y: 0, zoom: 1, background: 'transparent' },
    },
    {
      dimensions: { width: 2967, height: 2225 },
      alt: 'WebShark by GeorgeCht, design portfolio showcase',
      copyright: null,
      url: 'https://images.prismic.io/georgecht-portfolio/ZhPGrhrFxhpPBXb8_macbook_mockup.jpg?auto=format,compress',
      id: 'ZhPGrhrFxhpPBXb8',
      edit: { x: 0, y: 0, zoom: 1, background: 'transparent' },
    },
  ]

  return (
    <React.Fragment>
      <Head>
        <title>{pageTitle}</title>
        <meta name={'description'} content={'Generated by create next app'} />
        <meta
          name={'viewport'}
          content={'width=device-width, initial-scale=1'}
        />
        <link rel={'icon'} href={'/favicon.ico'} />
      </Head>

      <TransitionPane ref={paneRef}>
        <Page className={'justify-end'} ref={page}>
          {isHoveringProjects && (
            <div
              className={
                'absolute hidden min-[1520px]:flex items-center justify-center w-full h-full top-0 left-0 z-50 pointer-events-none'
              }
            >
              <div
                className={
                  'w-[628px] h-[874px] relative flex flex-row overflow-hidden'
                }
              >
                <PrismicNextImage
                  field={images[hoverImage]}
                  fill
                  priority
                  className={
                    'object-cover scale-100 hover:scale-[1.01] transition-transform ease-in-out will-change-transform duration-1000'
                  }
                />
              </div>
            </div>
          )}
          <div
            className={cn(
              'md:absolute flex flex-col left-0 -top-3 transition-opacity mt-14 md:mt-0 z-0',
              mouseHover ? 'opacity-0' : 'opacity-100',
            )}
          >
            <TextRevealByChar
              as={'h2'}
              lineHeight={'1.195em'}
              delay={0}
              enterY={'22.125%'}
              className={'ml-1 pl-6'}
              typeClass={'typography-display-intro'}
              text={`↙`}
            />
            <TextRevealByChar
              as={'h1'}
              lineHeight={'1.195em'}
              delay={0.125}
              enterY={'22.125%'}
              className={'ml-1 pl-6 -mt-[2.375vw]'}
              typeClass={'typography-display-intro'}
              text={`George`}
            />
            <TextRevealByChar
              as={'h2'}
              lineHeight={'1.195em'}
              delay={0.25}
              enterY={'22.125%'}
              className={'ml-1 pl-6 -mt-[2.375vw]'}
              typeClass={'typography-display-intro'}
              text={`Cht©${getYear()}`}
            />
            <TextRevealByChar
              as={'h2'}
              lineHeight={'1.195em'}
              delay={0.375}
              enterY={'22.125%'}
              className={'ml-1 pl-6 -mt-[2.375vw]'}
              typeClass={'typography-display-intro'}
              text={`George`}
            />
            <TextRevealByChar
              as={'h2'}
              lineHeight={'1.195em'}
              delay={0.5}
              enterY={'22.125%'}
              className={'ml-1 pl-6 -mt-[2.375vw]'}
              typeClass={'typography-display-intro'}
              text={`Cht©${getYear()}`}
            />
          </div>
          <div
            className={
              'flex flex-col md:flex-row gap-10 md:gap-0 justify-between relative w-full p-2 pt-16 md:pt-0'
            }
          >
            <div
              className={'flex flex-col gap-10 md:gap-20 w-full md:w-[468px]'}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              <TextEntry leftSide={['Intro', 'section']} />
              <Link href={'/contact'}>
                <Magnetic>
                  <TextEntry
                    leftSide={[
                      'Working at the intersection',
                      'of web development & design',
                    ]}
                    rightSide={['Available for new', 'projects from may 2024']}
                  />
                </Magnetic>
              </Link>

              <Link href={'/about'}>
                <Magnetic>
                  <TextEntry
                    delay={0.125}
                    leftSide={['About', 'George']}
                    rightSide={[
                      'George chatziiordanou is a ',
                      'greece based front-end',
                      'developer & web designer, with',
                      'over 8 years of experience',
                      'from freelancing to working',
                      'with agencies',
                    ]}
                  />
                </Magnetic>
              </Link>

              <Link href={'/cv'}>
                <Magnetic>
                  <TextEntry
                    delay={0.25}
                    leftSide={['design', 'software']}
                    rightSide={[
                      'figma',
                      'adobe photoshop',
                      'adobe illustrator',
                      'adobe after effects',
                      'adobe premiere',
                      'fontlab',
                    ]}
                  />
                </Magnetic>
              </Link>
              <Link href={'/cv'}>
                <Magnetic>
                  <TextEntry
                    delay={0.375}
                    leftSide={['tech', 'stack']}
                    rightSide={[
                      'html/css/js',
                      'nodejs',
                      'react',
                      'nextjs',
                      'tailwind',
                      'wordpress',
                      'git',
                    ]}
                  />
                </Magnetic>
              </Link>
              <div className={'hidden md:flex'}>
                <Barcode width={104} height={56} delay={0.985} />
              </div>
            </div>
            <div
              onMouseEnter={() => {
                setIsHoveringProjects(true)
              }}
              onMouseLeave={() => {
                setIsHoveringProjects(false)
              }}
              className={
                'flex flex-col gap-10 md:gap-20 w-full md:w-[468px] group'
              }
            >
              <TextEntry
                leftSide={['Selected', 'Projects']}
                rightSide={['↙']}
              />
              <TextEntry
                delay={0.125}
                onLeftSideMouseEnter={() => {
                  setHoverImage(2)
                }}
                leftSideUrl={'/project/anonyma'}
                leftSide={[
                  'anonyma web app',
                  'self-initiated',
                  'ui/ux design',
                  'front-end dev',
                  ' ',
                  '2024',
                ]}
                rightSideUrl={'/project/craftcom-neue'}
                onRightSideMouseEnter={() => {
                  setHoverImage(3)
                }}
                rightSide={[
                  'craftcom neue',
                  'self-initiated',
                  'typeface design',
                  'graphic design',
                  ' ',
                  '2023-2024',
                ]}
              />
              <TextEntry
                delay={0.25}
                onLeftSideMouseEnter={() => {
                  setHoverImage(1)
                }}
                leftSideUrl={'/project/product-evo'}
                leftSide={[
                  'product evo',
                  'for productevo ltd.',
                  'web design',
                  ' ',
                  '2022',
                ]}
                onRightSideMouseEnter={() => {
                  setHoverImage(0)
                }}
                rightSideUrl={'/project/netactuate'}
                rightSide={[
                  'netactuate',
                  'for netactuate, inc.',
                  'ui/ux design',
                  'concept design',
                  ' ',
                  '2023',
                ]}
              />
              <TextEntry
                delay={0.375}
                onLeftSideMouseEnter={() => {
                  setHoverImage(5)
                }}
                leftSideUrl={'/project/anassa'}
                leftSide={[
                  'anassa general',
                  'for anassa general',
                  'web design',
                  'wordpress dev',
                  ' ',
                  '2023',
                ]}
                onRightSideMouseEnter={() => {
                  setHoverImage(4)
                }}
                rightSideUrl={'/project/webshark'}
                rightSide={[
                  'webshark',
                  'via 99designs',
                  'web design',
                  'motion design',
                  ' ',
                  '2021',
                ]}
              />

              <div className={'flex md:hidden'}>
                <Barcode width={104} height={56} delay={0.325} />
              </div>
            </div>
          </div>
        </Page>
      </TransitionPane>
    </React.Fragment>
  )
}

export default Home
