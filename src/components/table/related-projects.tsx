import Link from 'next/link'
import BezierCurve from '@/components/new/bezier-curve'
import TextReveal from '@/components/ui/text-reveal'
import Root from './root'
import Head from './head'

import { cn } from '@/lib/utils'
import { ProjectDocument } from '../../../prismicio-types'

const RelatedProjects = ({
  projects,
}: {
  projects: Array<ProjectDocument<string>> | undefined
}) => {
  return (
    <Root className={'mb-2.5'}>
      <Head className={'pt-6 pb-1 sm:mb-0 -mb-4'} />
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
    </Root>
  )
}

export default RelatedProjects
