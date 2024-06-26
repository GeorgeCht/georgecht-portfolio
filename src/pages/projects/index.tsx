'use client'

import Footer from '@/components/layout/footer'
import Reveal from '@/components/new/reveal'
import Parallax from '@/components/ui/parallax'
import TransitionPane from '@/components/transition/pane'
import Page from '@/components/ui/page'
import Section from '@/components/ui/section'
import VelocityMarquee from '@/components/ui/velocity-marquee'
import Marquee from '@/components/ui/marquee'
import TextRevealByChar from '@/components/ui/text-reveal-char'
import ArchiveList from '@/components/table/archive-list'
import TextReveal from '@/components/ui/text-reveal'
import PageHead from '@/components/misc/page-head'

import React, { useRef } from 'react'
import Link, { LinkProps } from 'next/link'
import { useScrollToTop } from '@/lib/hooks'
import { chunkedArray, cn } from '@/lib/utils'
import { createClient } from '@prismicio/client'
import { repositoryName } from '@/prismicio'
import { ProjectDocument } from '../../../prismicio-types'
import { InferGetStaticPropsType } from 'next'
import mixpanel from 'mixpanel-browser'

const ProjectEntry = ({
  index,
  project,
  className,
  ...props
}: Omit<LinkProps, 'href'> & {
  index: number
  project: ProjectDocument<string>
  className?: string
}) => {
  const headerRef = useRef<HTMLParagraphElement>(null)
  return (
    <Link
      scroll={false}
      {...props}
      className={cn('flex flex-col w-full lg:w-1/3', className)}
      href={`/project/${project.uid}`}
    >
      <Parallax.Image.Prismic
        ratio={9 / 16}
        responsiveBreakpoint={1024}
        responsiveRatio={1 / 1.1}
        distance={125}
        className={'mb-2'}
        delay={index * 0.125}
        image={project.data.cover_image}
      />
      <Reveal opacity childrenRef={headerRef} duration={1}>
        <h2 className={'typography-lg w-full md:max-w-[49vw]'} ref={headerRef}>
          {project.data.title}
        </h2>
      </Reveal>
      <TextReveal
        as={'p'}
        lineHeight={'1em'}
        enterY={'10%'}
        className={'mb-0 sm:-mb-3.5'}
        typeClass={'typography-sm'}
        text={String(project.data.year)}
      />
    </Link>
  )
}

const Projects = ({
  projects,
  archiveData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const paneRef = useRef<HTMLDivElement>(null)
  useScrollToTop()

  mixpanel.track('PageView', {
    Page: 'Projects',
  })

  return (
    <React.Fragment>
      <PageHead title={'Projects'} />
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
                text={'Projects↙'}
              />
            </Marquee>
          </VelocityMarquee>
          {chunkedArray(projects!, 3).map((chunk, index) => (
            <Section
              key={index}
              withPadding
              className={'pt-6 gap-6 sm:gap-0 pb-4 lg:flex-row'}
            >
              {chunk.map((project, _index) => (
                <ProjectEntry
                  key={project.id}
                  index={_index + 1}
                  project={project}
                />
              ))}
            </Section>
          ))}
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
                text={'Archive↙'}
              />
            </Marquee>
          </VelocityMarquee>
          <ArchiveList preview archiveData={archiveData} />
          <Footer />
        </Page>
      </TransitionPane>
    </React.Fragment>
  )
}

export async function getStaticProps() {
  const client = createClient(repositoryName)
  const archiveData = await client.getAllByType('archive', {
    pageSize: 10,
  })

  let data: {
    projects: Array<ProjectDocument<string>> | undefined
  } = {
    projects: [],
  }
  try {
    data.projects = await client.getAllByType('project', {
      pageSize: 9,
      orderings: {
        field: 'my.project.year',
        direction: 'desc',
      },
    })
  } catch (err) {}

  const notFound = data.projects ? false : true

  return {
    props: { projects: data.projects, archiveData },
    notFound,
  }
}

export default Projects
