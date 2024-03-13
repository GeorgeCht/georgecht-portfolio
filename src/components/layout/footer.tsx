'use client'

import TextRevealByChar from '@/components/ui/text-reveal-char'
import TextReveal from '@/components/ui/text-reveal'
import React, { forwardRef, ForwardRefRenderFunction } from 'react'
import { HTMLMotionProps, motion as Motion, MotionProps } from 'framer-motion'
import clsx from 'clsx'
import NoSsr from '@/components/misc/no-ssr'
import Barcode from '@/components/misc/barcode'
import platform from 'platform'
import { getRandomNumber } from '@/lib/utils'
import FooterSign from '@/components/misc/signature'
import Link from '@/components/misc/link'

const anim = (variants: MotionProps['variants']) => {
  return {
    variants,
    initial: 'initial',
    animate: 'enter',
    exit: 'exit',
  }
}

const Footer: ForwardRefRenderFunction<
  HTMLDivElement,
  HTMLMotionProps<'footer'>
> = ({ ...props }, ref) => {
  const randomNumber = getRandomNumber()
  return (
    <Motion.footer
      ref={ref}
      className={
        'flex flex-col px-2.5 md:px-4 w-full min-h-[53.333vh] overflow-hidden'
      }
      {...props}
    >
      <div className={'flex flex-row relative justify-between'}>
        <TextRevealByChar
          as={'p'}
          lineHeight={'1.195em'}
          delay={0.175}
          enterY={'-10%'}
          animateY={false}
          className={'cursor-default'}
          typeClass={'font-xanh mr-0 tracking-[-0.08em] text-[25.795vw]'}
          text={'The'}
        />
        <TextRevealByChar
          as={'p'}
          lineHeight={'1.195em'}
          delay={0.675}
          enterY={'-10%'}
          animateY={false}
          className={'cursor-default'}
          typeClass={'font-xanh mr-0 tracking-[-0.08em] text-[25.795vw]'}
          text={'end'}
        />
        <FooterSign className={'absolute w-[90vw] top-[25%] left-[11.925%]'} />
      </div>

      <div className={'flex flex-row w-full -mt-[1em] pb-16'}>
        <div className={'flex flex-row w-1/3'}>
          <div className={'flex flex-col w-1/3'}>
            <TextReveal
              as={'p'}
              delay={0.475}
              className={'mt-[-0.425em]'}
              typeClass={'type-mono-2xs'}
              text={'GEORGECHT©2024'}
            />
            <TextReveal
              as={'p'}
              delay={0.475}
              className={'mt-[-0.925em]'}
              typeClass={'type-mono-2xs'}
              text={'All rights reserved'}
            />
          </div>
          <div className={'flex flex-col w-1/3'}>
            <TextReveal
              as={'span'}
              delay={0.475}
              className={'mt-[-0.425em]'}
              typeClass={'type-mono-2xs'}
              text={'Social Media'}
            />
            <ul>
              {[
                { href: '/', text: 'Instagram' },
                { href: '/', text: 'Github' },
                { href: '/', text: 'Dribbble' },
                { href: '/', text: 'LinkedIn' },
              ].map((link, index) => (
                <li key={index}>
                  <Link href={link.href} scroll={false}>
                    <TextReveal
                      as={'span'}
                      delay={0.475 + index * 0.125}
                      className={clsx(
                        'hover:animate-blink',
                        index === 0 ? 'mt-[-0.125em]' : 'mt-[-0.925em]',
                      )}
                      typeClass={'type-mono-2xs'}
                      text={`0${index}. ${link.text}`}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={'flex flex-col w-1/3'}>
            <TextReveal
              as={'span'}
              delay={0.475}
              className={'mt-[-0.425em]'}
              typeClass={'type-mono-2xs'}
              text={'Navigate'}
            />
            <ul>
              {[
                { href: '/', text: 'Home' },
                { href: '/', text: 'Projects' },
                { href: '/', text: 'About' },
                { href: '/', text: 'Archive' },
                { href: '/', text: 'Contact' },
                { href: '/', text: 'CV (Upon request)' },
              ].map((link, index) => (
                <li key={index}>
                  <Link href={link.href} scroll={false}>
                    <TextReveal
                      as={'span'}
                      delay={0.475 + index * 0.125}
                      className={clsx(
                        'hover:animate-blink',
                        index === 0 ? 'mt-[-0.125em]' : 'mt-[-0.925em]',
                      )}
                      typeClass={'type-mono-2xs'}
                      text={`0${index}. ${link.text}`}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={'w-1/3'} />
        <div className={'flex flex-row w-1/3'}>
          <div className={'flex flex-col w-1/3'}>
            <NoSsr>
              <TextReveal
                as={'p'}
                delay={0.475}
                className={'mt-[-0.425em] pb-1'}
                typeClass={'type-mono-2xs'}
                text={randomNumber}
              />
              {[...Array(6)].map((_, index) => (
                <TextReveal
                  key={index}
                  as={'p'}
                  delay={0.475 + index * 0.125}
                  className={'mt-[-1.325em]'}
                  typeClass={'type-mono-2xs'}
                  text={randomNumber}
                />
              ))}
              <TextReveal
                as={'p'}
                delay={0.125 + 0.475 + 5 * 0.125}
                className={'mt-[-1.325em] pt-1.5'}
                typeClass={'type-mono-2xs'}
                text={randomNumber}
              />
            </NoSsr>
          </div>

          <div className={'flex flex-col w-1/3'}>
            <NoSsr>
              <TextReveal
                as={'p'}
                delay={0.475}
                className={'mt-[-0.425em]'}
                typeClass={'type-mono-2xs'}
                text={String(platform.os)}
              />
              <TextReveal
                as={'p'}
                delay={0.475}
                className={'mt-[-0.925em]'}
                typeClass={'type-mono-2xs'}
                text={`${String(platform.name)} v${String(platform.version)}`}
              />
            </NoSsr>
          </div>
          <div className={'flex flex-col w-1/3 items-end'}>
            <Barcode />
          </div>
        </div>
      </div>
    </Motion.footer>
  )
}

Footer.displayName = 'Footer'
export default forwardRef(Footer)
