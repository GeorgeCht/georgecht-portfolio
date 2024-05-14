'use client'

import React, { DetailedHTMLProps, HTMLAttributes, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { motion as Motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import TextReveal from '../ui/text-reveal'
import TextRevealFlip from '../ui/text-reveal-flip'
import Magnetic from '../ui/magnetic'
import Link from 'next/link'

const HeaderAlt = ({
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => {
  const pathname = usePathname()

  useEffect(() => {}, [pathname])

  const animationIntro = {
    initial: {
      opacity: 0,
      y: '100%',
    },
    enter: {
      y: '0%',
      opacity: 1,
      delay: 0.275,
      transition: {
        duration: 1.375,
        ease: [1, 0, 0.01, 1],
      },
    },
    exit: {
      y: '0%',
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 275,
        damping: 30,
      },
    },
  }

  return (
    <header
      className={cn(
        'relative flex flex-row w-full mix-blend-difference z-[999]',
        className,
      )}
      {...props}
    >
      <div
        className={
          'w-full fixed flex flex-row justify-between items-start top-0 z-[999] px-2 pt-2'
        }
      >
        <Motion.div
          className={'flex flex-col w-fit items-start'}
          variants={animationIntro}
          initial={'initial'}
          animate={'enter'}
          exit={'exit'}
        >
          <Link scroll={false} href={'/'}>
            <TextReveal
              as={'span'}
              lineHeight={'0.9em'}
              enterY={'10%'}
              className={'-mb-3.5 pb-0'}
              typeClass={'typography-caps-sm mr-0.5 text-white'}
              text={'GeorgeCht'}
            />
            <TextReveal
              as={'span'}
              lineHeight={'0.9em'}
              enterY={'10%'}
              className={'-mb-3.5 pb-0'}
              typeClass={'typography-caps-sm mr-0.5 text-white'}
              text={'©2024'}
              delay={0.075}
            />
          </Link>
        </Motion.div>
        <Motion.div
          variants={animationIntro}
          initial={'initial'}
          animate={'enter'}
          exit={'exit'}
          className={'flex flex-col items-end w-fit pt-1.5'}
        >
          <Link scroll={false} href={'/projects'}>
            <Magnetic className={'-mb-1.5 -mt-1'}>
              <TextRevealFlip
                as={'span'}
                lineHeight={'1.2em'}
                enterY={'10%'}
                delay={0}
                wrapperClass={'-mt-3'}
                typeClass={'typography-md md:typography-sm mr-0 text-white'}
                className={
                  'after:mt-[0.25em] after:text-white md:group-hover:translate-y-[-120%] typography-md md:typography-sm'
                }
                text={'projects'}
              />
            </Magnetic>
          </Link>
          <Link scroll={false} href={'/archive'}>
            <Magnetic className={'-mb-1.5 -mt-1'}>
              <TextRevealFlip
                as={'span'}
                lineHeight={'1.2em'}
                enterY={'10%'}
                delay={0.1}
                wrapperClass={'-mt-3'}
                typeClass={'typography-md md:typography-sm mr-0 text-white'}
                className={
                  'after:mt-[0.25em] after:text-white md:group-hover:translate-y-[-120%] typography-md md:typography-sm'
                }
                text={'archive'}
              />
            </Magnetic>
          </Link>
          <Link scroll={false} href={'/about'}>
            <Magnetic className={'-mb-1.5 -mt-1'}>
              <TextRevealFlip
                as={'span'}
                lineHeight={'1.2em'}
                enterY={'10%'}
                delay={0.2}
                wrapperClass={'-mt-3'}
                typeClass={'typography-md md:typography-sm mr-0 text-white'}
                className={
                  'after:mt-[0.25em] after:text-white md:group-hover:translate-y-[-120%] typography-md md:typography-sm'
                }
                text={'about'}
              />
            </Magnetic>
          </Link>
          <Link scroll={false} href={'/contact'}>
            <Magnetic className={'-mb-1.5 -mt-1'}>
              <TextRevealFlip
                as={'span'}
                lineHeight={'1.2em'}
                enterY={'10%'}
                delay={0.3}
                wrapperClass={'-mt-3'}
                typeClass={'typography-md md:typography-sm mr-0 text-white'}
                className={
                  'after:mt-[0.25em] after:text-white md:group-hover:translate-y-[-120%] typography-md md:typography-sm'
                }
                text={'contact'}
              />
            </Magnetic>
          </Link>
        </Motion.div>
      </div>
    </header>
  )
}

export default HeaderAlt
