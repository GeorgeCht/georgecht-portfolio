import { Accordion, AccordionItem } from "@nextui-org/react"
import Head from "./head"
import Root from "./root"
import { ArchiveDocument } from "../../../prismicio-types"
import { useRef } from "react"
import React from "react"
import { cn } from "@/lib/utils"
import TextReveal from "../ui/text-reveal"
import BezierCurve from "../new/bezier-curve"
import { PrismicNextImage } from "@prismicio/next"
import { isFilled } from "@prismicio/client"
import { PrismicRichText } from "@prismicio/react"
import Pill from "../new/button-pill"


const ArchiveList = ({ archiveData, theme = 'dark', preview = false } : { archiveData: Array<ArchiveDocument<string>>, theme?: 'light' | 'dark', preview?: boolean }) => {
  const ref = useRef<HTMLDivElement>(null)
  const animation = (index: number) => {
    return {
      delay: index * 0.025,
      step: 0.035,
    }
  }
  return (
    <Root className={'mb-16 sm:mb-48'} theme={theme} fadeBottom={preview} viewAll={preview}>
      <Head theme={theme} />
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
        {archiveData.map((archiveEntry, index) => (
          <AccordionItem
            key={index}
            aria-label={archiveEntry.data.title as string}
            title={archiveEntry.data.title}
            className={'group w-full'}
            classNames={{
              startContent: 'w-full',
              indicator: 'hidden',
              titleWrapper: 'hidden',
              base: theme === 'dark' ? 'text-black' : 'text-white',
              heading: 'heading-classes',
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
                      text={String(archiveEntry.data.year)}
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
                      text={archiveEntry.data.title as string}
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
                      text={archiveEntry.data.client as string}
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
                      text={archiveEntry.data.role as string}
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
                {isFilled.image(archiveEntry.data.image) && (
                  <PrismicNextImage priority className={'mb-2'} field={archiveEntry.data.image} />
                )}
                {isFilled.richText(archiveEntry.data.description) && (
                  <div className={'typography-base max-w-[620px]'}>
                    <PrismicRichText field={archiveEntry.data.description} />
                  </div>
                )}
                {isFilled.link(archiveEntry.data.external_url) && (
                  <div className={'relative w-fit py-3'}>
                    <Pill.PrismicLink
                      field={archiveEntry.data.external_url}
                      innerText={'Visit ↗'}
                      reversed
                    />
                  </div>
                )}
              </div>
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </Root>
  )
}

export default ArchiveList