import { useRef } from 'react'
import { ProjectDocument } from '../../../prismicio-types'

import Pill from '@/components/new/button-pill'
import Reveal from '@/components/new/reveal'
import Section from '@/components/ui/section'

const ProjectStripe = ({ project }: { project: ProjectDocument<string> }) => {
  const data = project.data
  const buttonRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const headerRef = useRef<HTMLParagraphElement>(null)
  return (
    <Section
      withPadding
      withGap
      className={'pt-0 sm:pt-0 lg:flex-row gap-1 sm:gap-2.5 w-full'}
    >
      <div className={'w-1/6 flex lg:flex sm:hidden'}>
        <Reveal
          opacity
          childrenRef={headerRef}
          duration={1}
          outterClass={'sm:h-full !h-[42px]'}
        >
          <p
            className={'typography-lg w-full md:max-w-[49vw] scale-x-[-1]'}
            ref={headerRef}
          >
            ↙
          </p>
        </Reveal>
      </div>
      <div className={'w-full lg:w-1/3'}>
        <Reveal opacity childrenRef={headerRef} duration={1}>
          <h1
            className={'typography-lg w-full md:max-w-[49vw]'}
            ref={headerRef}
          >
            {data.heading}
          </h1>
        </Reveal>
        <Reveal
          opacity
          childrenRef={textRef}
          duration={1}
          delay={0.175}
          className={'pt-1.5'}
        >
          <p className={'typography-base w-full md:max-w-[49vw]'} ref={textRef}>
            {data.description}
          </p>
        </Reveal>
        <div className={'mt-4 pb-0 sm:pb-4'}></div>
      </div>
      <div className={'w-full sm:w-1/2 lg:w-1/3 hidden lg:flex'} />
      <div
        className={'w-full lg:w-1/6 pt-0 sm:pt-4 flex flex-col pb-2 lg:pb-0'}
      >
        <Reveal
          y={false}
          className={'h-[42px]'}
          height={42}
          childrenRef={buttonRef}
          opacity
          delay={0.175}
        >
          <div className={'block relative pt-2'} ref={buttonRef}>
            <Pill.PrismicLink
              innerText={'Visit ↗'}
              field={data.external_url}
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
              href={`/project/${project.uid}`}
              scroll={false}
            />
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

export default ProjectStripe
