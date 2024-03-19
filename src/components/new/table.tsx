import React, { HTMLAttributes, useEffect, useRef } from 'react'
import TextReveal from '@/components/ui/text-reveal'
import Pill from './button-pill'
import Reveal from './reveal'
import Magnetic from '../ui/magnetic'
import { cn } from '@/lib/utils'
import { Accordion, AccordionItem } from '@nextui-org/react'
import Image from 'next/image'
import BezierCurve from './bezier-curve'
import { ProjectDocument } from '../../../prismicio-types'
import Link from 'next/link'

const projects = [
  {
    year: 2024,
    title: 'C2 Montreal',
    client: 'Self-initiated',
    role: 'Typeface Design',
    image: '/12.png',
    color: '#000000',
  },
  {
    year: 2024,
    title: 'Office Studio',
    client: 'Anassa General',
    role: 'Typeface Design',
    image: '/13.png',
    color: '#8C8C8C',
  },
  {
    year: 2024,
    title: 'Craftcom Neue Grotesque',
    client: 'Apple',
    role: 'Typeface Design',
    image: '/12.png',
    color: '#EFE8D3',
  },
  {
    year: 2024,
    title: 'Silencio',
    client: 'Apple',
    role: 'Typeface Design',
    image: '/13.png',
    color: '#706D63',
  },
  {
    year: 2024,
    title: 'React Partial Render',
    client: 'Self-initiated',
    role: 'Typeface Design',
    image: '/12.png',
    color: '#000000',
  },
  {
    year: 2024,
    title: 'Tailwind Expose Colors Plugin',
    client: 'Self-initiated',
    role: 'Typeface Design',
    image: '/13.png',
    color: '#8C8C8C',
  },
  {
    year: 2024,
    title: 'Locomotive',
    client: 'Apple',
    role: 'Typeface Design',
    image: '/12.png',
    color: '#EFE8D3',
  },
  {
    year: 2024,
    title: 'Silencio',
    client: 'Apple',
    role: 'Typeface Design',
    image: '/13.png',
    color: '#706D63',
  },
  {
    year: 2024,
    title: 'C2 Montreal',
    client: 'Apple',
    role: 'Typeface Design',
    image: '/12.png',
    color: '#000000',
  },
  {
    year: 2024,
    title: 'Office Studio',
    client: 'Apple',
    role: 'Typeface Design',
    image: '/13.png',
    color: '#8C8C8C',
  },
]

const TableRoot = ({
  children,
  className,
  fadeBottom = false,
  viewAll = false,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  fadeBottom?: boolean
  viewAll?: boolean
}) => {
  return (
    <section className={cn('mb-48', className)}>
      <div
        className={cn(
          'relative flex flex-col gap-2.5 px-2.5 md:px-4 pt-2 md:pt-6 w-full',
          fadeBottom &&
            'gradient-mask-t-[transparent_0%,rgba(0,0,0,1)_50%,rgba(0,0,0,1)_100%]',
        )}
        {...props}
      >
        {children}
      </div>

      {viewAll && (
        <div
          className={'flex flex-row gap-2.5 px-2.5 md:px-4 mt-16 w-full'}
          {...props}
        >
          <div className={'w-1/6 hidden lg:flex'} />
          <div className={'lg:w-5/6 w-full flex'}>
            <Reveal y={false} opacity delay={0.5}>
              <Pill.ButtonFlip
                innerText={'View all ↗'}
                href={'/archive'}
                scroll={false}
              />
            </Reveal>
          </div>
        </div>
      )}
    </section>
  )
}

