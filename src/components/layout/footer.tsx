import { cn, getYear } from '@/lib/utils'
import Link from 'next/link'
import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  useEffect,
  useState,
} from 'react'
import TextReveal from '@/components/ui/text-reveal'
import Magnetic from '../ui/magnetic'
import TextRevealFlip from '../ui/text-reveal-flip'
import data from '@/lib/staticData.json'
import { toast } from 'sonner'

const Footer = ({
  className,
  theme = 'dark',
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  theme?: 'light' | 'dark'
}) => {
  const [lineHeight, setLineHeight] = useState('1em')

  useEffect(() => {
    const handleResize = () =>
      window.innerWidth >= 640 ? setLineHeight('1em') : setLineHeight('1.2em')
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const animation = {
    step: 0.035,
  }

  const openInNewTab = (url?: string | URL | undefined) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  return (
    <footer
      className={cn(
        'flex flex-col pt-4 pb-2 sm:flex-row gap-2.5 px-2 w-full',
        theme === 'dark' ? 'text-black' : 'text-white',
        className,
      )}
      {...props}
    >
      <div className={'w-1/6 hidden lg:flex'} />
      <div className={'w-full sm:w-1/2 lg:w-1/3'}>
        <TextReveal
          as={'span'}
          lineHeight={'0.9em'}
          enterY={'10%'}
          className={'mb-1.5 sm:-mb-3.5 pb-2.5 sm:pb-0 cursor-default'}
          typeClass={'typography-caps-sm mr-0.5'}
          text={'Contact'}
        />
        <div className={'w-fit'}>
          <button
            type={'button'}
            className={'w-fit'}
            onClick={() => {
              try {
                navigator.clipboard.writeText(data.email)
                toast.success('Email copied to clipboard.')
              } catch (error) {
                openInNewTab(`mailto:${data.email}`)
              }
            }}
          >
            <Magnetic className={'-mb-1.5 mt-1.5'}>
              <TextRevealFlip
                as={'span'}
                lineHeight={lineHeight}
                enterY={'10%'}
                wrapperClass={'-mt-3'}
                typeClass={'mr-0.5 pt-[0.185em] sm:pt-0'}
                className={
                  'after:mt-[0.25em] md:group-hover:translate-y-[-120%] typography-caps-md sm:typography-caps-sm sm:text-[11px] text-[8vw]'
                }
                delay={animation.step}
                text={data.email}
              />
            </Magnetic>
          </button>
        </div>
      </div>

      <div
        className={
          'w-full sm:w-1/2 lg:w-1/3 flex flex-col sm:flex-row justify-between'
        }
      >
        <div>
          <TextReveal
            as={'span'}
            lineHeight={'0.85em'}
            enterY={'10%'}
            delay={animation.step * 2}
            className={'mb-1.5 sm:-mb-3.5 pb-2.5 sm:pb-0 cursor-default'}
            typeClass={'typography-caps-sm mr-0.5'}
            text={'Follow'}
          />
          <div className={'flex flex-col sm:flex-row gap-0 sm:gap-1'}>
            {data.social.map((item, index) =>
              item.title === 'Instagram' ? (
                <React.Fragment key={index} />
              ) : (
                <React.Fragment key={index}>
                  <Magnetic className={'-mb-1.5 mt-1.5'}>
                    <Link href={item.url}>
                      <TextRevealFlip
                        as={'span'}
                        lineHeight={lineHeight}
                        enterY={'10%'}
                        delay={animation.step + index / 10}
                        wrapperClass={'-mt-3'}
                        typeClass={'mr-0.5 pt-[0.185em] sm:pt-0'}
                        className={
                          'after:mt-[0.25em] md:group-hover:translate-y-[-120%] typography-caps-md sm:typography-caps-sm sm:text-[11px] text-[8vw]'
                        }
                        text={`${item.title}↗`}
                      />
                    </Link>
                  </Magnetic>
                </React.Fragment>
              ),
            )}
          </div>
        </div>

        <div
          className={
            'flex lg:hidden flex-col items-start sm:items-end pt-2.5 sm:pt-0'
          }
        >
          <TextReveal
            as={'span'}
            lineHeight={'0.85em'}
            enterY={'10%'}
            delay={animation.step * 6}
            className={'-mb-3.5'}
            typeClass={'typography-caps-sm mr-0.5'}
            text={`GeorgeCht © ${getYear()}`}
          />
          <TextReveal
            as={'span'}
            lineHeight={'0.85em'}
            enterY={'10%'}
            delay={animation.step * 7}
            className={'mb-0 sm:-mb-3.5'}
            typeClass={'typography-caps-sm mr-0.5'}
            text={'All rights reserved'}
          />
        </div>
      </div>

      <div className={'w-1/6 hidden lg:flex flex-col'}>
        <TextReveal
          as={'span'}
          lineHeight={'0.85em'}
          enterY={'10%'}
          delay={animation.step * 6}
          className={'mb-1.5 sm:-mb-3.5'}
          typeClass={'typography-caps-sm mr-0.5'}
          text={`GeorgeCht © ${getYear()}`}
        />
        <TextReveal
          as={'span'}
          lineHeight={'0.85em'}
          enterY={'10%'}
          delay={animation.step * 7}
          className={'mb-0 sm:-mb-3.5'}
          typeClass={'typography-caps-sm mr-0.5'}
          text={'All rights reserved'}
        />
      </div>
    </footer>
  )
}

export default Footer
