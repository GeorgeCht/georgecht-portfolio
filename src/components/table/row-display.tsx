import { HTMLAttributes, useRef } from "react"
import TextReveal from "@/components/ui/text-reveal"
import { Accordion, AccordionItem, cn } from "@nextui-org/react"
import React from "react"
import BezierCurve from "../new/bezier-curve"
import Pill from "../new/button-pill"

const RowDisplay = ({
  year,
  title,
  client,
  roleField: role,
  index = 0,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  year: string | number
  title: string
  client: string
  roleField: string
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
          text={title}
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

const RowAccordion = () => {
  return (
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
  )
}

export default RowDisplay