const TableHead = ({
  className,
  theme = 'dark',
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  theme?: 'dark' | 'light'
}) => {
  return (
    <div
      className={cn(
        'flex flex-row-reverse sm:flex-row gap-2.5 pt-6 sm:pt-20 pb-2 sm:pb-10 w-full',
        theme === 'dark' ? 'text-black' : 'text-white',
        className,
      )}
      {...props}
    >
      <div className={'w-1/6 flex lg:flex sm:hidden'}>
        <TextReveal
          as={'h5'}
          lineHeight={'0.9em'}
          enterY={'10%'}
          className={'mb-1.5 sm:-mb-3.5'}
          typeClass={'typography-caps-sm'}
          text={'Year'}
        />
      </div>
      <div className={'w-full sm:w-1/2 lg:w-1/3'}>
        <TextReveal
          as={'h5'}
          lineHeight={'0.9em'}
          enterY={'10%'}
          className={'mb-1.5 sm:-mb-3.5'}
          typeClass={'typography-caps-sm'}
          text={'Project'}
        />
      </div>

      <div className={'w-full sm:w-1/2 lg:w-1/3'}>
        <TextReveal
          as={'h5'}
          lineHeight={'0.9em'}
          enterY={'10%'}
          className={'mb-1.5 sm:-mb-3.5'}
          typeClass={'typography-caps-sm'}
          text={'Client'}
        />
      </div>

      <div className={'w-1/6 hidden lg:flex'}>
        <TextReveal
          as={'h5'}
          lineHeight={'0.9em'}
          enterY={'10%'}
          className={'mb-1.5 sm:-mb-3.5 w-full h-[0.9em] overflow-hidden'}
          typeClass={'typography-caps-sm'}
          text={'Role'}
        />
      </div>
    </div>
  )
}

const TableRow = ({
  year,
  project,
  client,
  roleField: role,
  index = 0,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  year: string | number
  project: string
  client: string
  roleField: string
  href: string
  index?: number
  magnetic?: boolean
}) => {
  const animation = {
    delay: index * 0.025,
    step: 0.035,
  }
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div key={index} className={'group'}>
      <Magnetic>
        <div
          ref={ref}
          className={
            'flex flex-row-reverse sm:flex-row gap-1 sm:gap-2.5 pt-3 pb-1.5 sm:pb-0 w-full *:transition-all'
          }
          {...props}
        >
          <div className={'w-1/6 flex lg:flex sm:hidden'}>
            <TextReveal
              as={'p'}
              lineHeight={'1em'}
              enterY={'10%'}
              delay={animation.delay}
              className={'mb-0 sm:-mb-3.5'}
              typeClass={'typography-sm'}
              text={String(year)}
            />
          </div>
          <div className={'w-full sm:w-1/2 lg:w-1/3'}>
            <TextReveal
              as={'p'}
              lineHeight={'1.3em'}
              enterY={'10%'}
              delay={animation.delay + animation.step}
              className={'-mb-1 sm:-mb-3.5 w-fit'}
              typeClass={'typography-md mr-1.5'}
              text={project}
            />
          </div>

          <div className={'w-full sm:w-1/2 lg:w-1/3'}>
            <TextReveal
              as={'p'}
              lineHeight={'1.3em'}
              enterY={'10%'}
              delay={animation.delay + animation.step * 2}
              className={'-mb-1 -mt-0.5 sm:-mb-3.5'}
              typeClass={'typography-md mr-1.5'}
              text={client}
            />
          </div>

          <div className={'w-1/6 -mt-1 hidden lg:flex'}>
            <TextReveal
              as={'p'}
              lineHeight={'1.3em'}
              enterY={'10%'}
              delay={animation.delay + animation.step * 3}
              className={'mb-1.5 sm:-mb-3.5'}
              typeClass={'typography-md'}
              text={role}
            />
          </div>
        </div>
      </Magnetic>
    </div>
  )
}

