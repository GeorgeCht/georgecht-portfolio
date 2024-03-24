import React, { DetailedHTMLProps, HTMLAttributes } from 'react'
import TextReveal from '@/components/ui/text-reveal'
import QRCode from '@/components/new/qr-code'
import Link from 'next/link'
import Magnetic from '@/components/ui/magnetic'

import data from '@/lib/staticData.json'

const IntroStripe = ({
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  return (
    <React.Fragment>
      <div
        className={
          'flex lg:hidden px-2.5 md:px-4 w-full text-white mix-blend-difference'
        }
        {...props}
      >
        <TextReveal
          as={'h1'}
          lineHeight={'0.985em'}
          enterY={'10%'}
          className={'mb-1.5 sm:-mb-3.5 mt-2.5 max-w-[620px]'}
          typeClass={'typography-caps-lg mr-1.5'}
          text={data.info.tagline}
        />
      </div>
      <div
        className={
          'flex flex-col sm:flex-row gap-2.5 px-2.5 md:px-4 pt-0 sm:pt-4 lg:pt-6 w-full'
        }
      >
        <div
          className={
            'flex flex-col w-full sm:w-1/2 lg:w-1/4 justify-between text-white mix-blend-difference'
          }
        >
          <TextReveal
            as={'h2'}
            lineHeight={'0.85em'}
            enterY={'10%'}
            className={'mb-1.5 sm:-mb-3.5 -mt-1.5'}
            typeClass={'typography-caps-sm mr-0.5'}
            text={data.info.status}
          />
          <TextReveal
            as={'span'}
            lineHeight={'0.95em'}
            enterY={'10%'}
            className={'mb-1.5 sm:-mb-3.5 max-w-[340px] pb-3'}
            typeClass={'typography-caps-md mr-1.5'}
            text={`Available for new projects ${data.info.availability}`}
          />
        </div>
        <div
          className={
            'flex flex-row w-full sm:w-1/2 lg:w-3/4 justify-between text-white mix-blend-difference'
          }
        >
          <TextReveal
            as={'h1'}
            lineHeight={'0.985em'}
            enterY={'10%'}
            className={'mb-1.5 sm:-mb-3.5 mt-2.5 max-w-[620px] hidden lg:block'}
            typeClass={'typography-caps-lg mr-1.5'}
            text={data.info.tagline}
          />
          <div
            className={
              'hidden sm:flex flex-row w-full sm:w-fit justify-start sm:justify-end items-start gap-2'
            }
          >
            <ul className={'flex flex-col items-start sm:items-end mt-1.5'}>
              {data.social.map((item, index) => (
                <li key={index}>
                  <Link href={item.url}>
                    <Magnetic>
                      <TextReveal
                        as={'span'}
                        lineHeight={'0.99em'}
                        enterY={'10%'}
                        className={'-mb-0.5'}
                        typeClass={'typography-caps-md mr-0.5'}
                        text={
                          item.title !== 'Instagram'
                            ? `${item.title}↗`
                            : '@GeorgeCht'
                        }
                        delay={index * 0.175}
                      />
                    </Magnetic>
                  </Link>
                </li>
              ))}
            </ul>
            <QRCode
              fill={'white'}
              className={
                'hidden text-white mix-blend-difference sm:block h-[124px] w-[124px]'
              }
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default IntroStripe
