import { useScrollToTop } from '@/lib/hooks'
import { repositoryName } from '@/prismicio'
import { components } from '@/slices'
import { createClient, isFilled, asLink } from '@prismicio/client'
import { SliceZone } from '@prismicio/react'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import React, { useRef } from 'react'

import Pill from '@/components/new/button-pill'
import VelocityMarquee from '@/components/ui/velocity-marquee'
import Marquee from '@/components/ui/marquee'
import TextRevealByChar from '@/components/ui/text-reveal-char'
import Footer from '@/components/new/footer'
import Reveal from '@/components/new/reveal'
import Table from '@/components/new/table'
import TransitionPane from '@/components/transition/pane'
import AspectRatioImage from '@/components/ui/aspect-ratio-image'
import Page from '@/components/ui/page'
import Section from '@/components/ui/section'
import ProjectStripe from '@/components/new/project-stripe'

type Params = { uid: string }

const Project = ({
  project,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const paneRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const headerRef = useRef<HTMLParagraphElement>(null)
  useScrollToTop()

  let x = project.data.external_url

  return (
    <React.Fragment>
      <Head>
        <title>{project.data.meta_title}</title>
        {isFilled.keyText(project.data.meta_description) ? (
          <meta name="description" content={project.data.meta_description} />
        ) : null}
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
                className={'ml-2 pl-6'}
                typeClass={'typography-display'}
                text={`${project.data.title}↙`}
              />
            </Marquee>
          </VelocityMarquee>
          <ProjectStripe project={project} />
          <Table.Project project={project} />
          <SliceZone slices={project.data.slices} components={components} />
          <VelocityMarquee className={'cursor-default'} direction={1}>
            <Marquee className={'pt-0'}>
              <TextRevealByChar
                as={'h1'}
                lineHeight={'1.195em'}
                delay={0}
                enterY={'22.125%'}
                className={'ml-2 pl-6'}
                typeClass={'typography-display'}
                text={'More↙More↙'}
              />
            </Marquee>
          </VelocityMarquee>
          <Footer />
        </Page>
      </TransitionPane>
    </React.Fragment>
  )
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<Params>) {
  const client = createClient(repositoryName)
  const project = await client.getByUID('project', params!.uid)

  if (!project) {
    return {
      notFound: true,
    }
  }

  return {
    props: { project },
  }
}

export async function getStaticPaths() {
  const client = createClient(repositoryName)
  const allProjects = await client.getAllByType('project')

  return {
    paths: allProjects.map((project) => `/project/${project.uid}`),
    fallback: true,
  }
}

export default Project