const TableDisplay = ({
  year,
  project,
  client,
  roleField: role,
  index = 0,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  year: string | number
  project: string
  client: string
  roleField: string
  href: string
  index?: number
}) => {
  const animation = {
    delay: index * 0.025,
    step: 0.035,
  }
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div
      ref={ref}
      className={
        'flex flex-row-reverse sm:flex-row gap-1 sm:gap-2.5 pt-3 -mb-3 sm:mb-0 w-full *:transition-all'
      }
      {...props}
    >
      <div className={'w-1/6 flex lg:flex sm:hidden'}>
        <TextReveal
          as={'p'}
          lineHeight={'1em'}
          enterY={'10%'}
          delay={animation.delay}
          className={'mb-0 sm:-mb-3.5'}
          typeClass={'typography-sm'}
          text={String(year)}
        />
      </div>
      <div className={'w-full sm:w-1/2 lg:w-1/3'}>
        <TextReveal
          as={'p'}
          lineHeight={'1.3em'}
          enterY={'10%'}
          delay={animation.delay + animation.step}
          className={'-mb-1 sm:-mb-3.5 w-fit'}
          typeClass={'typography-md mr-1.5'}
          text={project}
        />
      </div>

      <div className={'w-full sm:w-1/2 lg:w-1/3'}>
        <TextReveal
          as={'p'}
          lineHeight={'1.3em'}
          enterY={'10%'}
          delay={animation.delay + animation.step * 2}
          className={'-mb-1 -mt-0.5 sm:-mb-3.5'}
          typeClass={'typography-md mr-1.5'}
          text={client}
        />
      </div>

      <div className={'w-1/6 -mt-1 hidden lg:flex'}>
        <TextReveal
          as={'p'}
          lineHeight={'1.3em'}
          enterY={'10%'}
          delay={animation.delay + animation.step * 3}
          className={'mb-1.5 sm:-mb-3.5'}
          typeClass={'typography-md'}
          text={role}
        />
      </div>
    </div>
  )
}

