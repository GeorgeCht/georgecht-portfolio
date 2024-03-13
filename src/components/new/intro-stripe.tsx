import React from 'react'
import TextReveal from '@/components/ui/text-reveal'
import QRCode from '@/components/new/qr-code'
import Link from 'next/link'
import Magnetic from '@/components/ui/magnetic'

const IntroStripe = () => {
  const socialItems = [
    {
      title: 'GitHub↗',
      href: '/',
    },
    {
      title: 'Dribbble↗',
      href: '/',
    },
    {
      title: 'Linked In↗',
      href: '/',
    },
    {
      title: '@georgecht',
      href: '/',
    },
  ]
  return (
    <React.Fragment>
      <div className={'flex lg:hidden px-2.5 md:px-4 w-full '}>
        <TextReveal
          as={'h1'}
          lineHeight={'0.985em'}
          enterY={'10%'}
          className={'mb-1.5 sm:-mb-3.5 mt-2.5 max-w-[620px]'}
          typeClass={'typography-caps-lg mr-1.5'}
          text={'WORKING AT THE INTERSECTION OF WEB DEVELOPMENT & DESIGN'}
        />
      </div>
      <div
        className={
          'flex flex-col sm:flex-row gap-2.5 px-2.5 md:px-4 pt-0 sm:pt-4 lg:pt-6 w-full'
        }
      >
        <div
          className={'flex flex-col w-full sm:w-1/2 lg:w-1/4 justify-between'}
        >
          <TextReveal
            as={'h5'}
            lineHeight={'0.85em'}
            enterY={'10%'}
            className={'mb-1.5 sm:-mb-3.5 -mt-1.5'}
            typeClass={'typography-caps-sm mr-0.5'}
            text={'Currently freelancing'}
          />
          <TextReveal
            as={'span'}
            lineHeight={'0.95em'}
            enterY={'10%'}
            className={'mb-1.5 sm:-mb-3.5 max-w-[340px] pb-3'}
            typeClass={'typography-caps-md mr-1.5'}
            text={'Available for new projects from april 2024'}
          />
        </div>
        <div
          className={'flex flex-row w-full sm:w-1/2 lg:w-3/4 justify-between'}
        >
          <TextReveal
            as={'h1'}
            lineHeight={'0.985em'}
            enterY={'10%'}
            className={'mb-1.5 sm:-mb-3.5 mt-2.5 max-w-[620px] hidden lg:block'}
            typeClass={'typography-caps-lg mr-1.5'}
            text={'WORKING AT THE INTERSECTION OF WEB DEVELOPMENT & DESIGN'}
          />
          <div
            className={
              'hidden sm:flex flex-row w-full sm:w-fit justify-start sm:justify-end items-start gap-2'
            }
          >
            <ul className={'flex flex-col items-start sm:items-end mt-1.5'}>
              {socialItems.map((item, index) => (
                <li key={index}>
                  <Link href={item.href}>
                    <Magnetic>
                      <TextReveal
                        as={'span'}
                        lineHeight={'0.99em'}
                        enterY={'10%'}
                        className={'-mb-0.5'}
                        typeClass={'typography-caps-md mr-0.5'}
                        text={item.title}
                        delay={index * 0.175}
                      />
                    </Magnetic>
                  </Link>
                </li>
              ))}
            </ul>
            <QRCode
              fill={'black'}
              className={'hidden sm:block h-[124px] w-[124px]'}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default IntroStripe
