'use client'

import React from 'react'

import { useInView, motion as Motion } from 'framer-motion'
import { ElementType, forwardRef, useRef } from 'react'
import { cn } from '@/lib/utils'
import { SplitText } from '../split-text'

const TextRevealByLine = forwardRef(
  (
    {
      as,
      text,
      delay = 0,
      enterY = '-10%',
      lineHeight = '1em',
      typeClass = 'type-base',
      className,
      wrapperClass,
      ...props
    }: {
      text: string
      delay?: number
      enterY?: string
      lineHeight?: string
      typeClass?: string
      wrapperClass?: string
      className?: string
    } & AsProp<'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'span'>,
    ref: React.ForwardedRef<HTMLSpanElement>,
  ) => {
    const ANIMATION_SPEED = 0.0925
    const BUILT_IN_DELAY = 0.1025

    const Element: ElementType = as || 'p'

    const wrapperRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(wrapperRef, { once: true })

    const animation = {
      initial: { y: '190%' },
      enter: (iteration: number) => ({
        y: enterY,
        transition: {
          type: 'spring',
          stiffness: 125,
          damping: 30,
          delay: ANIMATION_SPEED * iteration + delay + BUILT_IN_DELAY,
        },
      }),
      exit: (iteration: number) => ({
        y: '190%',
        transition: {
          type: 'spring',
          stiffness: 275,
          damping: 30,
          delay: (ANIMATION_SPEED * iteration + delay + BUILT_IN_DELAY) / 4,
        },
      }),
    }

    // split text for each word
    return (
      <div className={'relative'} ref={wrapperRef} suppressHydrationWarning>
        <Element
          className={cn('relative', className)}
          suppressHydrationWarning
          {...props}
        >
          <SplitText
            aria-describedby={'text'}
            className={cn('inline-block w-full overflow-hidden', typeClass)}
            LineWrapper={({ lineIndex, children }) => (
              <span
                style={{ height: lineHeight }}
                className={'block w-full overflow-hidden'}
                suppressHydrationWarning
              >
                <Motion.span
                  ref={ref}
                  key={lineIndex}
                  custom={lineIndex}
                  variants={animation}
                  initial={'initial'}
                  className={cn(
                    'wrapper w-full flex justify-between',
                    wrapperClass,
                  )}
                  animate={isInView ? 'enter' : 'exit'}
                  exit={'exit'}
                  suppressHydrationWarning
                >
                  {children}
                </Motion.span>
              </span>
            )}
          >
            {text}
          </SplitText>
        </Element>
      </div>
    )
  },
)

TextRevealByLine.displayName = 'TextRevealByLine'

export default TextRevealByLine