const TablePreview = ({ theme = 'dark' }: { theme?: 'light' | 'dark' }) => {
  const animation = (index: number) => {
    return {
      delay: index * 0.025,
      step: 0.035,
    }
  }
  const ref = useRef<HTMLDivElement>(null)
  return (
    <TableRoot className={'mb-16 sm:mb-48'} fadeBottom viewAll>
      <TableHead theme={theme} />
      <Accordion
        className={'px-0'}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              height: 'auto',
              transition: {
                height: {
                  duration: 1.275,
                  ease: [1, 0, 0.01, 1],
                },
              },
            },
            exit: {
              y: -10,
              height: 0,
              transition: {
                height: {
                  duration: 1.275 / 2,
                  ease: [1, 0, 0.01, 1],
                },
              },
            },
          },
        }}
      >
        {projects.map((project, index) => (
          <AccordionItem
            key={index}
            aria-label={project.title}
            title={project.title}
            className={'group w-full'}
            classNames={{
              startContent: 'w-full',
              indicator: 'hidden',
              titleWrapper: 'hidden',
              base: theme === 'dark' ? 'text-black' : 'text-white',
              heading: 'heading-classes',
              trigger: '',
              title: 'title-classes',
              subtitle: 'subtitle-classes',
              content: 'pt-0 sm:pt-2',
            }}
            startContent={
              <React.Fragment>
                <div
                  ref={ref}
                  className={cn(
                    'flex flex-row-reverse sm:flex-row gap-1 items-start sm:gap-2.5 pb-1.5 sm:pb-0 w-full *:transition-all *:text-start',
                    theme === 'dark' ? 'text-black' : 'text-white',
                  )}
                >
                  <div className={'w-1/6 flex lg:flex sm:hidden'}>
                    <TextReveal
                      as={'p'}
                      lineHeight={'1em'}
                      enterY={'10%'}
                      delay={animation(index).delay}
                      className={'mb-0 sm:-mb-3.5'}
                      typeClass={'typography-sm'}
                      text={String(project.year)}
                    />
                  </div>
                  <div className={'w-full sm:w-1/2 lg:w-1/3'}>
                    <TextReveal
                      as={'p'}
                      lineHeight={'1.3em'}
                      enterY={'10%'}
                      delay={animation(index).delay + animation(index).step}
                      className={'-mb-1 -mt-0.5 sm:-mb-3.5'}
                      typeClass={'typography-md mr-1.5'}
                      text={project.title}
                    />
                  </div>

                  <div className={'w-full sm:w-1/2 lg:w-1/3'}>
                    <TextReveal
                      as={'p'}
                      lineHeight={'1.3em'}
                      enterY={'10%'}
                      delay={animation(index).delay + animation(index).step * 2}
                      className={'-mb-1 -mt-0.5 sm:-mb-3.5'}
                      typeClass={'typography-md mr-1.5'}
                      text={project.client}
                    />
                  </div>

                  <div className={'w-1/6 -mt-1 hidden lg:flex'}>
                    <TextReveal
                      as={'p'}
                      lineHeight={'1.3em'}
                      enterY={'10%'}
                      delay={animation(index).delay + animation(index).step * 3}
                      className={'mb-1.5 sm:-mb-3.5'}
                      typeClass={'typography-md'}
                      text={project.role}
                    />
                  </div>
                </div>
                <BezierCurve
                  index={index}
                  theme={theme}
                  className={'mt-2.5 sm:mt-4 mb-0 sm:-mb-2'}
                />
              </React.Fragment>
            }
          >
            <div className={'flex flex-col md:flex-row w-full gap-1.5'}>
              <div className={'md:w-1/2 w-full'} />
              <div className={'md:w-1/2 w-full'}>
                <Image
                  alt={'project'}
                  width={1280}
                  height={720}
                  priority={true}
                  quality={100}
                  sizes={'100vw'}
                  src={'/12.png'}
                  className={'mb-2'}
                />
                <p className={'typography-base max-w-[620px]'}>
                  Designed to save time while maintaining a strong visual
                  presence on various social media channels, these templates
                  feature a perfect blend of classic and contemporary styles.
                </p>
                <div className={'relative w-fit py-3'}>
                  <Pill.ButtonFlip
                    innerText={'Visit ↗'}
                    href={'/archive'}
                    scroll={false}
                    reversed
                  />
                </div>
              </div>
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </TableRoot>
  )
}

const TableRelatedProjectsA = ({
  projects,
}: {
  projects: {
    year: number
    title: string
    client: string
    role: string
    image: string
    color: string
  }[]
}) => {
  const animation = (index: number) => {
    return {
      delay: index * 0.025,
      step: 0.035,
    }
  }
  const ref = useRef<HTMLDivElement>(null)
  return (
    <TableRoot>
      <TableHead />
      <Accordion
        className={'px-0'}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              height: 'auto',
              transition: {
                height: {
                  duration: 1.275,
                  ease: [1, 0, 0.01, 1],
                },
              },
            },
            exit: {
              y: -10,
              height: 0,
              transition: {
                height: {
                  duration: 1.275 / 2,
                  ease: [1, 0, 0.01, 1],
                },
              },
            },
          },
        }}
      >
        {projects.map((project, index) => (
          <AccordionItem
            key={index}
            aria-label={project.title}
            title={project.title}
            className={'group w-full'}
            classNames={{
              startContent: 'w-full',
              indicator: 'hidden',
              titleWrapper: 'hidden',
              content: 'pt-0 sm:pt-2',
            }}
            startContent={
              <React.Fragment>
                <div
                  ref={ref}
                  className={
                    'flex flex-row-reverse sm:flex-row gap-1 items-start sm:gap-2.5 pb-1.5 sm:pb-0 w-full *:transition-all *:text-start'
                  }
                >
                  <div className={'w-1/6 flex lg:flex sm:hidden'}>
                    <TextReveal
                      as={'p'}
                      lineHeight={'1em'}
                      enterY={'10%'}
                      delay={animation(index).delay}
                      className={'mb-0 sm:-mb-3.5'}
                      typeClass={'typography-sm'}
                      text={String(project.year)}
                    />
                  </div>
                  <div className={'w-full sm:w-1/2 lg:w-1/3'}>
                    <TextReveal
                      as={'p'}
                      lineHeight={'1.3em'}
                      enterY={'10%'}
                      delay={animation(index).delay + animation(index).step}
                      className={'-mb-1 -mt-0.5 sm:-mb-3.5'}
                      typeClass={'typography-md mr-1.5'}
                      text={project.title}
                    />
                  </div>

                  <div className={'w-full sm:w-1/2 lg:w-1/3'}>
                    <TextReveal
                      as={'p'}
                      lineHeight={'1.3em'}
                      enterY={'10%'}
                      delay={animation(index).delay + animation(index).step * 2}
                      className={'-mb-1 -mt-0.5 sm:-mb-3.5'}
                      typeClass={'typography-md mr-1.5'}
                      text={project.client}
                    />
                  </div>

                  <div className={'w-1/6 -mt-1 hidden lg:flex'}>
                    <TextReveal
                      as={'p'}
                      lineHeight={'1.3em'}
                      enterY={'10%'}
                      delay={animation(index).delay + animation(index).step * 3}
                      className={'mb-1.5 sm:-mb-3.5'}
                      typeClass={'typography-md'}
                      text={project.role}
                    />
                  </div>
                </div>
                <BezierCurve
                  index={index}
                  className={'mt-2.5 sm:mt-4 mb-0 sm:-mb-2'}
                  pathClassName={'text-black/30'}
                />
              </React.Fragment>
            }
          >
            lol
          </AccordionItem>
        ))}
      </Accordion>
    </TableRoot>
  )
}

