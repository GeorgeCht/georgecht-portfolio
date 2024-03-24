import { useScrollToTop } from '@/lib/hooks'
import { repositoryName } from '@/prismicio'
import { components } from '@/slices'
import { createClient, filter, isFilled } from '@prismicio/client'
import { AllDocumentTypes, ProjectDocument } from '../../../prismicio-types'
import { SliceZone } from '@prismicio/react'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import React, { useRef } from 'react'
import Head from 'next/head'
import VelocityMarquee from '@/components/ui/velocity-marquee'
import Marquee from '@/components/ui/marquee'
import TextRevealByChar from '@/components/ui/text-reveal-char'
import Footer from '@/components/layout/footer'
import TransitionPane from '@/components/transition/pane'
import Page from '@/components/ui/page'
import ProjectStripe from '@/components/new/project-stripe'
import RelatedProjects from '@/components/table/related-projects'
import TableProject from '@/components/table/project'

type Params = { uid: string }

const Project = ({
  project,
  related,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const paneRef = useRef<HTMLDivElement>(null)
  useScrollToTop()

  return (
    <React.Fragment>
      {!project ? (
        <React.Fragment />
      ) : (
        <React.Fragment>
          <Head>
            <title>{project.data.meta_title}</title>
            {isFilled.keyText(project.data.meta_description) ? (
              <meta
                name={'description'}
                content={project.data.meta_description}
              />
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
              <ProjectStripe project={project as ProjectDocument<string>} />
              <TableProject project={project as ProjectDocument<string>} />
              <SliceZone slices={project.data.slices} components={components} />
              <VelocityMarquee className={'cursor-default'} direction={1}>
                <Marquee className={'pt-0'}>
                  <TextRevealByChar
                    as={'h2'}
                    lineHeight={'1.195em'}
                    delay={0}
                    enterY={'22.125%'}
                    className={'ml-2 pl-6'}
                    typeClass={'typography-display'}
                    text={'More↙More↙'}
                  />
                </Marquee>
              </VelocityMarquee>
              <RelatedProjects
                projects={related! as Array<ProjectDocument<string>>}
              />
              <Footer />
            </Page>
          </TransitionPane>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<Params>) {
  const client = createClient(repositoryName)

  let data: {
    project: AllDocumentTypes | undefined
    related: Array<AllDocumentTypes> | undefined
  } = {
    project: undefined,
    related: undefined,
  }
  try {
    data.project = await client.getByUID('project', params!.uid)
    data.related = await client.getAllByType('project', {
      filters: [filter.not('document.id', params!.uid)],
      pageSize: 3,
    })
  } catch (err) {}

  const notFound = data.project ? false : true

  return {
    props: { project: data.project, related: data.related },
    notFound,
  }
}

export async function getStaticPaths() {
  const client = createClient(repositoryName)
  const allProjects = await client.getAllByType('project')

  return {
    paths: allProjects.map((project) => `/project/${project.uid}`),
    fallback: false,
  }
}

export default Project