const TableArchive = () => {
  return (
    <TableRoot>
      <TableHead />
      {projects.map((project, index) => (
        <TableRow
          key={index}
          index={index}
          year={project.year}
          project={project.title}
          client={project.client}
          roleField={project.role}
          href={`/archive/${project.title}`}
        />
      ))}
    </TableRoot>
  )
}

const TableProject = ({ project }: { project: ProjectDocument<string> }) => {
  return (
    <TableRoot className={'mb-2.5'}>
      <TableHead className={'pt-6 pb-1 sm:mb-0 -mb-4'} />
      <TableDisplay
        index={0}
        year={project.data.year as string | number}
        project={project.data.title as string}
        client={project.data.client as string}
        roleField={project.data.role as string}
        href={'none'}
      />
    </TableRoot>
  )
}

const TableRelatedProjects = ({
  projects,
}: {
  projects: Array<ProjectDocument<string>> | undefined
}) => {
  return (
    <TableRoot className={'mb-2.5'}>
      <TableHead className={'pt-6 pb-1 sm:mb-0 -mb-4'} />
      {projects?.map((project, index) => (
        <Link
          key={index}
          href={`/project/${project.uid}`}
          target={'_blank'}
          scroll={false}
        >
          <div
            className={cn(
              'flex flex-row-reverse sm:flex-row gap-1 items-start sm:gap-2.5 pb-1.5 sm:pb-0 w-full *:transition-all *:text-start',
            )}
          >
            <div className={'w-1/6 flex lg:flex sm:hidden'}>
              <TextReveal
                as={'p'}
                lineHeight={'1em'}
                enterY={'10%'}
                delay={index * 0.175}
                className={'mb-0 sm:-mb-3.5'}
                typeClass={'typography-sm'}
                text={String(project.data.year)}
              />
            </div>
            <div className={'w-full sm:w-1/2 lg:w-1/3'}>
              <TextReveal
                as={'p'}
                lineHeight={'1.3em'}
                enterY={'10%'}
                delay={index * 0.175}
                className={'-mb-1 -mt-0.5 sm:-mb-3.5'}
                typeClass={'typography-md mr-1.5'}
                text={project.data.title as string}
              />
            </div>

            <div className={'w-full sm:w-1/2 lg:w-1/3'}>
              <TextReveal
                as={'p'}
                lineHeight={'1.3em'}
                enterY={'10%'}
                delay={index * 0.175 * 2}
                className={'-mb-1 -mt-0.5 sm:-mb-3.5'}
                typeClass={'typography-md mr-1.5'}
                text={project.data.client as string}
              />
            </div>

            <div className={'w-1/6 -mt-1 hidden lg:flex'}>
              <TextReveal
                as={'p'}
                lineHeight={'1.3em'}
                enterY={'10%'}
                delay={index * 0.175 * 3}
                className={'mb-1.5 sm:-mb-3.5'}
                typeClass={'typography-md'}
                text={project.data.role as string}
              />
            </div>
          </div>
          <BezierCurve index={index} className={'mt-0 sm:mt-5 mb-4'} />
        </Link>
      ))}
    </TableRoot>
  )
}

const Table = {
  Root: TableRoot,
  Head: TableHead,
  Row: TableRow,
  Preview: TablePreview,
  Archive: TableArchive,
  Project: TableProject,
  RelatedProjects: TableRelatedProjects,
}

export default Table
